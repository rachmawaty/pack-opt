import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PackOpt — Packaging Optimizer",
  description: "Optimize packaging and add protection with less material. Right-sized boxes, less waste, full product safety.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen antialiased">{children}</body>
    </html>
  );
}
