export default function LeafDecoration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none">
      <path
        d="M40 70 C20 60 5 40 10 15 C25 20 45 25 55 40 C65 55 60 68 40 70Z"
        fill="currentColor"
        opacity="0.15"
      />
    </svg>
  );
}
