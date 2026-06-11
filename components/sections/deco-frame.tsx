import { cn } from "@/lib/utils";

type DecoFrameProps = React.HTMLAttributes<HTMLDivElement> & {
  accent?: boolean;
};

export function DecoFrame({
  children,
  className,
  accent = false,
  ...rest
}: DecoFrameProps) {
  return (
    <div
      className={cn(
        "deco-panel relative bg-card text-card-foreground",
        accent && "deco-panel-accent",
        className,
      )}
      {...rest}
    >
      <span className="deco-corner deco-corner-tl" aria-hidden />
      <span className="deco-corner deco-corner-tr" aria-hidden />
      <span className="deco-corner deco-corner-bl" aria-hidden />
      <span className="deco-corner deco-corner-br" aria-hidden />
      {children}
    </div>
  );
}
