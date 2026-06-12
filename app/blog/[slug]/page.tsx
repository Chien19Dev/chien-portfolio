
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DecoFrame } from "@/components/sections/deco-frame";
import { Calendar, Clock, ChevronLeft, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;

    const post = await prisma.post.findUnique({
        where: { slug, published: true },
    });

    if (!post) {
        notFound();
    }

    const formattedDate = new Date(post.publishedAt || post.createdAt).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    const wordCount = post.content ? post.content.replace(/<[^>]*>/g, '').split(/\s+/).length : 0;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <div className="deco-page relative min-h-screen pb-16">
            <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
                <div className="max-w-3xl mx-auto space-y-6">

                    {/* Back Button */}
                    <Button
                        render={<Link href="/blog" />}
                        variant="ghost"
                        size="sm"
                        className="-ms-3 text-muted-foreground hover:text-foreground"
                    >
                        <ChevronLeft className="size-4" />
                        Quay lại Blog
                    </Button>

                    {/* Article Container */}
                    <DecoFrame className="p-6 md:p-10 lg:p-12 space-y-6 md:space-y-8 overflow-hidden">

                        {/* Header */}
                        <div className="space-y-4 border-b border-border pb-6 md:pb-8">
                            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-primary font-medium">
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                    {formattedDate}
                </span>
                                <span className="text-muted-foreground/30">•</span>
                                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                                    {readTime} phút đọc
                </span>
                                <span className="text-muted-foreground/30">•</span>
                                <span className="flex items-center gap-1.5">
                  <Tag className="size-3.5" />
                                    {post.category || "General"}
                </span>
                            </div>

                            <h1 className="deco-title text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1.5">
                  <User className="size-3.5 text-primary" />
                    {post.author || "Chiến Nguyễn"}
                </span>
                                {post.tags && post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {post.tags.map((tag) => (
                                            <span key={tag} className="px-2 py-0.5 rounded-full border border-border bg-muted/40">
                        #{tag}
                      </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Cover Image */}
                        {post.coverImage && (
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-muted">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        {/* Content Body */}
                        <article
                            className="prose dark:prose-invert max-w-none text-foreground leading-relaxed text-sm md:text-base space-y-5"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                    </DecoFrame>
                </div>
            </div>
        </div>
    );
}