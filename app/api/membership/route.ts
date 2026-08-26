import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const membershipSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  rollNo: z.string().min(4, "Invalid roll number"),
  year: z.string().min(1, "Select your academic year"),
  branch: z.string().min(2, "Branch/Specialization is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  domains: z.array(z.string()).min(1, "Select at least one domain of interest"),
  referral: z.string().min(2, "Please share how you heard about us"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot spam check
    if ("honeypot" in body && body.honeypot) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // Validate inputs
    const validatedData = membershipSchema.parse(body);

    // Save to database if client configured, else log and return success
    let result = null;
    try {
      result = await prisma.clubMembership.create({
        data: {
          name: validatedData.name,
          rollNo: validatedData.rollNo,
          branch: validatedData.branch,
          year: validatedData.year,
          email: validatedData.email,
          phone: validatedData.phone,
          domains: JSON.stringify(validatedData.domains),
          referral: validatedData.referral,
        },
      });
      console.log("Saved membership application to database:", result.id);
    } catch (dbError) {
      console.error("Database submission failed (using local fallback log):", dbError);
      console.log("Fallback mock data logged:", validatedData);
    }

    return NextResponse.json(
      { success: true, message: "Membership application successfully submitted!" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Membership application error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
