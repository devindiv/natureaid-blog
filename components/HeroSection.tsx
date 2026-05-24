import LeafDecoration from "./LeafDecoration";

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-[#0f2027] via-[#1a3a2a] to-[#203a43] px-6 pt-14 pb-24 text-center overflow-hidden">
      <LeafDecoration className="absolute -top-5 -left-5 w-44 text-green-400" />
      <LeafDecoration className="absolute -bottom-5 -right-5 w-52 text-lime-400 rotate-180" />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 50%, rgba(74,222,128,0.08) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full text-sm text-white/85 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block shadow-[0_0_6px_#4ade80]" />
          AI-Powered Ayurvedic Diagnosis
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
          Discover Your{" "}
          <span className="bg-gradient-to-r from-green-400 via-lime-400 to-yellow-300 bg-clip-text text-transparent">
            Ayurvedic Root Cause
          </span>
        </h1>

        <p className="text-white/65 text-base max-w-md mx-auto leading-relaxed mb-8">
          Rooted in 5,000 years of Vedic science. Share your symptoms and
          receive a personalised Dosha analysis, herbal remedies & healing plan.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          {[
            ["🌬️", "Vata", "Air & Space"],
            ["🔥", "Pitta", "Fire & Water"],
            ["🌊", "Kapha", "Earth & Water"],
          ].map(([icon, name, desc]) => (
            <div
              key={name}
              className="flex items-center gap-2 bg-white/10 border border-white/12 px-4 py-2 rounded-xl text-white/80 text-sm font-semibold"
            >
              <span>{icon}</span>
              <span>{name}</span>
              <span className="text-white/40 text-xs">· {desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
