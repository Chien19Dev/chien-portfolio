import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

async function isAdmin() {
  const session = await auth();
  return session?.user && session.user.role === "ADMIN";
}

export async function GET() {
  try {
    const admin = await isAdmin();
    const count = await prisma.post.count({
      where: admin ? {} : { published: true },
    });
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error counting posts:", error);
    return NextResponse.json(
      { error: "Failed to count posts" },
      { status: 500 },
    );
  }
}
