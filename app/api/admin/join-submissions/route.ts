import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Cookie auth check
    const token = request.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let memberships: any[] = [];
    let committeeApps: any[] = [];

    try {
      memberships = await prisma.clubMembership.findMany({
        orderBy: { submittedAt: "desc" },
      });
      committeeApps = await prisma.committeeApplication.findMany({
        orderBy: { submittedAt: "desc" },
      });
    } catch (dbError) {
      console.error("Prisma error fetching admin submissions:", dbError);
    }

    return NextResponse.json({
      memberships,
      committeeApps,
    });
  } catch (error) {
    console.error("Fetch submissions error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
export const dynamic = "force-dynamic";
