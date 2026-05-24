import Container from "@/components/ui/container";
import { SkeletonArticleRow } from "@/components/skeletons";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <Container>
        <div className="px-6 py-20 max-w-5xl">
          <div className="mb-14 space-y-4">
            <div className="h-8 w-48 bg-border/40" />
            <div className="h-4 w-96 bg-border/30" />
          </div>

          <div className="divide-y divide-border">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonArticleRow key={i} />
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
