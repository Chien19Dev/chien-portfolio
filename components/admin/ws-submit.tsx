import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WsSubmit({
  isEditing,
  label,
  onCancel,
}: {
  isEditing: boolean;
  label: string;
  onCancel?: () => void;
}) {
  return (
    <div className="flex gap-2 pt-2">
      <Button type="submit" size="sm" className="flex-1">
        <Plus className="size-3.5" />
        {isEditing ? `Cập nhật ${label}` : `Tạo ${label}`}
      </Button>
      {onCancel && (
        <Button type="button" size="sm" variant="ghost" onClick={onCancel}>
          Huỷ
        </Button>
      )}
    </div>
  );
}
