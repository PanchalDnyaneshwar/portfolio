# Dnyaneshwar Panchal — Senior Full Stack Developer Portfolio

A production-grade, high-performance personal portfolio built with Next.js App Router, Tailwind CSS v4, Motion, React Three Fiber (R3F), and Lenis smooth scrolling.

Built strictly adhering to the **Single Source of Truth** architecture and **Calm Motion** design principles on a clean **Light Theme**.

---

## 🏛 Single Source of Truth Architecture

Every value lives in exactly ONE file:

| What | Source File | Consumers |
|---|---|---|
| **Colors, Radius, Spacing, Shadows** | `src/styles/tokens.css` | Tailwind v4 `@theme`, CSS variables, dynamic R3F shaders |
| **Fonts** | `src/lib/fonts.ts` | Root layout (`next/font` for Space Grotesk, Inter, JetBrains Mono) |
| **Motion (durations, curves, variants)** | `src/design/motion.ts` | Every animated component (600ms reveals, 250ms cross-fades) |
| **3D Scene Parameters & Physics** | `src/design/scene.ts` | Persistent R3F background canvas (speeds, counts, camera, presets) |
| **Site Metadata, Socials, Phone** | `src/config/site.ts` | Navbar, Footer, SEO, JSON-LD Person schema |
| **Navigation & CTAs** | `src/config/nav.ts` | Header navbar, mobile drawer, footer |
| **Profile & Bio** | `src/content/profile.ts` | Hero section, About page, Resume |
| **Work Experience** | `src/content/experience.ts` | Experience timeline, resume, home page |
| **Education** | `src/content/education.ts` | About page, resume |
| **Technical Skills** | `src/content/skills.ts` | Skills bento grid, chip categories |
| **Projects & Case Studies** | `src/content/projects.ts` | Featured grid, projects index, `[slug]` case studies |
| **Articles & Essays** | `src/content/posts/*.mdx` | Blog pages, TOC, reading progress, RSS feed, sitemap |

---

## 🎨 Theme & 3D Customization

### 1. Light Theme & Accent Color
All colors live in `src/styles/tokens.css`. Changing `--color-accent` and `--color-accent-soft` instantly recolors the entire website, including all 3D geometries, particles, and focus states via runtime CSS variable reading:

```css
/* Default Indigo */
--color-accent: #4F46E5;
--color-accent-soft: #6366F1;
--color-accent-2: #0EA5E9;

/* Alternative Accent: Emerald */
/* --color-accent: #059669; --color-accent-soft: #10B981; --color-accent-2: #06B6D4; */

/* Alternative Accent: Amber */
/* --color-accent: #D97706; --color-accent-soft: #F59E0B; --color-accent-2: #FB923C; */
```

### 2. Changing 3D Scene Speed & Presets
Edit `src/design/scene.ts` or click the footer toggle **"3D Motion: Calm / Subtle / Off"** (persisted in `localStorage`):
* `Calm`: 1.0x (Default ambient particle drift and wireframe rotation)
* `Subtle`: 0.5x (Ultra quiet background motion)
* `Off`: 0x (Canvas disabled, renders static CSS gradient mesh with soft radial vignette)

To inspect 3D telemetry and frame rates live, append `?scene=debug` to any URL in development.

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# Contact Form Email Delivery (Resend)
RESEND_API_KEY=re_your_api_key_here

# Pluggable Serverless Rate Limiting (Upstash Redis or Vercel KV)
UPSTASH_REDIS_REST_URL=https://your-upstash-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token_here

# Or Vercel KV
# KV_REST_API_URL=https://your-vercel-kv-url.kv.vercel-storage.com
# KV_REST_API_TOKEN=your_vercel_kv_token_here
```

* If `RESEND_API_KEY` is omitted, the contact form returns an honest error providing direct email contact.
* If Redis/KV is omitted, the contact form automatically falls back to local in-memory rate limiting.

---

## 🚀 Deploying to Vercel and Connecting a Custom Domain

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **Add New Project** > **Import**.
3. Under **Environment Variables**, provide your production keys:
   * `RESEND_API_KEY`
   * `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN`
4. Click **Deploy**.
5. Once deployed, navigate to **Settings > Domains**:
   * Add your custom domain (e.g., `dnyaneshwarpanchal.dev`).
   * Add the required `A` or `CNAME` records at your DNS registrar as guided by Vercel.

---

## 🛠 Quality & Compliance Scripts

```bash
# Verify design tokens, zero raw hex, and spacing scale
npm run check:tokens

# Verify content integrity, light theme elimination, and resume PDF
npm run check:content

# Production build
npm run build
```

---

## 📌 Optional Future Integrations

These optional data fields remain unconfigured and safely self-hide in the UI until provided:
1. **Source Code Repositories**: Optional GitHub repository links in `src/content/projects.ts` (hidden when absent).
2. **Performance Metrics**: Optional query speedup cards remain disabled under `metrics.enabled: false`.
