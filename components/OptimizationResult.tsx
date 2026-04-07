"use client";

import BoxVisual from "./BoxVisual";
import type { PackagingResult } from "@/lib/optimizer";

interface Props {
  result: PackagingResult;
  onReset: () => void;
}

function Metric({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

function Badge({ text, green }: { text: string; green?: boolean }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
      green ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
    }`}>
      {text}
    </span>
  );
}

export default function OptimizationResult({ result, onReset }: Props) {
  const { box, material, cushioning, metrics, dropTestRating, recommendation, product } = result;

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Optimized Packaging</h2>
          <p className="text-sm text-gray-500 mt-0.5">{product.name} · {product.category}</p>
        </div>
        <button
          onClick={onReset}
          className="text-sm text-gray-400 hover:text-gray-600 underline"
        >
          ← New analysis
        </button>
      </div>

      {/* box visual + dimensions */}
      <div className="bg-gray-50 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0 w-full md:w-64">
          <BoxVisual l={box.length} w={box.width} h={box.height} />
        </div>
        <div className="flex-1 space-y-3">
          <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
            Recommended Box
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{box.length}</p>
              <p className="text-xs text-gray-500">Length (cm)</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{box.width}</p>
              <p className="text-xs text-gray-500">Width (cm)</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{box.height}</p>
              <p className="text-xs text-gray-500">Height (cm)</p>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            Wall thickness: {box.wallThickness} mm
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <Badge text={material.grade} />
            <Badge text={`Drop safe: ${dropTestRating}`} />
            {material.recyclable && <Badge text="♻ Recyclable" green />}
          </div>
        </div>
      </div>

      {/* key metrics */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Impact vs Standard Packaging
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Metric
            label="Material saved"
            value={`${metrics.materialSavedPct}%`}
            sub={`${metrics.standardSurfaceAreaCm2 - metrics.boxSurfaceAreaCm2} cm² less cardboard`}
          />
          <Metric
            label="CO₂ saved"
            value={`${metrics.co2SavedG} g`}
            sub="vs standard over-packed box"
          />
          <Metric
            label="Space efficiency"
            value={`${metrics.volumeEfficiencyPct}%`}
            sub={`${metrics.productVolumeCm3} / ${metrics.boxVolumeCm3} cm³`}
          />
          <Metric
            label="Est. box weight"
            value={`${metrics.estimatedBoxWeightG} g`}
            sub={material.grade}
          />
        </div>
      </div>

      {/* material + cushioning */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">📦 Material</h3>
          <p className="font-medium text-gray-900">{material.type}</p>
          <p className="text-sm text-gray-500 mt-1">{material.description}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">🛡 Cushioning</h3>
          <p className="font-medium text-gray-900">{cushioning.type}</p>
          <p className="text-sm text-gray-500 mt-1">
            {cushioning.thicknessCm} cm thick · {cushioning.placement}
          </p>
        </div>
      </div>

      {/* recommendation */}
      <div className="bg-green-50 border border-green-100 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-green-700 mb-1">💡 Recommendation</h3>
        <p className="text-sm text-green-800">{recommendation}</p>
      </div>
    </div>
  );
}
