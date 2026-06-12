"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { BlogSidebar } from "./blog-sidebar";

interface BlogAdminShellProps {
  children: ReactNode;
  postCount?: number;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function BlogAdminShell({
  children,
  postCount,
  title,
  subtitle,
  actions,
}: BlogAdminShellProps) {
  return (
    <div className="blog-luxury-page deco-page relative min-h-screen">
      <div className="relative z-10 flex min-h-screen">
        <BlogSidebar postCount={postCount} />

        <div className="flex-1 flex flex-col min-w-0">
          {(title || actions) && (
            <header className="shrink-0 border-b border-border/50 bg-background/40 backdrop-blur-md px-8 py-6">
              <div className="flex items-start justify-between gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {subtitle && (
                    <p className="deco-eyebrow text-[0.65rem] mb-1.5">{subtitle}</p>
                  )}
                  {title && (
                    <h1 className="deco-title text-3xl md:text-4xl text-foreground">
                      {title}
                    </h1>
                  )}
                </motion.div>
                {actions && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 }}
                    className="flex items-center gap-2 shrink-0"
                  >
                    {actions}
                  </motion.div>
                )}
              </div>
            </header>
          )}

          <main className="flex-1 overflow-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="p-6 md:p-8 lg:p-10"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
