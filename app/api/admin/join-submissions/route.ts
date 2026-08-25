import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Simple auth check - in production use proper JWT verification
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // TODO: Fetch from database when Prisma is set up
    // const submissions = await prisma.joinSubmission.findMany({
    //   orderBy: { submittedAt: 'desc' },
    //   take: 50,
    // });

    return NextResponse.json([]);
  } catch (error) {
    console.error('Fetch submissions error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
