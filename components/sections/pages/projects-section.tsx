"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Eye, Link } from "lucide-react";
import { Project } from "@/lib/api";
import { ProjectDetailDialog } from "@/components/sections/pages/project-detail-dialog";
import { fadeEase } from "@/lib/motion";
import { DecoFrame } from "@/components/sections/deco-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeading } from "../admin/admin-section-heading";

const MotionDiv = motion.div;

interface ProjectsSectionProps {
  projects: Project[];
  loading: boolean;
}

export function ProjectsSection({ projects, loading }: ProjectsSectionProps) {
  const [detailProject, setDetailProject] = useState<Project | null>(null);

  return (
    <section id="projects">
      <SectionHeading label="Tác phẩm" title="Dự án" className="mb-8" />

      <div className="grid gap-5 md:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-80 w-full" />
            ))
          : projects.map((project, index) => (
              <MotionDiv
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.05 * index,
                  ease: fadeEase,
                }}
                whileHover={{ y: -3 }}
              >
                <DecoFrame className="flex h-full flex-col overflow-hidden">
                  <div
                    className="aspect-video border-b border-border bg-muted bg-cover bg-center"
                    style={{
                      backgroundImage: project.images && project.images.length > 0
                        ? `url(${project.images[0]})`
                        : undefined,
                    }}
                  />
                  <div className="flex flex-1 flex-col gap-4 p-5">
                    <h3 className="deco-title text-xl text-foreground">
                      {project.title}
                    </h3>
                    <p className="flex-1 text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {(project.technologies || []).map((tag) => (
                        <Badge key={tag} variant="outline" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setDetailProject(project)}
                      >
                        Chi tiết <Eye />
                      </Button>
                      {project.demoUrl && (
                        <Button
                          size="sm"
                          render={
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          }
                        >
                          Xem demo <ExternalLink />
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          render={
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          }
                        >
                          Mã nguồn <Link />
                        </Button>
                      )}
                    </div>
                  </div>
                </DecoFrame>
              </MotionDiv>
            ))}
      </div>

      <ProjectDetailDialog
        project={detailProject}
        open={detailProject !== null}
        onOpenChange={(open) => {
          if (!open) setDetailProject(null);
        }}
      />
    </section>
  );
}
