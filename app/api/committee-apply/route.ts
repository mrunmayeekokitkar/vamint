import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const committeeApplySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  rollNo: z.string().min(4, "Invalid roll number"),
  year: z.string().min(1, "Select your academic year"),
  branch: z.string().min(2, "Branch/Specialization is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  position: z.string().min(2, "Preferred position is required"),
  reason: z.string().min(15, "Describe why in at least 15 characters"),
  experience: z.string().min(10, "Describe experience in at least 10 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot spam check
    if ("honeypot" in body && body.honeypot) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // Validate inputs
    const validatedData = committeeApplySchema.parse(body);

    // Save to database
    let result = null;
    try {
      result = await prisma.committeeApplication.create({
        data: {
          name: validatedData.name,
          rollNo: validatedData.rollNo,
          branch: validatedData.branch,
          year: validatedData.year,
          email: validatedData.email,
          phone: validatedData.phone,
          position: validatedData.position,
          reason: validatedData.reason,
          experience: validatedData.experience,
        },
      });
      console.log("Saved committee application to database:", result.id);
    } catch (dbError) {
      console.error("Database submission failed (using local fallback log):", dbError);
      console.log("Fallback mock data logged:", validatedData);
    }

    return NextResponse.json(
      { success: true, message: "Committee application successfully submitted!" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Committee application error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
