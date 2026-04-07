import Link from "next/link";

function NavBar() {
  return (
    <header className="fixed top-0 w-full z-20 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📦</span>
          <span className="font-bold text-gray-900 text-xl">PackOpt</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500">
          <a href="#how-it-works" className="hover:text-gray-900 transition-colors">How it works</a>
          <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
          <a href="#use-cases" className="hover:text-gray-900 transition-colors">Use cases</a>
        </nav>
        <Link
          href="/optimize"
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          Try it free →
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-24 px-6 text-center bg-gradient-to-b from-white to-green-50/40">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
          ♻️ Sustainable packaging starts here
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Minimize packaging,{" "}
          <span className="text-green-600">not protection.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-xl mx-auto leading-relaxed">
          Enter your product dimensions and PackOpt calculates the smallest, most
          material-efficient box that still keeps your product shockproof and intact.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/optimize"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl text-base transition-colors shadow-lg shadow-green-100"
          >
            Optimize my packaging →
          </Link>
          <a
            href="#how-it-works"
            className="border border-gray-200 hover:border-gray-300 text-gray-600 font-medium px-8 py-4 rounded-xl text-base transition-colors"
          >
            See how it works
          </a>
        </div>

        {/* stat strip */}
        <div className="flex flex-wrap justify-center gap-8 pt-8 text-center">
          {[
            ["Up to 40%", "less cardboard used"],
            ["CO₂ reduced", "per shipment"],
            ["Drop-test rated", "to ISTA-3A standard"],
          ].map(([stat, label]) => (
            <div key={stat}>
              <p className="text-2xl font-bold text-gray-900">{stat}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: "✏️",
      title: "Enter product details",
      desc: "Fill in dimensions, weight, fragility level, and product category. Or upload a photo for automatic detection.",
    },
    {
      icon: "⚙️",
      title: "Algorithm calculates optimal packaging",
      desc: "PackOpt finds the minimum box size, selects the right corrugated board grade, and calculates cushioning requirements.",
    },
    {
      icon: "📊",
      title: "Get your optimization report",
      desc: "See exact box dimensions, material type, CO₂ saved, material reduction %, and a drop-test safety rating.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
          <p className="text-gray-500 mt-2">Three steps from product to optimized packaging spec</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gray-100 z-0" style={{ width: "calc(100% - 2rem)" }} />
              )}
              <div className="relative z-10 space-y-4">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-2xl">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-green-600 uppercase tracking-widest">
                  Step {i + 1}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: "📐",
      title: "Exact box dimensions",
      desc: "Get precise L×W×H recommendations with wall thickness — ready to order from any corrugated supplier.",
    },
    {
      icon: "🧱",
      title: "Smart material selection",
      desc: "B, C, double-wall, or triple-wall — automatically chosen based on product weight and fragility.",
    },
    {
      icon: "🛡️",
      title: "Drop test rating",
      desc: "Every result includes a safe-drop height rating aligned to ISTA-3A transit simulation standards.",
    },
    {
      icon: "♻️",
      title: "CO₂ & material savings",
      desc: "See exactly how much cardboard and CO₂ you save compared to standard over-packed boxes.",
    },
    {
      icon: "📸",
      title: "Image input (coming soon)",
      desc: "Upload a product photo and let AI extract dimensions automatically — no ruler needed.",
    },
    {
      icon: "📦",
      title: "Isometric box preview",
      desc: "Visual diagram of the recommended box with labeled dimensions so you can review at a glance.",
    },
  ];

  return (
    <section id="features" className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">Everything in the output</h2>
          <p className="text-gray-500 mt-2">One form. One click. A complete packaging specification.</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 space-y-3">
              <div className="text-2xl">{f.icon}</div>
              <h3 className="font-semibold text-gray-900">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  const cases = [
    {
      icon: "🛒",
      title: "E-commerce brands",
      desc: "Reduce per-shipment packaging cost and hit sustainability targets without compromising product safety.",
    },
    {
      icon: "🏭",
      title: "Manufacturers",
      desc: "Standardize packaging specs across SKUs. Input once, get optimized box sizes for your entire product line.",
    },
    {
      icon: "🚚",
      title: "Logistics & 3PLs",
      desc: "Optimize dim-weight charges by right-sizing boxes. Less void fill, better cube utilization, lower freight cost.",
    },
  ];

  return (
    <section id="use-cases" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">Who uses PackOpt</h2>
          <p className="text-gray-500 mt-2">Built for anyone who ships physical products</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((c) => (
            <div key={c.title} className="space-y-4 p-6 rounded-2xl border border-gray-100 hover:border-green-200 hover:bg-green-50/30 transition-all">
              <div className="text-3xl">{c.icon}</div>
              <h3 className="text-lg font-bold text-gray-900">{c.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 px-6 bg-green-600">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h2 className="text-4xl font-bold text-white">Ready to ship smarter?</h2>
        <p className="text-green-100 text-lg">
          Free to use. No sign-up required. Just enter your product and get your packaging spec in seconds.
        </p>
        <Link
          href="/optimize"
          className="inline-block bg-white hover:bg-gray-50 text-green-700 font-bold px-10 py-4 rounded-xl text-base transition-colors shadow-xl"
        >
          Optimize my packaging →
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-xl">📦</span>
          <span className="font-bold text-white">PackOpt</span>
          <span className="text-gray-600">· Packaging Optimizer</span>
        </div>
        <p className="text-xs text-gray-600">
          Optimization based on ISTA-3A standards · Material weights per TAPPI T-810
        </p>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Hero />
      <HowItWorks />
      <Features />
      <UseCases />
      <CTA />
      <Footer />
    </div>
  );
}
