const instructions = [
  {
    id: "1",
    item: "Curcumin Max",
    dosage: "1 capsule once a day",
    url: "https://amzn.to/3N10NlF",
  },
  {
    id: "2",
    item: "Neem Powder",
    dosage: "6gms thrice on empty stomach",
    url: "https://amzn.to/3N5Tnxn",
  },
  {
    id: "3",
    item: "Zero Volt Bedsheet",
    dosage: "Sleep on the bedsheet at night",
    url: "https://amzn.to/49upFK3",
  },
];

export default function DipDietPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-8">
          CIRCADIAN DIP DIET
        </h1>

        {/* Instructions */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Follow These Instructions
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">S.No</th>
                  <th className="border p-2">Item</th>
                  <th className="border p-2">Dosage</th>
                  <th className="border p-2">Link</th>
                </tr>
              </thead>
              <tbody>
                {instructions.map((row) => (
                  <tr key={row.id}>
                    <td className="border p-2 text-center">{row.id}</td>
                    <td className="border p-2">{row.item}</td>
                    <td className="border p-2">{row.dosage}</td>
                    <td className="border p-2 text-center">
                      <a
                        href={row.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-1.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition"
                      >
                        BUY
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="text-center mb-6 text-lg font-medium">
          Diet: <span className="text-green-600">✔ Allowed</span>,{" "}
          <span className="text-yellow-600">- Limited</span>,{" "}
          <span className="text-red-600">✘ Avoid</span>
        </div>

        {/* Diet Tables */}
        <DietSection
          title="Vegetables"
          items={[
            ["Bottle gourd", "✔"],
            ["Ash gourd", "✔"],
            ["Tori", "✔"],
            ["Pumpkin", "-"],
            ["Carrot", "-"],
            ["Beans", "✔"],
            ["Ladyfinger", "✔"],
            ["Beetroot", "-"],
            ["Cabbage", "✔"],
            ["Cauliflower", "✔"],
            ["Brinjal", "✔"],
            ["Radish", "✔"],
            ["Onion", "-"],
            ["Tomato", "-"],
            ["Capsicum", "✔"],
            ["Green chilli", "-"],
            ["Bitter gourd", "✔"],
            ["Spinach", "✔"],
            ["Broccoli", "✔"],
            ["Mushroom", "✔"],
            ["Cucumber", "✔"],
            ["Lettuce", "✔"],
          ]}
        />

        <DietSection
          title="Fruits"
          items={[
            ["Apple", "-"],
            ["Papaya", "✔"],
            ["Pear", "-"],
            ["Guava", "-"],
            ["Banana", "✔"],
            ["Chikoo", "✘"],
            ["Mango", "✔"],
            ["Grapes", "✘"],
            ["Custard apple", "✘"],
            ["Pineapple", "✘"],
            ["Berries", "✔"],
          ]}
        />

        <DietSection
          title="Grains & Millets"
          items={[
            ["Rice", "✘"],
            ["Wheat", "-"],
            ["Refined flour", "✘"],
            ["Quinoa", "✔"],
            ["Amaranth", "✔"],
            ["Bajra", "✔"],
            ["Jowar", "✔"],
            ["Foxtail millet", "✔"],
            ["Little millet", "✔"],
            ["Kodo millet", "✔"],
            ["Barnyard millet", "✔"],
          ]}
        />

        <DietSection
          title="Pulses / Proteins"
          items={[
            ["Moong dal", "✔"],
            ["Masoor dal", "✔"],
            ["Arhar dal", "-"],
            ["Chana", "-"],
            ["Rajma", "-"],
            ["Urad", "-"],
            ["Soybean", "-"],
            ["Sprouts", "✔"],
            ["Tofu", "-"],
          ]}
        />

        <DietSection
          title="Beverages"
          items={[
            ["Warm water", "✔"],
            ["Green tea", "-"],
            ["Black coffee", "✘"],
            ["Coconut water", "✔"],
            ["Fruit juice", "✘"],
            ["Soft drinks", "✘"],
            ["Alcohol", "✘"],
          ]}
        />

        {/* Special Instructions */}
        <div className="bg-white rounded-xl shadow p-6 mt-10">
          <h2 className="text-2xl font-semibold mb-4">Special Instructions</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Eat only between 8am to 6pm</li>
            <li>Consume fruits till 12pm</li>
            <li>Lunch & Dinner in 2 plates (Salad + Home cooked food)</li>
            <li>Sunlight exposure for at least 30 minutes daily</li>
            <li>Turn off all blue light sources 30 minutes before sleep</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ------------------ Helper Component ------------------ */

function DietSection({
  title,
  items,
}: {
  title: string;
  items: [string, string][];
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map(([name, status], i) => (
          <div
            key={i}
            className="flex justify-between border rounded-lg p-2 text-sm"
          >
            <span>{name}</span>
            <span
              className={
                status === "✔"
                  ? "text-green-600 font-bold"
                  : status === "✘"
                  ? "text-red-600 font-bold"
                  : "text-yellow-600 font-bold"
              }
            >
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
