import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ─── PARTICIPANT SCHEMA ──────────────────────────────────────────
const participantSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email format")
    .refine((val) => val.toLowerCase().endsWith("@gmail.com"), {
      message: "Email must be a valid @gmail.com address",
    }),
  phone: z
    .string()
    .trim()
    .min(1, "Contact number is required")
    .regex(/^\d{10}$/, "Contact number must be exactly 10 digits"),
  college: z.string().trim().min(1, "College name is required"),
  department: z.string().trim().min(1, "Department is required"),
  year: z.string().trim().min(1, "Year is required"),
});

// ─── REGISTRATION SCHEMA ────────────────────────────────────────
const pitchPerfectSchema = z.object({
  teamName: z.string().trim().min(1, "Team name is required"),
  participant1: participantSchema,
  participant2: participantSchema.optional(),
  participant3: participantSchema.optional(),
  teamSize: z.number().min(1).max(3),
  paymentScreenshot: z.string().min(1, "Payment screenshot is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot check
    if ("honeypot" in body && body.honeypot) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // Validate inputs
    const validatedData = pitchPerfectSchema.parse(body);

    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    const formSecretKey = process.env.FORM_SECRET_KEY;

    if (!googleScriptUrl) {
      console.error("GOOGLE_SCRIPT_URL is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    // Flatten participants for Google Sheets
    const payload: Record<string, string | number | undefined> = {
      formType: "pitchPerfect",
      secretKey: formSecretKey,
      teamName: validatedData.teamName,
      teamSize: validatedData.teamSize,
      // Participant 1 (always present)
      p1Name: validatedData.participant1.name,
      p1Email: validatedData.participant1.email,
      p1Phone: validatedData.participant1.phone,
      p1College: validatedData.participant1.college,
      p1Department: validatedData.participant1.department,
      p1Year: validatedData.participant1.year,
      // Participant 2
      p2Name: validatedData.participant2?.name || "",
      p2Email: validatedData.participant2?.email || "",
      p2Phone: validatedData.participant2?.phone || "",
      p2College: validatedData.participant2?.college || "",
      p2Department: validatedData.participant2?.department || "",
      p2Year: validatedData.participant2?.year || "",
      // Participant 3
      p3Name: validatedData.participant3?.name || "",
      p3Email: validatedData.participant3?.email || "",
      p3Phone: validatedData.participant3?.phone || "",
      p3College: validatedData.participant3?.college || "",
      p3Department: validatedData.participant3?.department || "",
      p3Year: validatedData.participant3?.year || "",
      // Payment
      totalAmount: validatedData.teamSize * 50,
      paymentScreenshot: validatedData.paymentScreenshot,
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
        message: "Pitch Perfect registration successfully submitted!",
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

    console.error("Pitch Perfect registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
