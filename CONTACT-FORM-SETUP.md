# Contact Form Setup Guide

Your contact form is **fully built and ready** - it just needs configuration to send emails.

## Current Status

✅ **Working:**
- Contact form UI (dark, bold, personal - Bold Personal Brand ✓)
- Form validation (React Hook Form + Zod)
- Rate limiting (5 submissions per 15 min per IP)
- Spam protection (Cloudflare Turnstile)
- Success/error messages
- Mobile responsive

⚠️ **Needs Configuration:**
- Email delivery (Resend API)
- CAPTCHA keys (Cloudflare Turnstile)

---

## Quick Setup (10 minutes)

### Step 1: Configure Your Email Address

Open [.env.local](./.env.local) and update:

```bash
CONTACT_EMAIL_TO=your-email@example.com
```

**That's it for basic testing!** Form submissions will be logged to your terminal.

---

## Full Setup (Email + Spam Protection)

### Step 2: Set Up Resend (Email Delivery)

**Why Resend?**
- Free: 3,000 emails/month
- Fast: 5-minute setup
- Reliable: Built for developers

**Setup:**

1. **Sign up:** https://resend.com/signup
2. **Get API Key:**
   - Go to "API Keys" in dashboard
   - Click "Create API Key"
   - Copy the key (starts with `re_`)
3. **Add to `.env.local`:**
   ```bash
   RESEND_API_KEY=re_your_actual_key_here
   CONTACT_EMAIL_FROM=onboarding@resend.dev
   CONTACT_EMAIL_TO=your-email@example.com
   ```
4. **For production (optional):**
   - Verify your domain (lostmonster.io)
   - Change FROM to `contact@lostmonster.io`

### Step 3: Set Up Cloudflare Turnstile (Spam Protection)

**Why Turnstile?**
- Free forever
- Better UX than reCAPTCHA
- Privacy-friendly
- No "select traffic lights" nonsense

**Setup:**

1. **Sign up:** https://dash.cloudflare.com/sign-up
2. **Create Turnstile site:**
   - Go to "Turnstile" in sidebar (or https://dash.cloudflare.com/?to=/:account/turnstile)
   - Click "Add Site"
   - **Site name:** Lost Monster Contact Form
   - **Domain:** `localhost` (for development)
   - **Widget mode:** Managed (recommended)
   - Click "Create"
3. **Copy keys:**
   - **Site Key** (public - shown in browser)
   - **Secret Key** (private - server only)
4. **Add to `.env.local`:**
   ```bash
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here
   TURNSTILE_SECRET_KEY=your_secret_key_here
   ```

### Step 4: Restart Dev Server

```bash
npm run dev
```

### Step 5: Test the Form

1. Go to: http://localhost:3000/contact
2. Fill out the form
3. Submit
4. Check your terminal for:
   ```
   ✅ Turnstile verification passed
   ✅ Email sent successfully via Resend
   ```
5. Check your email inbox (CONTACT_EMAIL_TO)

---

## What You'll Receive

When someone submits the contact form, you'll get:

**Subject:** New Project Enquiry from [Name]

**Contains:**
- Name
- Email (reply-to configured)
- Project Type (Booking System, E-commerce, etc.)
- Budget Range (£15k-£30k, etc.)
- Message
- Timestamp

**You can reply directly** to the email to respond to the enquirer.

---

## Production Deployment

### Vercel (Recommended)

1. **Push code to GitHub**
2. **Connect to Vercel**
3. **Add environment variables:**
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL_FROM`
   - `CONTACT_EMAIL_TO`
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - `TURNSTILE_SECRET_KEY`
4. **Update Turnstile domain:**
   - Go to Cloudflare Turnstile dashboard
   - Edit your site
   - Add `lostmonster.io` to domains
   - Save
5. **Deploy**

### Custom Domain Email

**Option 1: Use Resend with your domain (free)**
- Verify lostmonster.io in Resend
- Add DNS records (takes 5 min)
- Change `CONTACT_EMAIL_FROM=contact@lostmonster.io`

**Option 2: Keep using onboarding@resend.dev**
- Works perfectly fine
- No verification needed
- Emails still go to your inbox

---

## Testing Without Full Setup

**Want to test before setting up Resend/Turnstile?**

The form will still work! Here's what happens:

### Without Resend API Key:
```
⚠️  Resend API key not configured. Email not sent.
```
- Form submissions logged to terminal
- No emails sent (but you can see the data)
- Everything else works

### Without Turnstile Keys:
```
⚠️  Turnstile secret key not configured. Skipping verification.
```
- Uses test site key (always passes)
- No spam protection (but rate limiting still active)
- Everything else works

**To test:**
1. Just update `CONTACT_EMAIL_TO` in `.env.local`
2. Run `npm run dev`
3. Submit form at http://localhost:3000/contact
4. Check terminal output (you'll see the submission data)

---

## Troubleshooting

### "Failed to send message"
- Check terminal for error details
- Verify `.env.local` file exists
- Restart dev server (`npm run dev`)

### No email received
- Check spam folder
- Verify `RESEND_API_KEY` is correct
- Check terminal for "✅ Email sent successfully"
- Verify `CONTACT_EMAIL_TO` is correct

### Turnstile not showing
- Verify `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set
- Check browser console for errors
- Make sure domain matches Turnstile config

### Rate limited
- Wait 15 minutes
- Or clear rate limit: restart dev server
- Production: 5 submissions per IP per 15 min

---

## Security Features

Built-in protection:

✅ **Rate Limiting**
- 5 submissions per 15 minutes per IP
- Prevents spam floods
- Headers show remaining requests

✅ **Cloudflare Turnstile**
- Blocks bots
- No annoying puzzles
- Privacy-friendly

✅ **Input Validation**
- Email format validation
- Minimum length checks
- Type safety (TypeScript + Zod)

✅ **Error Handling**
- User-friendly error messages
- Server errors logged
- Graceful fallbacks

---

## Files Modified

All contact form files are already in place:

- [app/contact/page.tsx](./app/contact/page.tsx) - Contact page
- [components/forms/ContactForm.tsx](./components/forms/ContactForm.tsx) - Form component
- [app/api/contact/route.ts](./app/api/contact/route.ts) - API endpoint
- [lib/rate-limit.ts](./lib/rate-limit.ts) - Rate limiting
- [.env.local](./.env.local) - Your config (not in git)

**No code changes needed** - just configuration!

---

## Cost

**Development: £0**
- Resend: Free (3,000 emails/month)
- Turnstile: Free forever
- Rate limiting: Built-in (no external service)

**Production: £0** (unless you exceed limits)
- Resend: £0 for first 3,000 emails/month
- Turnstile: £0 forever
- Vercel: £0 (hobby plan)

---

## Next Steps

**Immediate (5 minutes):**
1. Open [.env.local](./.env.local)
2. Add your email to `CONTACT_EMAIL_TO`
3. Run `npm run dev`
4. Test at http://localhost:3000/contact

**Before Launch (10 minutes):**
1. Sign up for Resend → Get API key
2. Sign up for Turnstile → Get site keys
3. Add keys to `.env.local`
4. Test form end-to-end

**Production Deployment:**
1. Add env vars to Vercel
2. Update Turnstile domain
3. Deploy
4. Test on live site

---

## Questions?

Check the code comments in:
- [app/api/contact/route.ts](./app/api/contact/route.ts) - Email sending logic
- [.env.local.example](./.env.local.example) - Configuration examples

**Ready to test?** Just run:
```bash
npm run dev
```

Then visit: http://localhost:3000/contact
