import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonArticleRow() {
  return (
    <div className="py-8 border-b border-border">
      <div className="space-y-3 max-w-3xl">
        {/* Category */}
        <Skeleton className="h-3 w-24" />

        {/* Title */}
        <Skeleton className="h-5 w-[90%]" />
        <Skeleton className="h-5 w-[75%]" />

        {/* Description */}
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[85%]" />

        {/* Meta */}
        <Skeleton className="h-3 w-32 mt-2" />
      </div>
    </div>
  );
}
