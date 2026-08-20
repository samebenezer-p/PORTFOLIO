import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[CONTACT] RESEND_API_KEY is missing from environment variables.");
      return NextResponse.json(
        { success: false, error: "Email service not configured." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address format." },
        { status: 400 }
      );
    }

    console.log(`[CONTACT PAYLOAD RECEIVED] From: ${name} (${email}) | Subject: ${subject || "N/A"} | Message: ${message}`);

    const resend = new Resend(apiKey);
    const { error: sendError } = await resend.emails.send({
      from: "NEXUS OS <onboarding@resend.dev>",
      to: ["samebenezer718@gmail.com"],
      replyTo: email,
      subject: subject ? `[NEXUS OS] ${subject}` : `[NEXUS OS] New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "N/A"}\n\nMessage:\n${message}`,
    });

    if (sendError) {
      console.error("[CONTACT SEND ERROR]", sendError);
      return NextResponse.json(
        { success: false, error: "Transmission failed. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      status: "TRANSMISSION_DELIVERED",
      timestamp: new Date().toISOString(),
      details: "Your encrypted message payload has been successfully dispatched to Sam's terminal.",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Transmission failed";
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}

