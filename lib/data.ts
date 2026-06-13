import { prisma } from "@/lib/prisma";
import type { Profile, Project, Skill, Testimonial } from "@/lib/api";

const profileSelect = {
  id: true,
  fullName: true,
  title: true,
  bio: true,
  avatar: true,
  email: true,
  phone: true,
  location: true,
  githubUrl: true,
  linkedinUrl: true,
  websiteUrl: true,
  createdAt: true,
  updatedAt: true,
} as const;

function serialize<T>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T;
}

export async function getHomePageData(): Promise<{
  profile: Profile | null;
  projects: Project[];
  skills: Skill[];
  testimonials: Testimonial[];
}> {
  const [profileResult, projectsResult, skillsResult, testimonialsResult] =
    await Promise.allSettled([
      prisma.profile.findFirst({
        orderBy: { createdAt: "desc" },
        select: profileSelect,
      }),
      prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.skill.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      }),
      prisma.testimonial.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      }),
    ]);

  return {
    profile:
      profileResult.status === "fulfilled"
        ? (serialize(profileResult.value) as unknown as Profile | null)
        : null,
    projects:
      projectsResult.status === "fulfilled"
        ? (serialize(projectsResult.value) as unknown as Project[])
        : [],
    skills:
      skillsResult.status === "fulfilled"
        ? (serialize(skillsResult.value) as unknown as Skill[])
        : [],
    testimonials:
      testimonialsResult.status === "fulfilled"
        ? (serialize(testimonialsResult.value) as unknown as Testimonial[])
        : [],
  };
}

export async function getPublishedPosts() {
  return prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: { slug: true, updatedAt: true, publishedAt: true },
  });
}

export async function getCvExists(): Promise<boolean> {
  try {
    const profile = await prisma.profile.findFirst({
      orderBy: { createdAt: "desc" },
      select: { cvUrl: true },
    });
    return !!profile?.cvUrl;
  } catch {
    return false;
  }
}
