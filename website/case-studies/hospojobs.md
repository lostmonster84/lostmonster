# HospoJobs — UK Hospitality Recruitment

> Purpose-built recruitment platform with AI job writing, 7-stage Kanban pipeline, and 112 hospitality-specific job categories. Launch-ready MVP.

---

## The Challenge

UK hospitality has a recruitment problem. Staff turnover is among the highest of any industry, and the tools available are generic job boards retrofitted for hospitality. Recruiters post on Indeed or LinkedIn, get flooded with irrelevant applications, and spend hours sifting through candidates who don't know the difference between a commis chef and a sous chef.

Job seekers aren't much better off. They search "hospitality jobs" and get results mixed with office admin and warehouse work. Categories are broad, filters are useless, and nobody understands the industry's specific needs — right-to-work status, NVQ levels, food hygiene certificates, WSET wine qualifications.

## What I Built

A recruitment platform designed from the ground up for hospitality. Not a generic job board with a hospitality skin — every feature, category, and workflow reflects how this industry actually works.

### 112 Job Categories
8 parent categories (Kitchen, Front of House, Bar, Management, Housekeeping, Events, Leisure, Back Office) with 112 subcategories. When a recruiter posts for a "Pastry Chef" or a seeker searches for "Sommelier", the system understands what that means.

### AI Job Description Writer
Recruiters hit "Write it for me" and Claude generates a complete job description — responsibilities, requirements, benefits — tailored to the role and industry. Saves 30+ minutes per posting.

### 7-Stage Kanban Pipeline
Applied → Reviewing → Shortlisted → Interview → Offered → Hired → Rejected. Drag-and-drop between stages. Candidate detail drawer with profile summary, skills, work history, CV viewer, and internal notes. Email templates for acknowledgement, interview invites, rejection, and offers.

### Seeker Profiles
Skills multi-select grouped by category (Kitchen, Service, Bar, Management, Languages, Certifications). Work experience with hospitality-specific fields — cuisine type, covers per service, team size. Right-to-work tracking (UK citizen, settled status, visa types, sponsorship needed). Availability tracking.

### Company Pages
Public employer branding pages with hero banner, logo, tagline, company stats, perks grid, team gallery, and open positions. Recruiters build their employer brand directly on the platform.

### Business Finder
Universal location search powered by Google Places + postcodes.io. Used across job creation, company profiles, and seeker search. Postcode-to-nearby-search pattern because Google Places Autocomplete doesn't answer "what's near here?"

## Tech Stack

- **Next.js 15** with Turborepo monorepo
- **PostgreSQL** with raw parameterised SQL (no ORM)
- **Cloudflare R2** for logos, CVs, and galleries
- **Anthropic Claude API** for AI job writing
- **Stripe** for recruiter subscriptions
- **Resend** for transactional email
- **Railway** deployment with auto-deploy

## Results

- **37 routes** live and tested
- **17 database tables** across 11 migrations
- **112 job subcategories** tailored to hospitality
- **3 complete portals** — seeker dashboard, recruiter dashboard, superadmin
- **AI-powered** job and company description generation
- **Launch-ready** — apply flow was the last blocker, now resolved

## What Makes This Different

Every feature was designed by asking: "What would a 21-year-old hospitality management grad need?" Not what a product manager thinks recruiters want, but what actually helps people find work in kitchens, hotels, and bars.

The platform speaks hospitality because it was built by someone who understands the industry — not by a tech company trying to disrupt it from the outside.

---

**Industry:** Hospitality / Recruitment
**Timeline:** 9 weeks (37 development sessions)
**Type:** Two-sided recruitment platform with AI integration
