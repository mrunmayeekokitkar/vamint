import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema
const joinSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  rollNo: z.string().min(4, "Invalid roll number"),
  year: z.string().min(1, "Select your academic year"),
  branch: z.string().min(2, "Branch/Specialization is required"),
  domains: z.array(z.string()).min(1, "Select at least one domain of interest"),
  reason: z.string().min(15, "Describe why in at least 15 characters"),
  github: z.string().url("Must be a valid URL").or(z.literal("")),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = joinSchema.parse(body);
    
    // Check for spam (honeypot field - if present, it's a bot)
    if ('honeypot' in body && body.honeypot) {
      return NextResponse.json(
        { error: "Spam detected" },
        { status: 400 }
      );
    }

    // TODO: Store in database when Prisma is set up
    // const submission = await prisma.joinSubmission.create({
    //   data: {
    //     name: validatedData.name,
    //     email: validatedData.email,
    //     rollNo: validatedData.rollNo,
    //     year: validatedData.year,
    //     branch: validatedData.branch,
    //     domains: JSON.stringify(validatedData.domains),
    //     github: validatedData.github || null,
    //     reason: validatedData.reason,
    //   },
    // });

    // TODO: Send notification email to committee using Resend
    // if (process.env.RESEND_API_KEY) {
    //   await resend.emails.send({
    //     from: 'VAMINT <noreply@vamint.club>',
    //     to: 'committee@vamint.club',
    //     subject: `New Join Application: ${validatedData.name}`,
    //     html: `<p>New application from ${validatedData.name} (${validatedData.email})</p>`,
    //   });
    // }

    console.log('Join submission (database disabled):', validatedData);

    return NextResponse.json(
      { success: true, message: "Database not configured - submission logged to console" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    console.error('Join submission error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
