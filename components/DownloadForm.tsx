"use client";

import { useState } from "react";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(8, "Valid phone required"),
});

export default function DownloadForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    try {
      Schema.parse(data);
    } catch (err: any) {
      setError(err.errors[0].message);
      return;
    }

    setLoading(true);

    const response = await fetch("/api/download", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      setError("Something went wrong.");
      setLoading(false);
      return;
    }

    // Trigger file download
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Natureaid-Clinical-Guide.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      <input
        name="name"
        placeholder="Full Name"
        className="w-full border-b border-border py-3 bg-transparent focus:outline-none focus:border-foreground"
      />

      <input
        name="email"
        placeholder="Email Address"
        className="w-full border-b border-border py-3 bg-transparent focus:outline-none focus:border-foreground"
      />

      <input
        name="phone"
        placeholder="Phone Number"
        className="w-full border-b border-border py-3 bg-transparent focus:outline-none focus:border-foreground"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="
          mt-4 px-10 py-4
          text-xs tracking-widest uppercase
          border border-foreground
          hover:bg-foreground hover:text-background
          transition-all duration-300
        "
      >
        {loading ? "Preparing Download..." : "Download PDF"}
      </button>
    </form>
  );
}
