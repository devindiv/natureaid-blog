// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    // ── Notify you ──
    await resend.emails.send({
      from: "NatureAid <hello@natureaid.in>",
      to: process.env.CONSULTATION_EMAIL!,
      subject: `Contact: ${subject}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1A2820;">
          <div style="border-bottom: 2px solid #2E7A52; padding-bottom: 16px; margin-bottom: 24px;">
            <p style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #2E7A52; margin: 0 0 6px;">New Message</p>
            <h1 style="font-size: 24px; font-weight: 600; margin: 0;">${subject}</h1>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.8;">
            <tr><td style="padding: 8px 0; color: #666; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
            <tr style="border-top: 1px solid #eee;"><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2E7A52;">${email}</a></td></tr>
            <tr style="border-top: 1px solid #eee;"><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0;">${phone || "—"}</td></tr>
            <tr style="border-top: 1px solid #eee;"><td style="padding: 8px 0; color: #666; vertical-align: top;">Message</td><td style="padding: 8px 0;">${message}</td></tr>
          </table>
          <div style="margin-top: 32px; padding: 16px; background: #F7F4ED; border-left: 3px solid #2E7A52;">
            <p style="margin: 0; font-size: 13px; color: #666;">Received at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
          </div>
        </div>
      `,
    });

    // ── Confirm to user ──
    await resend.emails.send({
      from: "NatureAid <hello@natureaid.in>",
      to: email,
      subject: `We got your message — ${subject}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1A2820;">
          <div style="border-bottom: 2px solid #2E7A52; padding-bottom: 16px; margin-bottom: 24px;">
            <p style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #2E7A52; margin: 0 0 6px;">NatureAid</p>
            <h1 style="font-size: 24px; font-weight: 600; margin: 0;">Thanks for reaching out.</h1>
          </div>
          <p style="font-size: 15px; line-height: 1.8; margin: 0 0 20px;">Hi ${name}, we've received your message and will get back to you within 1–2 business days.</p>
          <div style="padding: 20px; background: #F7F4ED; margin-bottom: 24px;">
            <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; color: #2E7A52; margin: 0 0 8px;">Your message</p>
            <p style="font-size: 14px; font-weight: 600; margin: 0 0 6px;">${subject}</p>
            <p style="font-size: 14px; color: #555; margin: 0;">${message}</p>
          </div>
          <p style="font-size: 13px; color: #666; line-height: 1.8;">
            In the meantime, explore our latest wellness articles at
            <a href="https://natureaid.in" style="color: #2E7A52;">natureaid.in</a>
          </p>
          <div style="border-top: 1px solid #eee; margin-top: 32px; padding-top: 16px;">
            <p style="font-size: 12px; color: #999; margin: 0;">NatureAid · Editorial Wellness Journal</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 },
    );
  }
}
