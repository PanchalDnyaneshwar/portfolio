import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

// Local in-memory rate limiter per IP: max 5 requests per 10 minutes (development fallback)
const ipRequestMap = new Map<string, { count: number; firstRequest: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

// Pluggable serverless rate limiting supporting Upstash Redis or Vercel KV
async function checkRateLimit(ip: string): Promise<boolean> {
  const restUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const restToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (restUrl && restToken) {
    try {
      const key = `ratelimit:contact:${ip.replace(/[^a-zA-Z0-9]/g, "_")}`;
      const res = await fetch(`${restUrl}/incr/${key}`, {
        headers: { Authorization: `Bearer ${restToken}` },
      });
      const data = await res.json();
      const count = Number(data.result);
      if (count === 1) {
        await fetch(`${restUrl}/expire/${key}/600`, {
          headers: { Authorization: `Bearer ${restToken}` },
        });
      }
      return count <= MAX_REQUESTS;
    } catch (err) {
      console.warn("Serverless rate limit store error, falling back to memory:", err);
    }
  }

  // Local development in-memory fallback
  const now = Date.now();
  const rateInfo = ipRequestMap.get(ip) || { count: 0, firstRequest: now };

  if (now - rateInfo.firstRequest > RATE_LIMIT_WINDOW_MS) {
    rateInfo.count = 1;
    rateInfo.firstRequest = now;
  } else {
    rateInfo.count++;
  }
  ipRequestMap.set(ip, rateInfo);
  return rateInfo.count <= MAX_REQUESTS;
}

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting (Serverless-compatible with in-memory fallback)
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    const allowed = await checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        { success: false, message: "Too many messages sent. Please wait a few minutes." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, message, honeypot } = body;

    // 2. Honeypot check (spam bots fill this hidden field)
    if (honeypot) {
      // Silently return success to fool spam bots
      return NextResponse.json({ success: true, message: "Message received." });
    }

    // 3. Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 4. Honest error if RESEND_API_KEY is missing per specification
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return NextResponse.json(
        {
          success: false,
          message: `Message could not be sent, please email me directly at ${siteConfig.email}`,
        },
        { status: 503 }
      );
    }

    // Send through Resend
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: siteConfig.email,
        subject: `New Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("Resend API response error:", errText);
      return NextResponse.json(
        {
          success: false,
          message: `Message could not be sent, please email me directly at ${siteConfig.email}`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message received successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
