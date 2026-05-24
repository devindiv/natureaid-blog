"use client";

import { Dispatch, SetStateAction } from "react";
import { FormData } from "@/types";

const SYMPTOMS = [
  "Fatigue",
  "Headache",
  "Digestive Issues",
  "Bloating",
  "Constipation",
  "Anxiety",
  "Insomnia",
  "Joint Pain",
  "Skin Issues",
  "Low Appetite",
  "Excessive Thirst",
  "Brain Fog",
  "Mood Swings",
  "Weight Gain",
  "Hair Loss",
  "Acne",
  "Cold Hands/Feet",
  "Dry Skin",
  "Excessive Sweating",
  "Irritability",
];

interface Props {
  form: FormData;
  setForm: Dispatch<SetStateAction<FormData>>;
  onSubmit: () => void;
  error: string;
}

export default function PatientForm({ form, setForm, onSubmit, error }: Props) {
  const set = (k: keyof FormData, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleSymptom = (s: string) =>
    setForm((f) => ({
      ...f,
      symptoms: f.symptoms.includes(s)
        ? f.symptoms.filter((x) => x !== s)
        : [...f.symptoms, s],
    }));

  const isValid =
    form.name &&
    form.age &&
    form.gender &&
    form.symptoms.length > 0 &&
    form.description;

  const inputCls =
    "w-full px-3.5 py-3 border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-emerald-400 bg-white transition-colors font-sans";
  const labelCls =
    "block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide";

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-lime-50 px-8 py-5 border-b border-slate-100">
        <h2 className="text-lg font-extrabold text-slate-800">
          🌿 Patient Intake Form
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          All fields help improve your Ayurvedic analysis accuracy
        </p>
      </div>

      <div className="p-8 space-y-8">
        {/* Section 1: Personal */}
        <section>
          <SectionHeader
            number="1"
            color="text-emerald-600"
            bg="bg-emerald-50"
            label="Personal Details"
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Full Name *</label>
              <input
                className={inputCls}
                placeholder="e.g. Arjun Sharma"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Age *</label>
              <input
                className={inputCls}
                type="number"
                placeholder="e.g. 32"
                value={form.age}
                onChange={(e) => set("age", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Gender *</label>
              <select
                className={inputCls}
                value={form.gender}
                onChange={(e) => set("gender", e.target.value)}
              >
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Prakriti (Constitution)</label>
              <select
                className={inputCls}
                value={form.prakriti}
                onChange={(e) => set("prakriti", e.target.value)}
              >
                <option value="">Unknown / Not sure</option>
                <option>Vata</option>
                <option>Pitta</option>
                <option>Kapha</option>
                <option>Vata-Pitta</option>
                <option>Pitta-Kapha</option>
                <option>Vata-Kapha</option>
                <option>Tridoshic</option>
              </select>
            </div>
          </div>
        </section>

        {/* Section 2: Symptoms */}
        <section>
          <SectionHeader
            number="2"
            color="text-amber-600"
            bg="bg-amber-50"
            label="Select Your Symptoms *"
            badge={
              form.symptoms.length > 0
                ? `${form.symptoms.length} selected`
                : undefined
            }
          />
          <div className="flex flex-wrap gap-2">
            {SYMPTOMS.map((s) => {
              const active = form.symptoms.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSymptom(s)}
                  className={`px-3.5 py-2 rounded-full text-[13px] font-semibold border-[1.5px] transition-all ${
                    active
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {active ? "✓ " : ""}
                  {s}
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 3: Description */}
        <section>
          <SectionHeader
            number="3"
            color="text-violet-600"
            bg="bg-violet-50"
            label="Describe Your Condition"
          />
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelCls}>Duration of Symptoms</label>
              <select
                className={inputCls}
                value={form.duration}
                onChange={(e) => set("duration", e.target.value)}
              >
                <option value="">Select duration</option>
                <option>Less than 1 week</option>
                <option>1–4 weeks</option>
                <option>1–3 months</option>
                <option>3–6 months</option>
                <option>Over 6 months</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Stress Level</label>
              <select
                className={inputCls}
                value={form.stress}
                onChange={(e) => set("stress", e.target.value)}
              >
                <option value="">Select level</option>
                <option>Low</option>
                <option>Moderate</option>
                <option>High</option>
                <option>Very High</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className={labelCls}>Detailed Description *</label>
            <textarea
              className={`${inputCls} h-24 resize-y`}
              placeholder="Describe when symptoms started, what makes them better or worse, triggers…"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Diet / Food Habits</label>
              <textarea
                className={`${inputCls} h-20 resize-none`}
                placeholder="Vegetarian? Spicy food? Irregular meals?"
                value={form.diet}
                onChange={(e) => set("diet", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Sleep Pattern</label>
              <textarea
                className={`${inputCls} h-20 resize-none`}
                placeholder="Hours of sleep, quality, sleep time…"
                value={form.sleep}
                onChange={(e) => set("sleep", e.target.value)}
              />
            </div>
          </div>
        </section>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
            ⚠️ {error}
          </div>
        )}

        <button
          type="button"
          onClick={onSubmit}
          disabled={!isValid}
          className={`w-full py-4 rounded-xl text-base font-extrabold tracking-wide transition-all ${
            isValid
              ? "bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-400 text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:-translate-y-0.5"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          {isValid
            ? "🌿 Reveal My Ayurvedic Root Cause →"
            : "Complete required fields to continue"}
        </button>

        <p className="text-center text-xs text-slate-400">
          🔒 Your data is never stored. For educational purposes only.
        </p>
      </div>
    </div>
  );
}

function SectionHeader({
  number,
  color,
  bg,
  label,
  badge,
}: {
  number: string;
  color: string;
  bg: string;
  label: string;
  badge?: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span
        className={`w-6 h-6 ${bg} ${color} rounded-md flex items-center justify-center text-xs font-bold`}
      >
        {number}
      </span>
      <span
        className={`text-[11px] font-extrabold ${color} uppercase tracking-widest`}
      >
        {label}
      </span>
      {badge && (
        <span className="bg-amber-100 text-amber-800 rounded-full px-2 py-0.5 text-[11px] font-bold">
          {badge}
        </span>
      )}
    </div>
  );
}
