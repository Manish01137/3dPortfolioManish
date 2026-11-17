import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

const esc = (s = "") => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let json: unknown;
  try { json = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input", issues: parsed.error.issues }, { status: 422 });
  const d = parsed.data;
  if (d.website) return NextResponse.json({ ok: true }); // honeypot: silently accept bots

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ fallback: "mailto" }, { status: 501 });

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM ?? "Manish Beniwal Portfolio <onboarding@resend.dev>",
    to: process.env.CONTACT_TO ?? "manish@shape360ai.com",
    replyTo: d.email,
    subject: `New enquiry — ${d.name}${d.company ? ` (${d.company})` : ""}`,
    html: `<h2>New project enquiry</h2>
      <p><b>Name:</b> ${esc(d.name)}<br/><b>Email:</b> ${esc(d.email)}<br/><b>Company:</b> ${esc(d.company)}<br/>
      <b>Budget:</b> ${esc(d.budget)}<br/><b>Services:</b> ${esc(d.services.join(", "))}</p>
      <p style="white-space:pre-wrap">${esc(d.message)}</p>`,
  });
  if (error) return NextResponse.json({ error: "Send failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
