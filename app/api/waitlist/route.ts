import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export interface WaitlistPayload {
  fullName: string;
  email: string;
  company: string;
  aiVendor?: string;
  useCase?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: WaitlistPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { fullName, email, company, aiVendor, useCase } = body;

  if (!fullName?.trim() || !email?.trim() || !company?.trim()) {
    return NextResponse.json(
      { error: "fullName, email and company are required" },
      { status: 422 }
    );
  }
  if (!validateEmail(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 422 });
  }

  try {
    const result = await pool.query(
      `INSERT INTO waitlist (full_name, email, company, ai_vendor, use_case)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO UPDATE
         SET full_name  = EXCLUDED.full_name,
             company    = EXCLUDED.company,
             ai_vendor  = EXCLUDED.ai_vendor,
             use_case   = EXCLUDED.use_case
       RETURNING id, created_at`,
      [
        fullName.trim(),
        email.trim().toLowerCase(),
        company.trim(),
        aiVendor?.trim() || null,
        useCase?.trim() || null,
      ]
    );

    const lead = result.rows[0];

    // Fire-and-forget email notification (non-blocking)
    sendNotifications(body).catch(() => {});

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("[waitlist] DB error:", err);
    return NextResponse.json(
      { error: "Something went wrong, please try again" },
      { status: 500 }
    );
  }
}

async function sendNotifications(lead: WaitlistPayload) {
  if (!process.env.RESEND_API_KEY) return;

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  const notificationEmail = process.env.NOTIFICATION_EMAIL;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://garantir.io";

  // Notification to admin
  if (notificationEmail) {
    await resend.emails.send({
      from: "Garantir Waitlist <onboarding@resend.dev>",
      to: notificationEmail,
      subject: `New waitlist signup: ${lead.fullName} (${lead.company})`,
      html: `
        <p><strong>New waitlist lead</strong></p>
        <table>
          <tr><td><b>Name</b></td><td>${lead.fullName}</td></tr>
          <tr><td><b>Email</b></td><td>${lead.email}</td></tr>
          <tr><td><b>Company</b></td><td>${lead.company}</td></tr>
          <tr><td><b>AI vendor</b></td><td>${lead.aiVendor ?? "—"}</td></tr>
          <tr><td><b>Use case</b></td><td>${lead.useCase ?? "—"}</td></tr>
        </table>
        <p><a href="${appUrl}/admin">View all leads →</a></p>
      `,
    });
  }

  // Confirmation to the lead
  await resend.emails.send({
    from: "Garantir <onboarding@resend.dev>",
    to: lead.email,
    subject: "You're on the Garantir waitlist",
    html: `
      <p>Hi ${lead.fullName.split(" ")[0]},</p>
      <p>Thanks for joining the Garantir waitlist. We'll be in touch soon.</p>
      <p>We're building the independent proving ground for finance AI —
         so you can get a decision-grade answer before your AI ever touches the ledger.</p>
      <p>— The Garantir team</p>
    `,
  });
}
