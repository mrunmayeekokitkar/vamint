import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const joinSchema = z.object({
  name: z.string().trim().min(1, "Full Name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Invalid email format")
    .refine((val) => val.toLowerCase().endsWith("@gmail.com"), {
      message: "Email must be a valid @gmail.com address",
    }),
  phone: z
    .string()
    .trim()
    .min(1, "Contact Number is required")
    .regex(/^\d{10}$/, "Contact Number must be exactly 10 digits"),
  year: z.string().trim().min(1, "Academic Year is required"),
  department: z.string().trim().min(1, "Department is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot check
    if ("honeypot" in body && body.honeypot) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // Validate inputs
    const validatedData = joinSchema.parse(body);

    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    const formSecretKey = process.env.FORM_SECRET_KEY;

    if (!googleScriptUrl) {
      console.error("GOOGLE_SCRIPT_URL is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    // Forward to Google Apps Script Web App
    const payload = {
      ...validatedData,
      formType: "club",
      secretKey: formSecretKey,
    };

    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error(
        "Google Apps Script request failed:",
        response.status,
        responseText,
      );
      return NextResponse.json(
        { error: "Failed to forward data to Google Sheet" },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Club membership application successfully submitted!",
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 },
      );
    }

    console.error("Join application error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
