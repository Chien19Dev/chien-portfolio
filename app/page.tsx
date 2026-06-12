"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { api, Profile, Project, Skill } from "@/lib/api";
import { fadeUp } from "@/lib/motion";
import { ProfileCard } from "@/components/sections/pages/profile-card";
import { ContactSection } from "@/components/sections/pages/contact-section";
import { ProjectsSection } from "@/components/sections/pages/projects-section";
import { SkillsSection } from "@/components/sections/pages/skills-section";

const MotionDiv = motion.div;

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const initials = useMemo(() => {
    const name = profile?.fullName || "Hồ sơ";
    return name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [profile]);

  useEffect(() => {
    Promise.allSettled([
      api.profiles.current(),
      api.projects.list(),
      api.skills.list(),
    ])
      .then((results) => {
        if (results[0].status === "fulfilled") setProfile(results[0].value);
        if (results[1].status === "fulfilled") setProjects(results[1].value);
        if (results[2].status === "fulfilled") setSkills(results[2].value);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Fragment>
      <div className="deco-page relative">
        <div className="relative z-10 container mx-auto px-4 py-4 md:py-8">
          {loading && (
            <div className="mb-6 h-px w-full overflow-hidden bg-border">
              <div className="h-full w-1/3 animate-pulse bg-primary" />
            </div>
          )}
          <div className="grid items-stretch gap-6 md:grid-cols-12">
            <div className="md:col-span-5">
              <MotionDiv {...fadeUp} className="h-full">
                <ProfileCard
                  profile={profile}
                  initials={initials}
                  loading={loading}
                />
              </MotionDiv>
            </div>
            <div className="md:col-span-7 space-y-6">
              <MotionDiv
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.08 }}
              >
                <SkillsSection skills={skills} loading={loading} />
              </MotionDiv>

              <MotionDiv
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.14 }}
              >
                <ContactSection />
              </MotionDiv>
            </div>
          </div>
          <MotionDiv
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="mt-10 md:mt-14"
          >
            <ProjectsSection projects={projects} loading={loading} />
          </MotionDiv>
        </div>
      </div>
    </Fragment>
  );
}
