# Quick Setup Guide

## Installation

1. **Install dependencies:**
```bash
cd website
npm install
```

2. **Create environment file:**
```bash
# Create .env.local file with:
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# RESEND_API_KEY=your_key_here (optional, for contact form)
```

3. **Run development server:**
```bash
npm run dev
```

4. **Open browser:**
Visit http://localhost:3000

## Content Structure

- **Pages**: Edit markdown files in `pages/` folder
- **Services**: Edit markdown files in `services/` folder  
- **Case Studies**: Edit markdown files in `case-studies/` folder

All content is automatically loaded and rendered.

## Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

The site is production-ready and optimized for performance.

