import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";
    const type = searchParams.get("type") || "all";

    if (!q.trim()) {
      return NextResponse.json({ posts: [], projects: [] });
    }

    const searchQuery = q.trim();

    const [posts, projects] = await Promise.all([
      type === "projects"
        ? []
        : prisma.post.findMany({
            where: {
              published: true,
              OR: [
                { title: { contains: searchQuery, mode: "insensitive" } },
                { summary: { contains: searchQuery, mode: "insensitive" } },
                { category: { contains: searchQuery, mode: "insensitive" } },
                { tags: { has: searchQuery } },
              ],
            },
            select: {
              id: true,
              title: true,
              slug: true,
              summary: true,
              published: true,
              coverImage: true,
              author: true,
              category: true,
              tags: true,
              publishedAt: true,
              createdAt: true,
              content: true,
            },
            orderBy: { publishedAt: "desc" },
            take: 20,
          }),
      type === "posts"
        ? []
        : prisma.project.findMany({
            where: {
              published: true,
              OR: [
                { title: { contains: searchQuery, mode: "insensitive" } },
                { description: { contains: searchQuery, mode: "insensitive" } },
                { technologies: { has: searchQuery } },
              ],
            },
            select: {
              id: true,
              title: true,
              description: true,
              technologies: true,
              githubUrl: true,
              demoUrl: true,
              published: true,
              categoryId: true,
              createdAt: true,
              images: true,
            },
            orderBy: { createdAt: "desc" },
            take: 20,
          }),
    ]);

    const postsWithReadTime = posts.map((post) => {
      const wordCount = post.content
        ? post.content.replace(/<[^>]*>/g, "").split(/\s+/).length
        : 0;
      const readTime = Math.max(1, Math.ceil(wordCount / 200));
      const { content, ...rest } = post;
      return { ...rest, readTime };
    });

    return NextResponse.json({ posts: postsWithReadTime, projects });
  } catch (error) {
    console.error("Error searching:", error);
    return NextResponse.json({ error: "Failed to search" }, { status: 500 });
  }
}
