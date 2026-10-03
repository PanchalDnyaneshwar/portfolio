import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "procura-nx",
    title: "Procura NX",
    tagline: "Multi-vendor B2B/B2C procurement and e-commerce platform built for Indian trade compliance.",
    summary:
      "Enterprise-grade multi-vendor platform where buyers procure products and manage Bills of Materials (BOM), vendors manage catalogs and fulfil orders, and administrators oversee operations, logistics, statutory tax compliance and automated accounting ledgers.",
    featured: true,
    role: "Full-Stack Engineer (backend-focused) in a core engineering team. Personally built: the payment and accounting core, analytics and ranking pipeline, Bill of Materials module, notification hub, and GST and e-Way Bill logic.",
    overview:
      "Enterprise-grade multi-vendor platform where buyers procure products and manage Bills of Materials (BOM), vendors manage catalogs and fulfil orders, and administrators oversee operations, logistics, statutory tax compliance and automated accounting ledgers.",
    problemPoints: [
      "GST and e-invoicing compliance: automatic intra-state (CGST + SGST) vs inter-state (IGST) calculation, purchase order generation, e-Way Bill / e-Invoice integration through a GSP (Whitebooks).",
      "B2B procurement workflows: multi-item BOMs, tiered commission structures, vendor purchase orders.",
      "Payment gateway fee (MDR) mismatches: fees differ by instrument and are deducted from the gross captured amount, which erodes margins when calculated naively.",
      "Disconnected logistics and support: courier assignment, hub management, SLA-tracked tickets and customer communication in one system.",
    ],
    modules: [
      {
        name: "Buyer Module",
        description: "Browse catalogs, construct and bulk-checkout Bills of Materials, complete payments, and track order logistics.",
      },
      {
        name: "Vendor Module",
        description: "Manage product catalogs, fulfill incoming orders, review role-scoped revenue analytics, and receive automated purchase orders.",
      },
      {
        name: "Admin Module",
        description: "Oversee operational logistics, monitor statutory tax compliance and double-entry ledgers, resolve SLA support tickets, and review platform-wide telemetry.",
      },
    ],
    keyFeatures: [
      {
        title: "Payment gateway and MDR reconciliation",
        description: "PhonePe integration with an exact fee calculator that grosses up charges per payment instrument (UPI, credit/debit cards, net banking, wallets), webhook-driven status processing, and settlement reconciliation against double-entry ledgers.",
      },
      {
        title: "Three-tier analytics and ranking pipeline",
        description: "Asynchronous event ingestion into an append-only log, nightly aggregation into daily platform, vendor, and product metrics, and Best Seller and Trending rankings built on summaries.",
      },
      {
        title: "Bill of Materials (BOM) management",
        description: "Create, edit, and bulk-checkout multi-item BOM lists with real-time vendor inventory verification and commission-aware pricing.",
      },
      {
        title: "Tax, invoicing, and purchase orders",
        description: "GST-compliant PDF receipts and vendor purchase orders splitting CGST/SGST vs IGST by warehouse and buyer destination state, e-Way Bill support, and HSN masters.",
      },
      {
        title: "Omnichannel notifications",
        description: "Real-time in-app alerts over WebSockets (Socket.io), transactional emails (Handlebars templates via Nodemailer/SendGrid), and SMS and WhatsApp updates through Twilio.",
      },
      {
        title: "Support tickets with SLA monitoring",
        description: "Complete lifecycle tracking, SLA due dates, automatic admin routing, file attachments, and escalation alerts.",
      },
    ],
    technicalChallenge: {
      title: "Protecting margins from payment gateway fees",
      challenge:
        "Each payment instrument incurs a distinct fee (UPI effectively free, debit cards roughly 0.4% to 0.9%, credit cards around 2% plus 18% GST on the fee). The gateway deducts fees from the gross captured amount, so multiplying base price by the rate leaves a shortfall. PhonePe's hosted checkout redirects before payment method selection, so the fee rate is unknown at order creation.",
      solution:
        "(a) Built a pass-through gross-up calculation model: effectiveRate = (feePercent / 100) * (1 + gstPercent / 100); grossAmount = baseAmount / (1 - effectiveRate); (b) Developed pre-order simulation endpoints returning exact estimated fees and GST; (c) Processed post-payment webhooks to capture actual instruments reported by PhonePe, reconcile bank deductions against customer ledger invoices, and log discrepancies for administrative audit.",
    },
    highlight: {
      title: "Fast dashboards through a fire-and-forget analytics pipeline",
      description:
        "Dashboards and rankings were originally queried directly from heavy transactional tables, leading to locks and slow responses. Implemented a non-blocking logEvent layer writing user actions (views, cart additions, orders) to an append-only table, combined with a midnight cron worker that aggregates records into daily_platform_metrics, daily_vendor_metrics, and daily_product_metrics. Best Seller and Trending algorithms read these pre-computed summaries across 24h, 7d, and 30d sliding windows with time decay and bot filters.",
    },
    outcome:
      "Admin and vendor dashboards read compact pre-aggregated tables instead of live transactional queries, so reporting no longer competes with checkout traffic.",
    stackGrouped: [
      {
        category: "Frontend",
        items: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Redux Toolkit", "TanStack Query", "Radix UI", "Headless UI", "ApexCharts"],
      },
      {
        category: "Backend",
        items: ["NestJS 11", "Node.js 20+", "TypeScript", "Express", "TypeORM", "BullMQ", "Socket.io", "Winston", "Puppeteer", "pdfmake"],
      },
      {
        category: "Database & Cache",
        items: ["MySQL 8", "TypeORM migrations", "Redis (ioredis)"],
      },
      {
        category: "Integrations",
        items: ["PhonePe PG (Standard Checkout v2)", "Delhivery Express API", "Twilio (SMS & WhatsApp)", "SendGrid / Nodemailer", "AWS S3", "GSP / Whitebooks"],
      },
      {
        category: "DevOps & Testing",
        items: ["Playwright (E2E & RBAC)", "Docker", "Nginx"],
      },
    ],
    cardChips: ["TypeScript", "NestJS", "React", "MySQL", "Redis", "PhonePe", "Docker"],
    links: {
      live: "https://procuranx.com/",
    },
    screenshotSlots: [
      "01-home",
      "02-product-listing",
      "05-vendor-dashboard",
      "06-admin-dashboard",
    ],
    metrics: {
      enabled: false,
    },
  },
  {
    slug: "jne-school",
    title: "Jawaharlal Nehru English School Portal",
    tagline: "School website and admin platform for admissions, notices, results and content management.",
    summary:
      "Used by prospective students, parents and community members to read notices and academic results and send admission inquiries, and by school administrators and staff to manage content, careers and admissions.",
    featured: true,
    location: "Purna, Parbhani, Maharashtra",
    role: "Full-Stack Engineer, built end to end: NestJS REST API, PostgreSQL schema and migrations, authentication and access control, React single-page app, deployment and testing.",
    overview:
      "Used by prospective students, parents and community members to read notices and academic results and send admission inquiries, and by school administrators and staff to manage content, careers and admissions.",
    problemPoints: [
      "Admission, career and general inquiries were handled through physical visits and unstructured channels with no status tracking.",
      "Results, notices, galleries and event schedules had no unified, mobile-responsive home.",
      "Staff had no role-gated dashboard to update content and track inquiries without direct database access.",
    ],
    modules: [
      {
        name: "Public Visitors",
        description: "Browse school curriculum, inspect board results, submit admission inquiries, contact the administration, and submit employment applications with resume attachments.",
      },
      {
        name: "Staff",
        description: "Review submitted inquiries and job applications, change review status, and document followup notes.",
      },
      {
        name: "Admin",
        description: "Manage digital notices, update photo and video galleries, publish event schedules, and configure career openings.",
      },
      {
        name: "Super Admin",
        description: "Control staff directories, publish academic board results, oversee event calendars, and manage administrative user accounts.",
      },
    ],
    keyFeatures: [
      {
        title: "Admin CMS dashboard",
        description: "Admin dashboard with metric cards for admission queries, contact queries, published results, staff, gallery items and news, plus quick links.",
      },
      {
        title: "Staff and faculty directory",
        description: "Staff and faculty directory with search, department, role and status filters, photo upload, publish status and a homepage-highlight toggle.",
      },
      {
        title: "Testimonials and recruitment",
        description: "Testimonials, job postings and job applications management.",
      },
      {
        title: "Inquiry and application lifecycle management",
        description: "Centralized review pipelines with real-time status tracking for prospective student admissions and job candidates.",
      },
      {
        title: "Three-tier Role-Based Access Control (RBAC)",
        description: "Strict authorization isolating staff review, content administration, and super administrator functions.",
      },
      {
        title: "Digital notice board & academic results",
        description: "Board examination achievement showcase, student ranker highlights, and downloadable merit list PDFs.",
      },
      {
        title: "Media showcase and event schedules",
        description: "Dynamic photo/video galleries and event calendars with SEO-friendly slug routes.",
      },
    ],
    technicalChallenge: {
      title: "Moving from MongoDB to a strict PostgreSQL schema without downtime",
      challenge:
        "The application started on a loosely structured MongoDB model and required migration to a strictly typed relational schema without downtime or data loss.",
      solution:
        "Executed 10 incremental TypeORM migrations with strict enum constraints, foreign keys, and UUID primary keys. Authored a custom identifier classifier (classifyDatabaseIdentifier) to safely reject legacy Mongo ObjectIds. Cleared MongoDB dependencies from the graph and enforced pre-flight database connection validation in the deployment pipeline.",
    },
    highlight: {
      title: "Hardened authentication",
      description:
        "Login and password-reset flows run a dummy bcrypt comparison when an account is absent or inactive, defending against timing attacks and username enumeration. Because bcrypt reads only the first 72 bytes, refresh tokens are hashed with SHA-256 before bcrypt storage. An Axios response interceptor holds concurrent frontend requests in a queue during token refresh and replays them to prevent race condition logouts.",
    },
    outcome:
      "Staff manage notices, results, events, gallery and inquiries from a role-gated dashboard instead of through the database, and families have one mobile-friendly place for school information and admission inquiries.",
    stackGrouped: [
      {
        category: "Frontend",
        items: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Redux Toolkit", "React Router v7", "Axios", "Lucide Icons"],
      },
      {
        category: "Backend",
        items: ["NestJS 11", "TypeScript", "Express", "TypeORM", "Passport.js (JWT)", "Helmet", "Throttler", "Bull / Redis"],
      },
      {
        category: "Database",
        items: ["PostgreSQL 14+", "UUID primary keys", "Transactional migrations"],
      },
      {
        category: "DevOps & Hosting",
        items: ["Linux VPS", "Nginx", "Node.js 22 (NVM)", "Bash deployment scripts"],
      },
    ],
    cardChips: ["TypeScript", "NestJS", "React", "PostgreSQL", "TypeORM", "JWT", "Nginx"],
    links: {
      live: "https://jnespurna.in/",
    },
    screenshotSlots: [
      "01-home",
      "02-admin-dashboard",
      "03-staff-directory",
      "04-gallery",
    ],
    metrics: {
      enabled: false,
    },
  },
  {
    slug: "mahaifm",
    title: "MAHAIFM: Industrial Federation of Maharashtra Region",
    tagline: "Website and admin dashboard for a registered industrial federation.",
    summary:
      "The Industrial Federation of Maharashtra Region (IFM) is a registered body working for the rights and issues of industries in Maharashtra, representing industries before government authorities such as MPCB, MIDC, DIC, the Safety Department and Pollution Control Boards.",
    featured: false,
    role: "Full-Stack Developer, as part of the team at Infoprosys Technologies Pvt. Ltd.",
    teamProject: true,
    overview:
      "The Industrial Federation of Maharashtra Region (IFM) is a registered body working for the rights and issues of industries in Maharashtra, representing industries before government authorities such as MPCB, MIDC, DIC, the Safety Department and Pollution Control Boards.",
    keyFeatures: [
      {
        title: "Multilingual interface",
        description: "English language switcher and localized Marathi content across federation initiatives.",
      },
      {
        title: "Membership management & fee calculator",
        description: "Membership section with plans, benefits, eligibility, registration, renewal and an interactive membership fee calculator based on worker count.",
      },
      {
        title: "Events and webinars",
        description: "Event listings detailing dates, timings, venues, free or paid pricing and completed status.",
      },
      {
        title: "Media, leadership & policies",
        description: "News, gallery, leadership and committee directories, president's message, grievance redressal and statutory legal policy pages.",
      },
      {
        title: "Admin dashboard & CMS",
        description: "Role-gated administration and content management system for federation announcements and membership records.",
      },
    ],
    outcome:
      "Full-stack platform with an admin dashboard and content management system, REST APIs integrated with a dynamic frontend, optimized data fetching, and improved UI performance.",
    stackGrouped: [
      {
        category: "Frontend",
        items: ["React.js", "JavaScript", "HTML5", "CSS3"],
      },
      {
        category: "Backend",
        items: ["Express.js", "Node.js", "RESTful APIs"],
      },
      {
        category: "Database",
        items: ["MongoDB"],
      },
    ],
    cardChips: ["React.js", "Express.js", "Node.js", "MongoDB", "REST APIs", "Team Project"],
    links: {
      live: "https://mahaifm.com/",
    },
    screenshotSlots: [
      "01-home",
      "02-membership-plans",
      "03-events-and-webinars",
    ],
    metrics: {
      enabled: false,
    },
  },
];
