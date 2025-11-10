import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  projectType: z.enum(['booking-system', 'ecommerce', 'custom-app', 'design-system', 'other']),
  budget: z.enum(['15-30k', '30-50k', '50-75k', '75k-plus', 'not-sure']),
  message: z.string().min(10),
  turnstileToken: z.string().min(1),
});

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Helper to format project type for display
const formatProjectType = (type: string) => {
  const types: Record<string, string> = {
    'booking-system': 'Booking System',
    'ecommerce': 'E-commerce Site',
    'custom-app': 'Custom Application',
    'design-system': 'Design System',
    'other': 'Other',
  };
  return types[type] || type;
};

// Helper to format budget for display
const formatBudget = (budget: string) => {
  const budgets: Record<string, string> = {
    '15-30k': '£15k - £30k',
    '30-50k': '£30k - £50k',
    '50-75k': '£50k - £75k',
    '75k-plus': '£75k+',
    'not-sure': 'Not sure yet',
  };
  return budgets[budget] || budget;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Verify Turnstile token
    if (process.env.TURNSTILE_SECRET_KEY) {
      const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: validatedData.turnstileToken,
        }),
      });

      const turnstileData = await turnstileResponse.json();

      if (!turnstileData.success) {
        console.error('❌ Turnstile verification failed:', turnstileData);
        return NextResponse.json(
          { error: 'Verification failed. Please try again.' },
          { status: 400 }
        );
      }

      console.log('✅ Turnstile verification passed');
    } else {
      console.warn('⚠️  Turnstile secret key not configured. Skipping verification.');
    }

    // Log submission (always do this as backup)
    console.log('Contact form submission:', {
      name: validatedData.name,
      email: validatedData.email,
      projectType: validatedData.projectType,
      budget: validatedData.budget,
      timestamp: new Date().toISOString(),
    });

    // Send email via Resend if API key is configured
    if (resend) {
      try {
        await resend.emails.send({
          from: process.env.CONTACT_EMAIL_FROM || 'contact@lostmonster.io',
          to: process.env.CONTACT_EMAIL_TO || 'hello@lostmonster.io',
          replyTo: validatedData.email,
          subject: `New Project Enquiry from ${validatedData.name}`,
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
                  .header h1 { margin: 0; font-size: 24px; }
                  .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
                  .field { margin-bottom: 20px; }
                  .label { font-weight: 600; color: #666; font-size: 14px; text-transform: uppercase; margin-bottom: 5px; }
                  .value { font-size: 16px; color: #111; }
                  .message-box { background: white; padding: 20px; border-left: 4px solid #F59E0B; border-radius: 4px; margin-top: 10px; }
                  .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #e5e7eb; font-size: 14px; color: #666; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>🚀 New Project Enquiry</h1>
                  </div>
                  <div class="content">
                    <div class="field">
                      <div class="label">Name</div>
                      <div class="value">${validatedData.name}</div>
                    </div>
                    <div class="field">
                      <div class="label">Email</div>
                      <div class="value"><a href="mailto:${validatedData.email}">${validatedData.email}</a></div>
                    </div>
                    <div class="field">
                      <div class="label">Project Type</div>
                      <div class="value">${formatProjectType(validatedData.projectType)}</div>
                    </div>
                    <div class="field">
                      <div class="label">Budget Range</div>
                      <div class="value">${formatBudget(validatedData.budget)}</div>
                    </div>
                    <div class="field">
                      <div class="label">Message</div>
                      <div class="message-box">${validatedData.message.replace(/\n/g, '<br>')}</div>
                    </div>
                    <div class="footer">
                      <p>Submitted: ${new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}</p>
                      <p><strong>Next step:</strong> Reply directly to this email to respond to ${validatedData.name}</p>
                    </div>
                  </div>
                </div>
              </body>
            </html>
          `,
        });

        console.log('✅ Email sent successfully via Resend');
      } catch (emailError) {
        console.error('❌ Failed to send email via Resend:', emailError);
        // Don't fail the request if email fails - we still have the console log
      }
    } else {
      console.warn('⚠️  Resend API key not configured. Email not sent. Check .env.local');
    }

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

