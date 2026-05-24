export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#1a3a2a] to-[#0f2027] flex flex-col items-center justify-center gap-8">
      <div className="relative w-24 h-24">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border-2 animate-ping-slow"
            style={{
              borderColor: ["#7c6af7", "#f59e0b", "#10b981"][i],
              animationDelay: `${i * 0.3}s`,
              transform: `scale(${1 + i * 0.3})`,
            }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center text-4xl">
          🌿
        </div>
      </div>

      <div className="text-center">
        <div className="text-xl font-bold text-white mb-2">
          Consulting the Ancient Wisdom
        </div>
        <div className="text-sm text-white/60">
          Analyzing your Prakriti & Vikruti…
        </div>
      </div>

      <div className="flex gap-3">
        {["Vata", "Pitta", "Kapha"].map((d, i) => (
          <div
            key={d}
            className="px-4 py-1.5 rounded-full text-xs font-bold animate-pulse"
            style={{
              background: ["#7c6af720", "#f59e0b20", "#10b98120"][i],
              color: ["#a78bfa", "#fbbf24", "#34d399"][i],
              animationDelay: `${i * 0.2}s`,
            }}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}
