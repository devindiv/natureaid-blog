interface DonutChartProps {
  vata: number;
  pitta: number;
  kapha: number;
}

const DOSHAS = {
  Vata: "#7c6af7",
  Pitta: "#f59e0b",
  Kapha: "#10b981",
};

export default function DonutChart({ vata, pitta, kapha }: DonutChartProps) {
  const r = 54,
    cx = 70,
    cy = 70,
    stroke = 22;
  const circ = 2 * Math.PI * r;
  const offset = circ * 0.25;
  const v = (vata / 100) * circ;
  const p = (pitta / 100) * circ;
  const k = (kapha / 100) * circ;

  return (
    <svg width="140" height="140" className="block mx-auto">
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#f1f5f9"
        strokeWidth={stroke}
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={DOSHAS.Vata}
        strokeWidth={stroke}
        strokeDasharray={`${v} ${circ - v}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={DOSHAS.Pitta}
        strokeWidth={stroke}
        strokeDasharray={`${p} ${circ - p}`}
        strokeDashoffset={offset - v}
        strokeLinecap="round"
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={DOSHAS.Kapha}
        strokeWidth={stroke}
        strokeDasharray={`${k} ${circ - k}`}
        strokeDashoffset={offset - v - p}
        strokeLinecap="round"
      />
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        fill="#1e293b"
        fontSize="11"
        fontWeight="700"
      >
        Dosha
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#64748b" fontSize="10">
        Balance
      </text>
    </svg>
  );
}
