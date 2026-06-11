import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="space-y-7">
      <Skeleton className="size-29.5 rounded-full" />
      <div className="space-y-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-5 w-2/3" />
      </div>
      <Skeleton className="h-px w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  );
}
