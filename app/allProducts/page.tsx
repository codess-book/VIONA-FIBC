import { PRODUCTS } from "@/lib/data/product";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function AllProductsPage() {
  return (
    <section className="relative min-h-screen bg-white py-12 md:py-20 overflow-hidden">
      {/* ---- Shared background system: weave texture + blueprint grid + drifting glow ---- */}
      <div className="pointer-events-none absolute inset-0">
        <div className="weave-layer absolute inset-0 opacity-[0.05]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16, 14, 14, 0.93) 1px, transparent 1px),
              linear-gradient(90deg, rgba(37, 99, 235, 0.25) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="glow-drift-1 absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[600px] bg-blue-500/[0.06] blur-3xl rounded-full" />
        <div className="glow-drift-2 absolute bottom-[10%] right-[8%] h-[260px] w-[380px] bg-cyan-400/[0.05] blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        {/* ---- HEADER ---- */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-blue-700 mb-2">
            <span className="h-px w-8 bg-blue-700" />
            Our Collection
            <span className="h-px w-8 bg-blue-700" />
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            All{" "}
            <span className="bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent">
              Products
            </span>
          </h1>
          <p className="mt-2 text-slate-500 max-w-xl mx-auto">
            Explore our full range of premium industrial packaging solutions.
          </p>
          <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-blue-700/60">
            Catalog &middot; {PRODUCTS.length} items listed
          </p>
        </div>

        {/* ---- PRODUCTS GRID ---- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {PRODUCTS.map((product, idx) => (
            <ProductCard key={product.slug} product={product} index={idx} />
          ))}
        </div>
      </div>

      <style>{`
        .weave-layer {
          background-image:
            repeating-linear-gradient(45deg, rgba(30,64,175,0.9) 0px, rgba(30,64,175,0.9) 1px, transparent 1px, transparent 10px),
            repeating-linear-gradient(-45deg, rgba(37,99,235,0.9) 0px, rgba(37,99,235,0.9) 1px, transparent 1px, transparent 10px);
          background-size: 14px 14px;
          animation: weave-drift 40s linear infinite;
        }
        @keyframes weave-drift {
          0%   { background-position: 0 0, 0 0; }
          100% { background-position: 200px 200px, -200px 200px; }
        }
        .glow-drift-1 { animation: float-a 22s ease-in-out infinite; }
        .glow-drift-2 { animation: float-b 26s ease-in-out infinite; }
        @keyframes float-a {
          0%, 100% { transform: translate(-50%, 0) scale(1); }
          50%      { transform: translate(-50%, 25px) scale(1.06); }
        }
        @keyframes float-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-15px, -20px) scale(1.05); }
        }
        @media (prefers-reduced-motion: reduce) {
          .weave-layer, .glow-drift-1, .glow-drift-2 { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

// --- Product Card: spec-sheet ref number + stitched hover border ---
function ProductCard({
  product,
  index,
}: {
  product: typeof PRODUCTS[0];
  index: number;
}) {
  const refNo = String(index + 1).padStart(3, "0");

  return (
    <div className="product-card group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10">
      {/* stitched border reveal on hover */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl border border-dashed border-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* catalog ref number */}
      <span className="absolute top-3 left-3 z-10 rounded-full bg-white/90 px-2 py-0.5 font-mono text-[10px] font-semibold text-blue-700 border border-blue-200/70 backdrop-blur-sm">
        No. {refNo}
      </span>

      {/* IMAGE CONTAINER */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/10 via-blue-500/10 to-blue-300/20 mb-4">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />

        {/* quick-view overlay */}
        <Link
          href={`/products/${product.slug}`}
          className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-blue-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <span className="mb-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold text-blue-900 shadow-sm">
            Quick View <ArrowRight className="h-3 w-3" />
          </span>
        </Link>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-slate-900">{product.name}</h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2 flex-1">{product.description}</p>

        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          {/* <span className="font-mono text-lg font-bold text-blue-900">
            ${product.price.toFixed(2)}
          </span> */}

          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1 rounded-full bg-blue-900 px-3 py-1.5 text-[10px] font-semibold text-white transition-all duration-300 hover:bg-blue-800 hover:shadow-md hover:shadow-blue-900/20"
          >
            View <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}