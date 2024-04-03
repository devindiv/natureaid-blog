import { SkeletonCard } from "@/components/skeletons";
import Container from "@/components/ui/container";

export default function Loading() {
  return (
    <div>
      <Container>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-10">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </Container>
    </div>
  );
}
