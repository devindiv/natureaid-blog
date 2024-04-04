import { RotateCw } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <RotateCw className="mr-2 h-8 w-8 animate-spin" />
    </div>
  );
}
