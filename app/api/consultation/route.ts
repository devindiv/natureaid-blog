// app/api/consultation/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@sanity/client";

const resend = new Resend(process.env.RESEND_API_KEY);

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gu9sd1z1",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const interestLabels: Record<string, string> = {
  ayurveda: "Ayurveda & Dosha Balancing",
  nutrition: "Nutrition & Diet",
  preventative: "Preventative Care",
  hormonal: "Hormonal Health",
  general: "General Wellbeing",
  other: "Other",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, interest, message } = body;

    // ── Validate ──
    if (!firstName || !lastName || !email || !interest) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const fullName = `${firstName} ${lastName}`;
    const interestLabel = interestLabels[interest] || interest;

    // ── 1. Save to Sanity ──
    await sanityClient.create({
      _type: "consultation",
      firstName,
      lastName,
      email,
      phone: phone || "",
      interest,
      message: message || "",
      status: "new",
      submittedAt: new Date().toISOString(),
    });

    // ── 2. Notify you ──
    await resend.emails.send({
      from: "NatureAid <hello@natureaid.in>",
      to: process.env.CONSULTATION_EMAIL!,
      subject: `New consultation request — ${fullName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1A2820;">
          <div style="border-bottom: 2px solid #2E7A52; padding-bottom: 16px; margin-bottom: 24px;">
            <p style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #2E7A52; margin: 0 0 6px;">New Request</p>
            <h1 style="font-size: 26px; font-weight: 600; margin: 0;">Consultation Request</h1>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.8;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px;">Name</td>
              <td style="padding: 8px 0; font-weight: 600;">${fullName}</td>
            </tr>
            <tr style="border-top: 1px solid #eee;">
              <td style="padding: 8px 0; color: #666;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2E7A52;">${email}</a></td>
            </tr>
            <tr style="border-top: 1px solid #eee;">
              <td style="padding: 8px 0; color: #666;">Phone</td>
              <td style="padding: 8px 0;">${phone || "—"}</td>
            </tr>
            <tr style="border-top: 1px solid #eee;">
              <td style="padding: 8px 0; color: #666;">Interest</td>
              <td style="padding: 8px 0;">${interestLabel}</td>
            </tr>
            ${
              message
                ? `
            <tr style="border-top: 1px solid #eee;">
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Message</td>
              <td style="padding: 8px 0;">${message}</td>
            </tr>`
                : ""
            }
          </table>

          <div style="margin-top: 32px; padding: 16px; background: #F7F4ED; border-left: 3px solid #2E7A52;">
            <p style="margin: 0; font-size: 13px; color: #666;">
              Submitted at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
            </p>
          </div>
        </div>
      `,
    });

    // ── 3. Confirm to user ──
    await resend.emails.send({
      from: "NatureAid <hello@natureaid.in>",
      to: email,
      subject: "Your consultation request has been received",
      html: `
      <div style="margin:0;padding:0;background:#F6F4EE;">
        <div style="max-width:640px;margin:0 auto;padding:48px 24px;font-family:'Poppins',Arial,sans-serif;color:#1A2820;">
          
          <!-- Container -->
          <div style="background:#FFFFFF;border:1px solid #E7E2D8;border-radius:20px;overflow:hidden;">
            
            <!-- Header -->
            <div style="padding:40px 40px 32px;border-bottom:1px solid #EFEAE0;background:#FCFBF8;">
              
              <p style="
                margin:0 0 14px;
                font-size:11px;
                font-weight:600;
                letter-spacing:0.18em;
                text-transform:uppercase;
                color:#2E7A52;
              ">
                NatureAid
              </p>

              <h1 style="
                margin:0;
                font-family:'Montserrat',Arial,sans-serif;
                font-size:34px;
                line-height:1.1;
                font-weight:600;
                color:#1A2820;
              ">
                Consultation request received.
              </h1>

              <p style="
                margin:18px 0 0;
                font-size:15px;
                line-height:1.8;
                color:#5F6B63;
                max-width:480px;
              ">
                Thank you for reaching out to NatureAid. 
                Our team has successfully received your request 
                and will review it shortly.
              </p>
            </div>

            <!-- Body -->
            <div style="padding:40px;">
              
              <p style="
                margin:0 0 24px;
                font-size:16px;
                line-height:1.9;
                color:#243128;
              ">
                Hi ${firstName},
              </p>

              <p style="
                margin:0 0 28px;
                font-size:16px;
                line-height:1.9;
                color:#243128;
              ">
                We appreciate your interest in our wellness consultation services.
                A member of our team will contact you within 
                <strong>1–2 business days</strong> to discuss the next steps 
                and confirm your session.
              </p>

              <!-- Summary Card -->
              <div style="
                background:#F8F6F1;
                border:1px solid #ECE6DA;
                border-radius:16px;
                padding:28px;
                margin-bottom:32px;
              ">
                
                <p style="
                  margin:0 0 18px;
                  font-size:11px;
                  font-weight:600;
                  letter-spacing:0.16em;
                  text-transform:uppercase;
                  color:#2E7A52;
                ">
                  Request Summary
                </p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="
                      padding:0 0 14px;
                      font-size:14px;
                      color:#6A746D;
                      width:160px;
                      vertical-align:top;
                    ">
                      Area of interest
                    </td>

                    <td style="
                      padding:0 0 14px;
                      font-size:15px;
                      color:#1A2820;
                      font-weight:500;
                    ">
                      ${interestLabel}
                    </td>
                  </tr>

                  ${
                    message
                      ? `
                    <tr>
                      <td style="
                        padding:0;
                        font-size:14px;
                        color:#6A746D;
                        vertical-align:top;
                      ">
                        Your note
                      </td>

                      <td style="
                        padding:0;
                        font-size:15px;
                        line-height:1.8;
                        color:#1A2820;
                      ">
                        ${message}
                      </td>
                    </tr>
                  `
                      : ""
                  }
                </table>
              </div>

              <!-- CTA -->
              <div style="
                margin-bottom:32px;
              ">
                <a
                  href="https://natureaid.in"
                  style="
                    display:inline-block;
                    padding:14px 24px;
                    background:#2E7A52;
                    border-radius:999px;
                    color:#FFFFFF;
                    text-decoration:none;
                    font-size:12px;
                    font-weight:600;
                    letter-spacing:0.12em;
                    text-transform:uppercase;
                  "
                >
                  Explore Articles
                </a>
              </div>

              <p style="
                margin:0;
                font-size:14px;
                line-height:1.9;
                color:#6A746D;
              ">
                In the meantime, you can browse our latest wellness articles,
                evidence-based nutrition guides, and preventative health resources
                at 
                <a 
                  href="https://natureaid.in"
                  style="
                    color:#2E7A52;
                    text-decoration:none;
                    font-weight:500;
                  "
                >
                  natureaid.net
                </a>.
              </p>
            </div>

            <!-- Footer -->
            <div style="
              padding:24px 40px;
              border-top:1px solid #EFEAE0;
              background:#FCFBF8;
            ">
              <p style="
                margin:0 0 6px;
                font-size:12px;
                color:#1A2820;
                font-weight:500;
              ">
                NatureAid
              </p>

              <p style="
                margin:0;
                font-size:12px;
                line-height:1.7;
                color:#8A948D;
              ">
                Alternative & Holistic health services.
              </p>
            </div>
          </div>
        </div>
      </div>
    `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Consultation form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
