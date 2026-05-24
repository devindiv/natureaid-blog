import DonutChart from "./DonutChart";
import LeafDecoration from "./LeafDecoration";
import { AyurvedicResult } from "@/types";

const DOSHAS = {
  Vata: {
    color: "#7c6af7",
    light: "#ede9fe",
    symbol: "🌬️",
    desc: "Air & Space",
  },
  Pitta: {
    color: "#f59e0b",
    light: "#fef3c7",
    symbol: "🔥",
    desc: "Fire & Water",
  },
  Kapha: {
    color: "#10b981",
    light: "#d1fae5",
    symbol: "🌊",
    desc: "Earth & Water",
  },
};

interface Props {
  result: AyurvedicResult;
  patientName: string;
  onReset: () => void;
}

export default function ResultReport({ result, patientName, onReset }: Props) {
  const dc = DOSHAS[result.dominantDosha] ?? DOSHAS.Vata;
  const { vata, pitta, kapha } = result.doshaImbalance ?? {
    vata: 33,
    pitta: 33,
    kapha: 34,
  };

  return (
    <div className="font-sans bg-[#f8faf5] min-h-screen">
      {/* Banner */}
      <div
        className="relative text-center px-6 py-10 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${dc.color}dd, ${dc.color}88)`,
        }}
      >
        <LeafDecoration className="absolute -top-3 -left-3 w-36 text-white" />
        <LeafDecoration className="absolute -bottom-3 -right-3 w-44 text-white rotate-180" />
        <div className="relative z-10">
          <p className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2">
            Ayurvedic Root Cause Analysis
          </p>
          <h1 className="text-3xl font-black text-white mb-3">
            {patientName}'s Report
          </h1>
          <div className="inline-flex items-center gap-2 bg-white/20 px-5 py-2 rounded-full text-white font-semibold text-sm">
            {dc.symbol} Dominant Dosha: {result.dominantDosha} ({dc.desc})
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-8 space-y-5 animate-fade-in">
        {/* Root Cause */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <IconBox bg={dc.light} icon={dc.symbol} />
            <h2 className="text-lg font-extrabold text-slate-800">
              Root Cause (Nidana)
            </h2>
          </div>
          <p className="text-slate-600 leading-relaxed">{result.rootCause}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            {[
              ["Vikruti", result.vikruti, "🧬"],
              ["Agni", result.agniStatus, "🔥"],
              ["Ama Level", result.amaLevel, "⚗️"],
              ["Prognosis", result.prognosis, "📋"],
            ].map(([k, v, ic]) => (
              <div
                key={k}
                className="bg-slate-50 border border-slate-200 rounded-xl p-3"
              >
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                  {ic} {k}
                </p>
                <p className="text-sm font-bold text-slate-800">{v}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Dosha Chart */}
        <Card>
          <h2 className="text-base font-extrabold text-slate-800 mb-5">
            🌀 Dosha Imbalance
          </h2>
          <div className="flex items-center justify-around flex-wrap gap-6">
            <DonutChart vata={vata} pitta={pitta} kapha={kapha} />
            <div className="flex-1 min-w-[180px] space-y-3">
              {(
                [
                  ["Vata", vata],
                  ["Pitta", pitta],
                  ["Kapha", kapha],
                ] as [keyof typeof DOSHAS, number][]
              ).map(([d, val]) => (
                <div key={d}>
                  <div className="flex justify-between mb-1">
                    <span
                      className="text-sm font-bold"
                      style={{ color: DOSHAS[d].color }}
                    >
                      {DOSHAS[d].symbol} {d}
                    </span>
                    <span className="text-sm font-bold text-slate-800">
                      {val}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${val}%`, background: DOSHAS[d].color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Diagnosis & Srotas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Card>
            <h2 className="text-sm font-extrabold text-slate-800 mb-3">
              📿 Ayurvedic Diagnosis
            </h2>
            <p className="text-base font-bold mb-3" style={{ color: dc.color }}>
              {result.ayurvedicDiagnosis}
            </p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
              Causative Factors
            </p>
            {result.causativeFactors?.map((f, i) => (
              <div
                key={i}
                className="flex gap-2 items-start mb-2 text-sm text-slate-600"
              >
                <span className="font-bold mt-0.5" style={{ color: dc.color }}>
                  →
                </span>
                {f}
              </div>
            ))}
          </Card>
          <Card>
            <h2 className="text-sm font-extrabold text-slate-800 mb-3">
              🫀 Affected Srotas
            </h2>
            <div className="space-y-2 mb-4">
              {result.affectedSrotas?.map((s, i) => (
                <div
                  key={i}
                  className="px-3 py-2 rounded-lg text-sm font-semibold"
                  style={{ background: dc.light, color: dc.color }}
                >
                  🔸 {s}
                </div>
              ))}
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
              ⏳ Healing Timeline
            </p>
            <p className="text-sm text-slate-600 bg-slate-50 rounded-lg px-3 py-2">
              {result.healing_timeline}
            </p>
          </Card>
        </div>

        {/* Herbs */}
        <Card>
          <h2 className="text-base font-extrabold text-slate-800 mb-4">
            🌿 Recommended Herbs (Dravyaguna)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {result.herbs?.map((h, i) => (
              <div
                key={i}
                className="rounded-xl p-4 border-[1.5px]"
                style={{
                  borderColor: `${dc.color}44`,
                  background: `linear-gradient(135deg,${dc.light},#fff)`,
                }}
              >
                <p
                  className="font-extrabold text-base mb-0.5"
                  style={{ color: dc.color }}
                >
                  🌱 {h.name}
                </p>
                <p className="text-xs italic text-slate-400 mb-2">
                  {h.sanskrit}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {h.benefit}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Diet */}
        <Card>
          <h2 className="text-base font-extrabold text-slate-800 mb-4">
            🍽️ Dietary Guidelines (Ahara)
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-3">
                ✅ Favor (Pathya)
              </p>
              {result.dietaryGuidelines?.favor?.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 py-2 border-b border-slate-100 text-sm text-slate-600"
                >
                  <span className="text-emerald-500">●</span>
                  {f}
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-bold text-red-500 uppercase tracking-wide mb-3">
                ❌ Avoid (Apathya)
              </p>
              {result.dietaryGuidelines?.avoid?.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 py-2 border-b border-slate-100 text-sm text-slate-600"
                >
                  <span className="text-red-400">●</span>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Yoga & Routine */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Card>
            <h2 className="text-sm font-extrabold text-slate-800 mb-3">
              🧘 Yoga & Pranayama
            </h2>
            {result.yoga?.map((y, i) => (
              <div
                key={i}
                className="flex gap-2 items-start text-sm text-slate-600 bg-slate-50 rounded-lg p-2.5 mb-2"
              >
                <span
                  className="font-bold text-base mt-0.5"
                  style={{ color: dc.color }}
                >
                  ◈
                </span>
                {y}
              </div>
            ))}
          </Card>
          <Card>
            <h2 className="text-sm font-extrabold text-slate-800 mb-3">
              🌅 Daily Routine (Dinacharya)
            </h2>
            {result.dailyRoutine?.map((r, i) => (
              <div
                key={i}
                className="flex gap-2 items-start text-sm text-slate-600 bg-slate-50 rounded-lg p-2.5 mb-2"
              >
                <span
                  className="font-bold text-xs mt-1"
                  style={{ color: dc.color }}
                >
                  0{i + 1}
                </span>
                {r}
              </div>
            ))}
          </Card>
        </div>

        {/* Panchakarma */}
        {result.panchakarma && (
          <div
            className="rounded-xl p-5 border-[1.5px]"
            style={{
              borderColor: `${dc.color}44`,
              background: `linear-gradient(135deg,${dc.light}80,${dc.light}20)`,
            }}
          >
            <h2 className="text-sm font-extrabold text-slate-800 mb-2">
              ✨ Panchakarma Recommendation
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {result.panchakarma}
            </p>
          </div>
        )}

        <button
          onClick={onReset}
          className="w-full py-4 rounded-xl font-extrabold text-base text-white transition-all hover:-translate-y-0.5 hover:shadow-xl"
          style={{
            background: `linear-gradient(135deg,${dc.color},${dc.color}99)`,
          }}
        >
          🔄 Start New Analysis
        </button>
        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs text-amber-900 leading-relaxed">
            ⚠️ <strong>Disclaimer:</strong> {result.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      {children}
    </div>
  );
}

function IconBox({ bg, icon }: { bg: string; icon: string }) {
  return (
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
      style={{ background: bg }}
    >
      {icon}
    </div>
  );
}
