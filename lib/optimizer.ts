export type Fragility = "low" | "medium" | "high";

export interface ProductInput {
  name: string;
  length: number; // cm
  width: number;  // cm
  height: number; // cm
  weight: number; // kg
  fragility: Fragility;
  category: string;
}

export interface PackagingResult {
  product: ProductInput;
  box: {
    length: number;
    width: number;
    height: number;
    wallThickness: number; // mm
  };
  material: {
    type: string;
    grade: string;
    description: string;
    recyclable: boolean;
  };
  cushioning: {
    type: string;
    thicknessCm: number;
    placement: string;
  };
  metrics: {
    productVolumeCm3: number;
    boxVolumeCm3: number;
    volumeEfficiencyPct: number;
    boxSurfaceAreaCm2: number;
    standardSurfaceAreaCm2: number;
    materialSavedPct: number;
    estimatedBoxWeightG: number;
    co2SavedG: number;
  };
  dropTestRating: string;
  recommendation: string;
}

// ─── helpers ────────────────────────────────────────────────────────────────

function round(n: number, dp = 1) {
  return Math.round(n * 10 ** dp) / 10 ** dp;
}

function boxSurface(l: number, w: number, h: number) {
  return 2 * (l * w + l * h + w * h);
}

// ─── padding rules ──────────────────────────────────────────────────────────

const PADDING: Record<Fragility, number> = {
  low:    1.0, // cm each side
  medium: 2.5,
  high:   4.0,
};

// standard (over-packed) uses 1.6x the padding
const STANDARD_PADDING_MULTIPLIER = 1.6;

// ─── material selection ─────────────────────────────────────────────────────

function selectMaterial(weight: number, fragility: Fragility) {
  // bump fragility tier for weight
  const effectiveWeight = fragility === "high" ? weight * 1.5 : weight;

  if (effectiveWeight < 1) {
    return {
      type: "Single-wall corrugated (B-flute)",
      grade: "B-flute",
      wallThickness: 3,   // mm
      gramsPerCm2: 0.032, // g/cm²
      description: "Lightweight single-wall board. Best for small, light items.",
      recyclable: true,
    };
  } else if (effectiveWeight < 5) {
    return {
      type: "Single-wall corrugated (C-flute)",
      grade: "C-flute",
      wallThickness: 4,
      gramsPerCm2: 0.042,
      description: "Standard e-commerce board. Good crush resistance up to 5 kg.",
      recyclable: true,
    };
  } else if (effectiveWeight < 15) {
    return {
      type: "Double-wall corrugated",
      grade: "BC-flute",
      wallThickness: 7,
      gramsPerCm2: 0.072,
      description: "Double-wall for heavy or fragile items. High stacking strength.",
      recyclable: true,
    };
  } else {
    return {
      type: "Triple-wall corrugated",
      grade: "BCB-flute",
      wallThickness: 12,
      gramsPerCm2: 0.110,
      description: "Industrial-grade. Use for very heavy or high-value goods.",
      recyclable: true,
    };
  }
}

// ─── cushioning selection ───────────────────────────────────────────────────

function selectCushioning(fragility: Fragility, padding: number) {
  if (fragility === "low") {
    return {
      type: "Kraft paper void fill",
      thicknessCm: padding,
      placement: "Top and bottom only",
    };
  } else if (fragility === "medium") {
    return {
      type: "Bubble wrap (small cell, 10mm)",
      thicknessCm: padding,
      placement: "All six sides",
    };
  } else {
    return {
      type: "Molded foam inserts (EPE, 25mm)",
      thicknessCm: padding,
      placement: "Custom-cut inserts all sides + corner protection",
    };
  }
}

// ─── drop test rating ───────────────────────────────────────────────────────

function dropTestRating(fragility: Fragility, material: ReturnType<typeof selectMaterial>) {
  const scores: Record<Fragility, Record<string, string>> = {
    low:    { "B-flute": "60 cm", "C-flute": "80 cm", "BC-flute": "100 cm", "BCB-flute": "120 cm" },
    medium: { "B-flute": "45 cm", "C-flute": "60 cm", "BC-flute": "90 cm",  "BCB-flute": "110 cm" },
    high:   { "B-flute": "30 cm", "C-flute": "45 cm", "BC-flute": "75 cm",  "BCB-flute": "100 cm" },
  };
  return scores[fragility][material.grade] ?? "N/A";
}

// ─── main optimizer ──────────────────────────────────────────────────────────

export function optimize(input: ProductInput): PackagingResult {
  const { length: L, width: W, height: H, weight, fragility } = input;

  const padding = PADDING[fragility];
  const stdPadding = padding * STANDARD_PADDING_MULTIPLIER;

  // optimized box
  const bL = round(L + 2 * padding);
  const bW = round(W + 2 * padding);
  const bH = round(H + 2 * padding);

  // standard (over-packed) box for comparison
  const sL = round(L + 2 * stdPadding);
  const sW = round(W + 2 * stdPadding);
  const sH = round(H + 2 * stdPadding);

  const material = selectMaterial(weight, fragility);
  const cushioning = selectCushioning(fragility, padding);

  const productVol = round(L * W * H, 0);
  const boxVol     = round(bL * bW * bH, 0);
  const volEff     = round((productVol / boxVol) * 100);

  const surfaceArea    = round(boxSurface(bL, bW, bH));
  const stdSurfaceArea = round(boxSurface(sL, sW, sH));
  const materialSaved  = round(((stdSurfaceArea - surfaceArea) / stdSurfaceArea) * 100);

  // estimated box weight: surface area (cm²) → m² × g/cm² × 10000
  const boxWeightG = round(surfaceArea * material.gramsPerCm2, 0);

  // CO2: corrugated cardboard ~1.0 kg CO2 per kg. Saved = weight diff × 1.0 × 1000g
  const stdBoxWeightG = round(stdSurfaceArea * material.gramsPerCm2, 0);
  const co2SavedG     = round((stdBoxWeightG - boxWeightG) * 1.0);

  // recommendation
  let recommendation = "";
  if (fragility === "high") {
    recommendation = "Consider custom die-cut foam inserts for maximum protection. Avoid stacking during transit.";
  } else if (fragility === "medium") {
    recommendation = "Bubble wrap provides good all-round protection. Seal edges with reinforced tape.";
  } else {
    recommendation = "Kraft paper fill is sufficient and fully recyclable. Consider a perforated easy-open strip for better UX.";
  }

  return {
    product: input,
    box: {
      length: bL,
      width:  bW,
      height: bH,
      wallThickness: material.wallThickness,
    },
    material: {
      type:        material.type,
      grade:       material.grade,
      description: material.description,
      recyclable:  material.recyclable,
    },
    cushioning,
    metrics: {
      productVolumeCm3:    productVol,
      boxVolumeCm3:        boxVol,
      volumeEfficiencyPct: volEff,
      boxSurfaceAreaCm2:   surfaceArea,
      standardSurfaceAreaCm2: stdSurfaceArea,
      materialSavedPct:    materialSaved,
      estimatedBoxWeightG: boxWeightG,
      co2SavedG,
    },
    dropTestRating: dropTestRating(fragility, material),
    recommendation,
  };
}
