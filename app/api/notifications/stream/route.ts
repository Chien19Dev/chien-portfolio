import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      async function sendUpdate() {
        try {
          const unreadCount = await prisma.notification.count({
            where: { isRead: false },
          });
          const data = `data: ${JSON.stringify({ unreadCount })}\n\n`;
          controller.enqueue(encoder.encode(data));
        } catch {}
      }

      await sendUpdate();
      const interval = setInterval(async () => {
        await sendUpdate();
      }, 5000);
      const closeHandler = () => {
        clearInterval(interval);
        controller.close();
      };
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": heartbeat\n\n"));
        } catch {
          clearInterval(heartbeat);
          clearInterval(interval);
        }
      }, 30000);
      setTimeout(
        () => {
          clearInterval(interval);
          clearInterval(heartbeat);
          closeHandler();
        },
        5 * 60 * 1000,
      );
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
