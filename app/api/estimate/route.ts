import { NextResponse } from "next/server";

export const runtime = "nodejs";

type EstimatePayload = {
  fullName?: string;
  phone?: string;
  email?: string;
  serviceType?: string;
  propertyAddress?: string;
  timeline?: string;
  preferredContact?: "phone" | "email" | "text";
  siteVisitNeeded?: "yes" | "no" | "unsure";
  details?: string;
  website?: string;
};

function clean(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim();
}

function validEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10;
}

function validE164(phone: string): boolean {
  return /^\+[1-9]\d{7,14}$/.test(phone);
}

export async function POST(request: Request) {
  let body: EstimatePayload;

  try {
    body = (await request.json()) as EstimatePayload;
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  if (clean(body.website)) {
    return NextResponse.json({ message: "Request received." }, { status: 200 });
  }

  const fullName = clean(body.fullName);
  const phone = clean(body.phone);
  const email = clean(body.email);
  const serviceType = clean(body.serviceType);
  const propertyAddress = clean(body.propertyAddress);
  const timeline = clean(body.timeline);
  const preferredContact = clean(body.preferredContact ?? "phone");
  const siteVisitNeeded = clean(body.siteVisitNeeded ?? "unsure");
  const details = clean(body.details);

  if (!fullName || !phone || !email || !serviceType || !propertyAddress || !timeline || !details) {
    return NextResponse.json(
      { error: "Please complete all required fields before submitting." },
      { status: 400 }
    );
  }

  if (!validEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!validPhone(phone)) {
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }

  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioFromPhone = process.env.TWILIO_FROM_PHONE;
  const estimateToPhone = process.env.ESTIMATE_TO_PHONE;

  if (!twilioAccountSid || !twilioAuthToken || !twilioFromPhone || !estimateToPhone) {
    return NextResponse.json(
      { error: "Server texting is not configured yet. Please call us for now." },
      { status: 500 }
    );
  }

  if (!validE164(twilioFromPhone) || !validE164(estimateToPhone)) {
    return NextResponse.json(
      { error: "Phone configuration must use E.164 format (example: +12175550123)." },
      { status: 500 }
    );
  }

  const text = [
    "New estimate request",
    `Name: ${fullName}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Service: ${serviceType}`,
    `Address: ${propertyAddress}`,
    `Timeline: ${timeline}`,
    `Contact pref: ${preferredContact}`,
    `Site visit needed: ${siteVisitNeeded}`,
    `Details: ${details.replace(/\s+/g, " ").trim()}`,
  ].join("\n");

  const twilioAuth = Buffer.from(`${twilioAccountSid}:${twilioAuthToken}`).toString("base64");
  const twilioResponse = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${twilioAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        From: twilioFromPhone,
        To: estimateToPhone,
        Body: text,
      }),
    }
  );

  if (!twilioResponse.ok) {
    const failed = (await twilioResponse.json().catch(() => null)) as
      | { message?: string; code?: number }
      | null;

    return NextResponse.json(
      { error: failed?.message ?? "Could not send estimate text message." },
      { status: 502 }
    );
  }

  return NextResponse.json({ message: "Your request was sent. We will contact you soon." });
}
