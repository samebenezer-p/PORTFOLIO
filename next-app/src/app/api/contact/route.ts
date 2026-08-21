import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
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

    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY || "3243e93d-f930-4085-9d5f-aee655cb7461";

    const web3formsRes = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: web3formsKey,
        name: name,
        email: email,
        subject: subject ? `[NEXUS OS] ${subject}` : `[NEXUS OS] New message from ${name}`,
        message: message,
      }),
    });

    const web3formsData = await web3formsRes.json();

    if (!web3formsData.success) {
      console.error("[CONTACT SEND ERROR]", web3formsData);
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

