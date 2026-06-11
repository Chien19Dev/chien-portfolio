import { Label } from "@/components/ui/label";

export function WsField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-[0.6rem] tracking-widest uppercase text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}
