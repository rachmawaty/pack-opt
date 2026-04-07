"use client";

import { useState } from "react";
import Link from "next/link";
import ManualForm from "@/components/ManualForm";
import ImageUpload from "@/components/ImageUpload";

type Tab = "manual" | "image";

export default function Home() {
  const [tab, setTab] = useState<Tab>("manual");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30">
      {/* nav */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-xl">📦</span>
            <span className="font-bold text-gray-900 text-lg">PackOpt</span>
          </Link>
          <span className="ml-auto text-xs text-gray-400">Packaging Optimizer</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10 space-y-8">
        {/* hero */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Minimize packaging, <span className="text-green-600">not protection.</span>
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Enter your product dimensions or upload a photo. PackOpt calculates the smallest,
            most material-efficient box that still keeps your product intact.
          </p>
        </div>

        {/* card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setTab("manual")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                tab === "manual"
                  ? "text-green-700 border-b-2 border-green-600 bg-green-50/50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              ✏️ Enter manually
            </button>
            <button
              onClick={() => setTab("image")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                tab === "image"
                  ? "text-green-700 border-b-2 border-green-600 bg-green-50/50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              📸 Upload image
            </button>
          </div>

          {/* content */}
          <div className="p-6">
            {tab === "manual" ? <ManualForm /> : <ImageUpload />}
          </div>
        </div>

        {/* footer note */}
        <p className="text-center text-xs text-gray-400">
          Optimization based on ISTA-3A drop test standards · Material weights per TAPPI T-810
        </p>
      </main>
    </div>
  );
}
