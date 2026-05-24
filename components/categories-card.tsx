import { getCategories } from "@/lib/actions";
import { categoryList } from "@/lib/interface";
import Link from "next/link";

const categoryDescriptions: Record<string, string> = {
  Ayurveda:
    "Traditional healing systems focused on balance, digestion, and prevention.",

  Nutrition:
    "Evidence-guided nutrition for energy, metabolic health, and longevity.",

  Naturopathy:
    "Natural approaches to restoring long-term health and resilience.",

  Lifestyle:
    "Sleep, movement, stress management, and sustainable daily wellness.",

  PCOS: "Hormonal health guidance rooted in nutrition and lifestyle medicine.",

  Diabetes:
    "Preventative strategies for blood sugar regulation and metabolic wellness.",
};

export default async function CategoryCard() {
  const categories: categoryList[] = await getCategories();

  if (!categories || categories.length === 0) return null;

  return (
    <section className="border-t border-[#1B2A22]/8 bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#2B8055]">
            Explore Topics
          </p>

          <h2 className="mt-5 font-editorial text-5xl font-light leading-[0.95] tracking-[-0.03em] text-[#1B2A22] md:text-6xl">
            Wellness knowledge,
            <br />
            thoughtfully organized.
          </h2>

          <p className="mt-8 text-[17px] leading-8 text-[#1B2A22]/62">
            Explore editorial collections covering Ayurveda, nutrition,
            preventative care, hormonal wellness, and modern natural health.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => {
            const description =
              categoryDescriptions[category.title] ||
              "Thoughtful wellness education and long-term health insights.";

            return (
              <Link
                key={i}
                href={`/${category.slug}`}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-[#1B2A22]/8
                  bg-[#FAF8F2]
                  p-8
                  transition
                  duration-500
                  hover:border-[#2B8055]/18
                  hover:bg-white
                "
              >
                {/* Ambient Hover Glow */}
                <div
                  className="
                    absolute
                    right-[-20%]
                    top-[-20%]
                    h-40
                    w-40
                    rounded-full
                    bg-[#2B8055]/[0.04]
                    opacity-0
                    blur-3xl
                    transition
                    duration-700
                    group-hover:opacity-100
                  "
                />

                <div className="relative z-10 flex h-full flex-col">
                  {/* Small Label */}
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#2B8055]">
                    Collection
                  </p>

                  {/* Title */}
                  <h3 className="mt-6 text-3xl font-light tracking-tight text-[#1B2A22]">
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-5 text-[15px] leading-7 text-[#1B2A22]/58">
                    {description}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto pt-12">
                    <div className="flex items-center justify-between border-t border-[#1B2A22]/8 pt-5">
                      <span className="text-[11px] uppercase tracking-[0.22em] text-[#1B2A22]/40">
                        Explore
                      </span>

                      <span
                        className="
                          text-[#1B2A22]/30
                          transition
                          duration-300
                          group-hover:translate-x-1
                          group-hover:text-[#2B8055]
                        "
                      >
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
