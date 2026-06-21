import { prisma } from "@/lib/prisma";
import { getClientIp } from "@/lib/rate-limit";
import { NextRequest, NextResponse, after } from "next/server";

function parseUserAgent(ua: string | null) {
  if (!ua) return { browser: null, os: null, device: null };
  let browser: string | null = null;
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/OPR\//.test(ua) || /Opera/.test(ua)) browser = "Opera";
  else if (/Chrome\//.test(ua)) browser = "Chrome";
  else if (/Firefox\//.test(ua)) browser = "Firefox";
  else if (/Safari\//.test(ua) && !/Chrome/.test(ua)) browser = "Safari";
  else browser = "Other";
  let os: string | null = null;
  if (/Windows/.test(ua)) os = "Windows";
  else if (/Mac OS X/.test(ua)) os = "macOS";
  else if (/Android/.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";
  else if (/Linux/.test(ua)) os = "Linux";
  else os = "Other";
  let device: string | null = null;
  if (/Mobile|Android.*Mobile|iPhone|iPod/.test(ua)) device = "mobile";
  else if (/iPad|Android(?!.*Mobile)|Tablet/.test(ua)) device = "tablet";
  else device = "desktop";
  return { browser, os, device };
}

interface PageViewData {
  path: string;
  referrer: string | null;
  userAgent: string | null;
  ip: string;
  country: string | null;
  city: string | null;
  device: string | null;
  browser: string | null;
  os: string | null;
}

const globalForPageView = globalThis as unknown as {
  pageViewQueue?: PageViewData[];
  flushTimer?: NodeJS.Timeout;
};

if (!globalForPageView.pageViewQueue) {
  globalForPageView.pageViewQueue = [];
}

async function flushQueue() {
  const queue = globalForPageView.pageViewQueue;
  if (!queue || queue.length === 0) return;
  const itemsToFlush = [...queue];
  queue.length = 0; // Clear the queue

  try {
    await prisma.pageView.createMany({
      data: itemsToFlush,
    });
  } catch (error) {
    console.error("Error flushing pageview queue:", error);
  }
}

// Setup background interval if running in a dynamic warm instance
if (!globalForPageView.flushTimer) {
  globalForPageView.flushTimer = setInterval(() => {
    flushQueue().catch(console.error);
  }, 30000);
}

export async function POST(request: NextRequest) {
  try {
    const { path, referrer } = await request.json();

    if (!path) {
      return NextResponse.json({ error: "path is required" }, { status: 400 });
    }

    const ip = getClientIp(request);
    const userAgent = request.headers.get("user-agent") || null;
    const country =
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("cf-ipcountry") ||
      null;
    const city =
      request.headers.get("x-vercel-ip-city") || null;
    const { browser, os, device } = parseUserAgent(userAgent);

    const pageViewData: PageViewData = {
      path,
      referrer: referrer || null,
      userAgent,
      ip,
      country,
      city: city ? decodeURIComponent(city) : null,
      device,
      browser,
      os,
    };

    globalForPageView.pageViewQueue!.push(pageViewData);

    // If queue is large, flush immediately using Next.js after()
    if (globalForPageView.pageViewQueue!.length >= 10) {
      after(async () => {
        await flushQueue();
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error recording pageview:", error);
    return NextResponse.json(
      { error: "Failed to record pageview" },
      { status: 500 },
    );
  }
}
