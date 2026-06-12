"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Edit, Trash2, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DecoFrame } from "@/components/sections/deco-frame";
import { api, Post } from "@/lib/api";
import { alertSuccess, alertError } from "@/lib/alerts";

interface BlogPostListProps {
  posts: Post[];
  onReload: () => void;
}

export function BlogPostList({ posts, onReload }: BlogPostListProps) {
  if (posts.length === 0) {
    return (
      <DecoFrame accent className="p-12 text-center">
        <p className="deco-eyebrow mb-3">Chưa có nội dung</p>
        <h3 className="deco-title text-2xl text-foreground mb-2">
          Bắt đầu viết bài đầu tiên
        </h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
          Tạo bài viết mới với trình soạn thảo CKEditor, thêm ảnh bìa và xuất bản
          lên blog của bạn.
        </p>
        <Button size="lg" className="rounded-sm" render={<Link href="/admin/blogs/new" />}>
          Viết bài mới
        </Button>
      </DecoFrame>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {posts.map((post, i) => {
        const date = post.publishedAt
          ? new Date(post.publishedAt).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "—";

        return (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
          >
            <DecoFrame className="group overflow-hidden h-full flex flex-col hover:border-primary/30 transition-colors">
              <div className="relative aspect-[16/10] bg-muted/30 overflow-hidden">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40 text-xs uppercase tracking-widest">
                    Không có ảnh
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <Badge
                    variant={post.published ? "success" : "secondary"}
                    size="sm"
                  >
                    {post.published ? "Đã đăng" : "Nháp"}
                  </Badge>
                </div>
              </div>

              <div className="flex-1 flex flex-col p-5">
                {post.category && (
                  <span className="deco-eyebrow text-[0.6rem] mb-2 block">
                    {post.category}
                  </span>
                )}
                <h3 className="deco-title text-lg leading-snug line-clamp-2 mb-2">
                  {post.title}
                </h3>
                {post.summary && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                    {post.summary}
                  </p>
                )}

                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-3 border-t border-border/40">
                  <span className="inline-flex items-center gap-1">
                    <User className="size-3" />
                    {post.author || "Admin"}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3" />
                    {date}
                  </span>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 rounded-sm"
                    render={<Link href={`/admin/blogs/${post.id}/edit`} />}
                  >
                    <Edit className="size-3.5" />
                    Chỉnh sửa
                  </Button>
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    aria-label="Xóa bài viết"
                    onClick={async () => {
                      if (!confirm("Xóa bài viết này?")) return;
                      try {
                        await api.posts.remove(post.id);
                        alertSuccess("Đã xóa bài viết");
                        onReload();
                      } catch {
                        alertError("Lỗi khi xóa bài viết");
                      }
                    }}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
            </DecoFrame>
          </motion.div>
        );
      })}
    </div>
  );
}
