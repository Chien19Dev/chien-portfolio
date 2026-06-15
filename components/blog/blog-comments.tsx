"use client";

import { CommentSection } from "./comment-section";
import { DisqusComments } from "./disqus-comments";

interface BlogCommentsProps {
  postId: string;
  slug: string;
  title: string;
  url: string;
}

const DISQUS_SHORTNAME = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME;

export function BlogComments({ postId, slug, title, url }: BlogCommentsProps) {
  if (DISQUS_SHORTNAME) {
    return (
      <DisqusComments key={slug} slug={slug} title={title} url={url} />
    );
  }

  return <CommentSection postId={postId} />;
}
