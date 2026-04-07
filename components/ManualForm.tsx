"use client";

import { useState } from "react";
import { optimize } from "@/lib/optimizer";
import type { ProductInput, PackagingResult, Fragility } from "@/lib/optimizer";
import OptimizationResult from "./OptimizationResult";

const CATEGORIES = [
  "Electronics",
  "Glassware & Ceramics",
  "Clothing & Textiles",
  "Books & Media",
  "Toys & Games",
  "Food & Beverage",
  "Cosmetics & Personal Care",
  "Industrial Parts",
  "Furniture (flat-pack)",
  "Other",
];

const FRAGILITY_OPTIONS: { value: Fragility; label: string; desc: string }[] = [
  { value: "low",    label: "Low",    desc: "Durable — can handle drops and pressure" },
  { value: "medium", label: "Medium", desc: "Some care needed — avoid hard impacts" },
  { value: "high",   label: "High",   desc: "Fragile — needs full cushioning" },
];

const defaultInput: ProductInput = {
  name: "",
  length: 0,
  width: 0,
  height: 0,
  weight: 0,
  fragility: "medium",
  category: "Electronics",
};

export default function ManualForm() {
  const [input, setInput] = useState<ProductInput>(defaultInput);
  const [result, setResult] = useState<PackagingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ProductInput, string>>>({});

  function validate(): boolean {
    const e: typeof errors = {};
    if (!input.name.trim())  e.name    = "Product name is required";
    if (input.length <= 0)   e.length  = "Must be > 0";
    if (input.width  <= 0)   e.width   = "Must be > 0";
    if (input.height <= 0)   e.height  = "Must be > 0";
    if (input.weight <= 0)   e.weight  = "Must be > 0";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // simulate brief processing time
    setTimeout(() => {
      setResult(optimize(input));
      setLoading(false);
    }, 600);
  }

  function handleReset() {
    setResult(null);
    setInput(defaultInput);
    setErrors({});
  }

  if (result) {
    return <OptimizationResult result={result} onReset={handleReset} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* product name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product name
        </label>
        <input
          type="text"
          placeholder="e.g. Wireless Headphones"
          value={input.name}
          onChange={e => setInput(p => ({ ...p, name: e.target.value }))}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
      </div>

      {/* category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product category
        </label>
        <select
          value={input.category}
          onChange={e => setInput(p => ({ ...p, category: e.target.value }))}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
        >
          {CATEGORIES.map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* dimensions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product dimensions (cm)
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(["length", "width", "height"] as const).map(dim => (
            <div key={dim}>
              <label className="block text-xs text-gray-500 mb-1 capitalize">{dim}</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                placeholder="0"
                value={input[dim] || ""}
                onChange={e => setInput(p => ({ ...p, [dim]: parseFloat(e.target.value) || 0 }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors[dim] && <p className="text-xs text-red-500 mt-1">{errors[dim]}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* weight */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product weight (kg)
        </label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="0.00"
          value={input.weight || ""}
          onChange={e => setInput(p => ({ ...p, weight: parseFloat(e.target.value) || 0 }))}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {errors.weight && <p className="text-xs text-red-500 mt-1">{errors.weight}</p>}
      </div>

      {/* fragility */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Fragility level
        </label>
        <div className="grid grid-cols-3 gap-3">
          {FRAGILITY_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setInput(p => ({ ...p, fragility: opt.value }))}
              className={`rounded-xl border p-3 text-left transition-all ${
                input.fragility === opt.value
                  ? "border-green-500 bg-green-50 ring-2 ring-green-300"
                  : "border-gray-200 hover:border-green-300"
              }`}
            >
              <p className="font-semibold text-sm text-gray-800">{opt.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
      >
        {loading ? "Optimizing…" : "Optimize Packaging →"}
      </button>
    </form>
  );
}
