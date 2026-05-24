export interface FormData {
  name: string;
  age: string;
  gender: string;
  prakriti: string;
  symptoms: string[];
  duration: string;
  description: string;
  diet: string;
  sleep: string;
  stress: string;
}

export interface Herb {
  name: string;
  sanskrit: string;
  benefit: string;
}

export interface AyurvedicResult {
  rootCause: string;
  vikruti: string;
  doshaImbalance: { vata: number; pitta: number; kapha: number };
  dominantDosha: "Vata" | "Pitta" | "Kapha";
  agniStatus: string;
  amaLevel: string;
  affectedSrotas: string[];
  ayurvedicDiagnosis: string;
  causativeFactors: string[];
  herbs: Herb[];
  dietaryGuidelines: { favor: string[]; avoid: string[] };
  dailyRoutine: string[];
  yoga: string[];
  panchakarma: string;
  prognosis: string;
  healing_timeline: string;
  disclaimer: string;
}

export type Step = "form" | "loading" | "result";
