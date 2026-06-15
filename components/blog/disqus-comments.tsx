"use client";

import { useEffect, useState } from "react";
import { DecoFrame } from "@/components/sections/deco-frame";
import { MessageSquare } from "lucide-react";

interface DisqusCommentsProps {
  slug: string;
  title: string;
  url: string;
}

declare global {
  interface Window {
    disqus_config?: () => void;
    DISQUS?: {
      reset: (config: {
        reload?: boolean;
        config?: () => void;
      }) => void;
    };
  }
}

interface DisqusConfigContext {
  page: {
    url: string;
    identifier: string;
    title: string;
  };
}

const DISQUS_SHORTNAME = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME;

function setDisqusPageConfig(
  ctx: DisqusConfigContext,
  slug: string,
  title: string,
  url: string,
) {
  const pageUrl =
    typeof window !== "undefined" ? window.location.href : url;

  ctx.page.url = pageUrl;
  ctx.page.identifier = slug;
  ctx.page.title = title;
}

function loadDisqusEmbed(shortname: string) {
  if (document.getElementById("disqus-embed-script")) return;

  const script = document.createElement("script");
  script.id = "disqus-embed-script";
  script.src = `https://${shortname}.disqus.com/embed.js`;
  script.async = true;
  script.setAttribute("data-timestamp", String(Date.now()));
  document.body.appendChild(script);
}

export function DisqusComments({ slug, title, url }: DisqusCommentsProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!DISQUS_SHORTNAME) return;

    const thread = document.getElementById("disqus_thread");
    if (thread) thread.innerHTML = "";

    window.disqus_config = function (this: DisqusConfigContext) {
      setDisqusPageConfig(this, slug, title, url);
    };

    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: function (this: DisqusConfigContext) {
          setDisqusPageConfig(this, slug, title, url);
        },
      });
      setReady(true);
      return;
    }

    loadDisqusEmbed(DISQUS_SHORTNAME);

    const script = document.getElementById("disqus-embed-script");
    if (script) {
      script.addEventListener("load", () => setReady(true), { once: true });
    } else {
      const timer = window.setTimeout(() => setReady(true), 1500);
      return () => window.clearTimeout(timer);
    }
  }, [slug, title, url]);

  if (!DISQUS_SHORTNAME) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="size-5 text-primary" />
        <h3 className="deco-title text-xl text-foreground">Bình luận</h3>
      </div>
      <DecoFrame className="p-4 md:p-6">
        {!ready && (
          <p className="mb-4 text-sm text-muted-foreground">
            Đang tải bình luận...
          </p>
        )}
        <div id="disqus_thread" />
      </DecoFrame>
    </div>
  );
}
