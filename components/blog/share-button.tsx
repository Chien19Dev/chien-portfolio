"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { alertSuccess, alertError } from "@/lib/alerts";

interface ShareButtonProps {
  title: string;
  url: string;
  text?: string;
}

export function ShareButton({ title, url, text }: ShareButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleShare() {
    setLoading(true);
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title,
          text: text || title,
          url,
        });
        return;
      }

      await navigator.clipboard.writeText(url);
      alertSuccess("Đã sao chép liên kết vào clipboard");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;

      try {
        await navigator.clipboard.writeText(url);
        alertSuccess("Đã sao chép liên kết vào clipboard");
      } catch {
        alertError("Không thể chia sẻ bài viết");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleShare}
      disabled={loading}
      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
    >
      <Share2 className="size-4" />
      Chia sẻ
    </Button>
  );
}
