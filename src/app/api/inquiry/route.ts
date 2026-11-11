import { NextResponse } from "next/server";

const requests = new Map<string, number>();
const projectTypes = new Set(["Residential Construction", "Commercial Construction", "Renovation & Remodeling", "Civil Works", "Turnkey Projects", "Interior Finishing", "Project Management", "Other"]);
const contactMethods = new Set(["Phone Call", "WhatsApp", "Email"]);

function validPhone(value: string) { return /^(?:\+91[ -]?)?[6-9]\d{9}$/.test(value.replace(/\s|-/g, "")); }
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
async function sendResend(inquiry: { reference:string; name:string; phone:string; email:string; projectType:string; location:string; details:string; preferredContact:string; submittedAt:string }) {
  const key = process.env.RESEND_API_KEY, to = process.env.INQUIRY_NOTIFICATION_EMAIL, from = process.env.INQUIRY_FROM_EMAIL;
  if (!key || !to || !from) return false;
  const rows = [["Reference",inquiry.reference],["Customer",inquiry.name],["Phone",inquiry.phone],["Email",inquiry.email || "Not supplied"],["Project type",inquiry.projectType],["Location",inquiry.location],["Preferred contact",inquiry.preferredContact || "No preference"],["Submitted",inquiry.submittedAt],["Project details",inquiry.details]].map(([label,value]) => `<tr><td style="padding:8px 12px;color:#52606d;font:600 11px Arial;text-transform:uppercase">${label}</td><td style="padding:8px 12px;color:#172b4d;font:14px Arial;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join("");
  const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 10_000);
  try { const response = await fetch("https://api.resend.com/emails", { method:"POST", signal:controller.signal, headers:{ authorization:`Bearer ${key}`, "content-type":"application/json" }, body:JSON.stringify({ from, to, reply_to:inquiry.email || undefined, subject:`New Project Inquiry — BSJ Builders [${inquiry.reference}]`, html:`<table style="max-width:680px;width:100%;border-collapse:collapse"><tr><td style="padding:24px;background:#05254A;color:#fff;font:bold 22px Arial">BSJ BUILDERS<br/><span style="color:#FFB900;font-size:12px">NEW PROJECT INQUIRY</span></td></tr>${rows}</table>` }) }); return response.ok; } finally { clearTimeout(timeout); }
}
async function sendWhatsApp(inquiry: { reference:string; projectType:string; location:string }) {
  const token=process.env.WHATSAPP_ACCESS_TOKEN,id=process.env.WHATSAPP_PHONE_NUMBER_ID,to=process.env.WHATSAPP_RECIPIENT_NUMBER,name=process.env.WHATSAPP_TEMPLATE_NAME,language=process.env.WHATSAPP_TEMPLATE_LANGUAGE,version=process.env.WHATSAPP_GRAPH_API_VERSION,raw=process.env.WHATSAPP_TEMPLATE_COMPONENTS_JSON;
  if (!token||!id||!to||!name||!language||!version||!raw) return false;
  let components: unknown; try { components=JSON.parse(raw.replaceAll("{{reference}}",inquiry.reference).replaceAll("{{projectType}}",inquiry.projectType).replaceAll("{{location}}",inquiry.location)); } catch { return false; }
  const response=await fetch(`https://graph.facebook.com/${version}/${id}/messages`,{method:"POST",headers:{authorization:`Bearer ${token}`,"content-type":"application/json"},body:JSON.stringify({messaging_product:"whatsapp",to,type:"template",template:{name,language:{code:language},components}})}); return response.ok;
}

export async function POST(request: Request) {
  const now = Date.now();
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  const previous = requests.get(address) ?? 0;
  if (now - previous < 30_000) return NextResponse.json({ message: "Please wait a moment before sending another inquiry." }, { status: 429 });
  requests.set(address, now);

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ message: "Unable to read this inquiry." }, { status: 400 }); }
  if (typeof body.website === "string" && body.website.length > 0) return NextResponse.json({ ok: true });
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const projectType = typeof body.projectType === "string" ? body.projectType : "";
  const location = typeof body.location === "string" ? body.location.trim() : "";
  const details = typeof body.details === "string" ? body.details.trim() : "";
  const preferredContact = typeof body.preferredContact === "string" ? body.preferredContact : "";
  if (name.length < 2 || name.length > 100 || !validPhone(phone) || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) || !projectTypes.has(projectType) || location.length < 2 || location.length > 160 || details.length < 10 || details.length > 3000 || (preferredContact && !contactMethods.has(preferredContact))) {
    return NextResponse.json({ message: "Please review the highlighted fields and try again." }, { status: 400 });
  }
  const inquiry = { name, phone, email, projectType, location, details, preferredContact, reference:`BSJ-${crypto.randomUUID().slice(0,8).toUpperCase()}`, submittedAt:new Date().toISOString() };
  let emailSent = false; try { emailSent = await sendResend(inquiry); } catch {}
  if (!emailSent) return NextResponse.json({ message: "We could not accept your inquiry right now. Please use the direct contact options below." }, { status: 502 });
  try { await sendWhatsApp(inquiry); } catch {}
  return NextResponse.json({ ok: true, message: `Thank you. Your project inquiry has been received. Reference: ${inquiry.reference}` });
}
