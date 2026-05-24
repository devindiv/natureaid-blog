export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <div className="text-xs tracking-widest uppercase text-muted-foreground">
          Loading
        </div>

        {/* Progress bar */}
        <div className="h-px w-40 bg-border overflow-hidden">
          <div className="h-px w-16 bg-foreground animate-loading-bar" />
        </div>
      </div>
    </div>
  );
}
