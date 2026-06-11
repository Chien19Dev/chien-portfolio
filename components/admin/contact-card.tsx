import { MailCheck, Trash2 } from "lucide-react";
import { api, ContactMessage } from "@/lib/api";
import { alertSuccess, alertError } from "@/lib/alerts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function ContactCard({
  item,
  onReload,
}: {
  item: ContactMessage;
  onReload: () => void;
}) {
  return (
    <div
      className={[
        "border p-5 flex flex-col gap-3 transition-colors",
        item.isRead ? "border-border" : "border-primary/40 bg-primary/2",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium text-sm truncate">{item.name}</p>
          <p className="text-xs text-primary truncate mt-0.5">{item.email}</p>
        </div>
        <Badge
          variant={item.isRead ? "secondary" : "destructive"}
          size="sm"
          className="shrink-0"
        >
          {item.isRead ? "Đã đọc" : "Mới"}
        </Badge>
      </div>

      <Separator className="bg-border/60" />

      <div className="flex-1 space-y-1.5">
        <p className="text-sm font-medium leading-snug">
          {item.subject || "Không có tiêu đề"}
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
          {item.message}
        </p>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <Button
          size="sm"
          onClick={async () => {
            try {
              await api.contacts.update(item.id, { isRead: true });
              alertSuccess("Đã đánh dấu đã đọc");
              onReload();
            } catch {
              alertError("Lỗi");
            }
          }}
        >
          <MailCheck className="size-3.5" />
          Đã đọc
        </Button>
        <Button
          size="icon-sm"
          variant="ghost"
          aria-label="Xóa tin nhắn"
          onClick={async () => {
            try {
              await api.contacts.remove(item.id);
              alertSuccess("Đã xóa tin nhắn");
              onReload();
            } catch {
              alertError("Lỗi");
            }
          }}
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
