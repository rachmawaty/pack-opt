"use client";

import { useState, useRef } from "react";

type Stage = "idle" | "preview" | "analyzing" | "done";

export default function ImageUpload() {
  const [stage, setStage] = useState<Stage>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = e => {
      setPreview(e.target?.result as string);
      setStage("preview");
    };
    reader.readAsDataURL(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleAnalyze() {
    setStage("analyzing");
    // mock: 3-step progress simulation
    setTimeout(() => setStage("done"), 3000);
  }

  function handleReset() {
    setStage("idle");
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  if (stage === "analyzing") {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-green-200 border-t-green-600 animate-spin" />
        <div className="text-center space-y-1">
          <p className="font-semibold text-gray-800">Analyzing image…</p>
          <p className="text-sm text-gray-500">Detecting dimensions and product type</p>
        </div>
        <div className="w-48 bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div className="bg-green-500 h-full animate-[progress_3s_ease-in-out_forwards]" style={{ width: "0%" }} />
        </div>
      </div>
    );
  }

  if (stage === "done") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
          <span className="text-2xl">✅</span>
          <div>
            <p className="font-semibold text-green-800">Image analyzed</p>
            <p className="text-sm text-green-700">3D model generated — dimensions extracted</p>
          </div>
        </div>

        {/* mock 3D model placeholder */}
        <div className="bg-gray-900 rounded-2xl aspect-video flex items-center justify-center relative overflow-hidden">
          {preview && (
            <img src={preview} alt="Uploaded product" className="absolute inset-0 w-full h-full object-cover opacity-20" />
          )}
          <div className="relative z-10 text-center space-y-2">
            <div className="text-4xl">📦</div>
            <p className="text-white font-semibold text-sm">3D Model Preview</p>
            <p className="text-gray-400 text-xs">Coming in next release</p>
          </div>
        </div>

        {/* mock extracted dimensions */}
        <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-700">Detected dimensions (estimated)</h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[["Length", "24.0 cm"], ["Width", "12.5 cm"], ["Height", "8.0 cm"]].map(([label, val]) => (
              <div key={label}>
                <p className="text-xl font-bold text-green-600">{val}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
          <strong>Note:</strong> Image-to-3D extraction is coming soon. For accurate optimization, use the manual form with exact measurements.
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-2.5 rounded-xl text-sm transition-colors"
          >
            Upload another
          </button>
          <button
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
            onClick={handleReset}
          >
            Use these dimensions →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all ${
          dragOver
            ? "border-green-500 bg-green-50"
            : preview
            ? "border-green-300 bg-gray-50"
            : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />

        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="max-h-48 rounded-xl object-contain"
          />
        ) : (
          <>
            <div className="text-4xl mb-3">🖼️</div>
            <p className="font-semibold text-gray-700 text-sm">Drop a product image here</p>
            <p className="text-xs text-gray-400 mt-1">or click to browse · PNG, JPG, WEBP</p>
          </>
        )}
      </div>

      {preview && stage === "preview" && (
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-2.5 rounded-xl text-sm transition-colors"
          >
            Remove
          </button>
          <button
            onClick={handleAnalyze}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
          >
            Analyze image →
          </button>
        </div>
      )}

      <p className="text-xs text-gray-400 text-center">
        Tip: A clear photo from a 45° angle gives the best dimension estimate.
      </p>
    </div>
  );
}
