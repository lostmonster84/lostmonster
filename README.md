# Lost Monster Website

Production-ready Next.js 15 website for Lost Monster Development Agency.

## Overview

This is a complete, production-ready website built with:
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** (using Lost Monster design system)
- **Markdown content** (from `pages/`, `services/`, `case-studies/` folders)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env.local
```

3. Update `.env.local` with your configuration:
- `NEXT_PUBLIC_SITE_URL` - Your production URL
- `RESEND_API_KEY` - For contact form emails (optional)

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
website/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── about/              # About page
│   ├── services/           # Services pages
│   ├── case-studies/       # Case study pages
│   ├── process/             # Process page
│   ├── faq/                # FAQ page
│   ├── contact/            # Contact page
│   └── api/                # API routes
├── components/             # React components
│   ├── layout/             # Header, Footer, Navigation
│   ├── sections/           # Homepage sections
│   ├── ui/                 # Reusable UI components
│   └── forms/              # Form components
├── lib/                    # Utilities and helpers
│   ├── markdown.ts         # Markdown parser
│   ├── content.ts          # Content loaders
│   └── utils.ts            # General utilities
├── styles/                 # Global styles
│   └── globals.css         # Tailwind CSS
├── pages/                  # Markdown content (pages)
├── services/               # Markdown content (services)
├── case-studies/           # Markdown content (case studies)
└── public/                 # Static assets
```

## Lost Monster Principles Applied

This website demonstrates Lost Monster's framework-driven approach:

- **CODA Planning:** Complete planning document in `.ai/CODA-WEBSITE.md`
- **Design Variations:** 5 hero and 5 layout variations available at `/demo`
- **Quality Checklist:** Customized checklist in `.ai/PRE-DESIGN-CHECKLIST.md`
- **Domain Knowledge:** Business context captured in `.ai/DOMAIN-KNOWLEDGE.md`
- **Quality Scores:** All variations scored in `.ai/QUALITY-SCORES.md`
- **Design Decisions:** Rationale documented in `.ai/DESIGN-DECISIONS.md`

**Chosen Design:** Variation C (Data-Driven) - Score: 87/100

See the [Design Variations Demo](/demo) to explore all options.

---

## Content Management

Content is managed through Markdown files:

- **Pages**: `pages/*.md` (home.md, about.md, process.md, faq.md)
- **Services**: `services/*.md` (booking-systems.md, ecommerce-systems.md, etc.)
- **Case Studies**: `case-studies/*.md` (ancarraig.md, etc.)

### Adding New Content

1. Create a new `.md` file in the appropriate folder
2. Add frontmatter (optional):
```markdown
---
title: Page Title
description: Page description
---
```

3. Write your content in Markdown
4. The page will be automatically available at the route matching the filename

### Dynamic Routes

- Services: `/services/[slug]` - automatically generated from `services/*.md`
- Case Studies: `/case-studies/[slug]` - automatically generated from `case-studies/*.md`

## Features

- ✅ Responsive design (mobile-first)
- ✅ SEO optimized (sitemap, robots.txt, metadata)
- ✅ Accessibility (WCAG 2.1 AA)
- ✅ Contact form with validation
- ✅ Markdown content rendering
- ✅ Type-safe with TypeScript
- ✅ Performance optimized

## Deployment

### Vercel (Recommended)

1. Push to GitHub/GitLab
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Customization

### Colors

Edit `tailwind.config.ts` to customize brand colors.

### Fonts

Fonts are configured in `app/layout.tsx`. Currently using:
- **Headings**: Outfit
- **Body**: Inter

### Components

All components are in `components/` and can be customized as needed.

## Contact Form

The contact form (`/contact`) requires email service configuration:

1. Sign up for [Resend](https://resend.com) (or another email service)
2. Add `RESEND_API_KEY` to `.env.local`
3. Uncomment email code in `app/api/contact/route.ts`

## Framework Documentation

### Planning Documents
- [CODA Plan](.ai/CODA-WEBSITE.md) - Complete planning framework
- [Domain Knowledge](.ai/DOMAIN-KNOWLEDGE.md) - Business context and positioning
- [Quality Checklist](.ai/PRE-DESIGN-CHECKLIST.md) - Customized scoring system
- [Quality Scores](.ai/QUALITY-SCORES.md) - All variation scores
- [Design Decisions](.ai/DESIGN-DECISIONS.md) - Rationale and trade-offs

### Design Variations
- [Demo Index](/demo) - View all design variations
- [Hero Variations](/demo/hero) - 5 hero section options
- [Layout Variations](/demo/layout) - 5 layout/color scheme options
- [Comparison Page](/demo/comparison) - Side-by-side comparison with scores

## License

Proprietary - Lost Monster Development Agency

---

**Built with Lost Monster frameworks and best practices. This website demonstrates our methodology in action.**
