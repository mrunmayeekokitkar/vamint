import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema
const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  rollNumber: z.string().optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const { slug } = params;
    
    // Validate input
    const validatedData = registrationSchema.parse(body);
    
    // TODO: Get event details from database when Prisma is set up
    // const event = await prisma.event.findUnique({
    //   where: { slug },
    // });

    // if (!event) {
    //   return NextResponse.json(
    //     { error: "Event not found" },
    //     { status: 404 }
    //   );
    // }

    // if (event.status !== 'upcoming') {
    //   return NextResponse.json(
    //     { error: "Registration is closed for this event" },
    //     { status: 400 }
    //   );
    // }

    // Check for spam
    if ('honeypot' in body && body.honeypot) {
      return NextResponse.json(
        { error: "Spam detected" },
        { status: 400 }
      );
    }

    // TODO: Store registration in database when Prisma is set up
    // const registration = await prisma.eventRegistration.create({
    //   data: {
    //     eventId: event.id,
    //     eventName: event.title,
    //     name: validatedData.name,
    //     email: validatedData.email,
    //     rollNumber: validatedData.rollNumber || null,
    //   },
    // });

    console.log('Event registration (database disabled):', { slug, validatedData });

    return NextResponse.json(
      { success: true, message: "Database not configured - registration logged to console" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    console.error('Event registration error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
