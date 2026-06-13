import { getHomePageData } from "@/lib/data";
import { HomePage } from "@/components/sections/pages/home-page";

export const revalidate = 60;

export default async function Page() {
  const { profile, projects, skills, testimonials } = await getHomePageData();

  return (
    <HomePage
      profile={profile}
      projects={projects}
      skills={skills}
      testimonials={testimonials}
    />
  );
}
