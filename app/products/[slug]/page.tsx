import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PRODUCTS } from "@/lib/data/product";
import ProductDetailsClient from "@/components/productDetailsClient";
export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };
  return { title: product.name, description: product.description };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();
  return <ProductDetailsClient product={product} />;
}

// "use client";

// import { useParams, notFound } from "next/navigation";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { RotateCcw, Pause, Play, Hand, ShoppingBag, ArrowLeft } from "lucide-react";
// import Link from "next/link";

// // --- Product Data (Same as your card page, but enriched with details) ---
// const PRODUCTS_DETAILS = {
//   "u-panel-fibc": {
//     name: "Single Loop",
//     description: "High load stability for palletized bulk transport. Engineered with an integrated U-panel design to minimize side-wall bulging, ensuring safe stacking.",
//     price: 24.99,
//     originalPrice: 32.99,
//     image: "/Images/Products/singleloop.png", // Replace with your actual static image
//     texture: "/Images/Products/singleloop.png", // REPLACE: Must be an unwrapped 2D texture map for the 3D cube
//     specs: [
//       { label: "Capacity", value: "1,500 kg" },
//       { label: "Dimensions", value: "90 x 90 x 120 cm" },
//       { label: "Material", value: "PP Woven" },
//       { label: "Loops", value: "4 x Standard" },
//     ],
//   },
//   "4-panel-fibc": {
//     name: "4-Panel FIBC Bags",
//     description: "Uniform shape, efficient for automated filling lines. The 4-panel design provides a rigid square shape, making it ideal for automated packing systems.",
//     price: 21.50,
//     originalPrice: null,
//     image: "/Images/products/4-panel.jpg",
//     texture: "/Images/unwrapped-texture.jpg",
//     specs: [
//       { label: "Capacity", value: "1,000 kg" },
//       { label: "Dimensions", value: "85 x 85 x 115 cm" },
//       { label: "Material", value: "PP Woven" },
//       { label: "Loops", value: "4 x Standard" },
//     ],
//   },
//   "baffle-bags": {
//     name: "Baffle Bags",
//     description: "Square profile that maximizes container space. Internal baffles ensure the bag holds its shape during filling and transport, reducing shipping costs.",
//     price: 28.99,
//     originalPrice: 35.99,
//     image: "/Images/products/baffle.jpg",
//     texture: "/Images/unwrapped-texture.jpg",
//     specs: [
//       { label: "Capacity", value: "2,000 kg" },
//       { label: "Dimensions", value: "110 x 110 x 130 cm" },
//       { label: "Material", value: "PP Woven + Baffles" },
//       { label: "Loops", value: "4 x Cross Corner" },
//     ],
//   },
//   "food-grade-fibc": {
//     name: "Food Grade FIBC Bags",
//     description: "FDA-compliant bags for grains, sugar & edible oils. Made with virgin-grade polypropylene and specialized liners to ensure absolute food safety.",
//     price: 34.99,
//     originalPrice: 42.99,
//     image: "/Images/products/food-grade.jpg",
//     texture: "/Images/unwrapped-texture.jpg",
//     specs: [
//       { label: "Capacity", value: "1,200 kg" },
//       { label: "Dimensions", value: "95 x 95 x 125 cm" },
//       { label: "Material", value: "FDA Approved PP" },
//       { label: "Loops", value: "4 x Standard" },
//     ],
//   },
// };

// // --- 3D Viewer Component (Adapted to your Dark Theme) ---
// type BagViewerProps = {
//   texture: string;
//   name: string;
// };

// function BagViewer3D({ texture, name }: BagViewerProps) {
//   const [angle, setAngle] = useState({ y: -28, x: -12 });
//   const [spinning, setSpinning] = useState(true);
//   const dragging = useRef<{ x: number; y: number } | null>(null);
//   const frame = useRef<number>(0);

//   useEffect(() => {
//     if (!spinning) return;
//     let last = performance.now();
//     const tick = (now: number) => {
//       const dt = now - last;
//       last = now;
//       setAngle((a) => ({ ...a, y: a.y + dt * 0.018 }));
//       frame.current = requestAnimationFrame(tick);
//     };
//     frame.current = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(frame.current);
//   }, [spinning]);

//   const onDown = useCallback((e: React.PointerEvent) => {
//     dragging.current = { x: e.clientX, y: e.clientY };
//     setSpinning(false);
//     (e.target as Element).setPointerCapture?.(e.pointerId);
//   }, []);

//   const onMove = useCallback((e: React.PointerEvent) => {
//     const start = dragging.current;
//     if (!start) return;
//     const dx = e.clientX - start.x;
//     const dy = e.clientY - start.y;
//     dragging.current = { x: e.clientX, y: e.clientY };
//     setAngle((a) => ({
//       y: a.y + dx * 0.5,
//       x: Math.max(-45, Math.min(35, a.x - dy * 0.3)),
//     }));
//   }, []);

//   const onUp = useCallback(() => {
//     dragging.current = null;
//   }, []);

//   const faces = [
//     { t: "translateZ(90px)", label: "Front" },
//     { t: "rotateY(180deg) translateZ(90px)", label: "Back" },
//     { t: "rotateY(90deg) translateZ(90px)", label: "Right" },
//     { t: "rotateY(-90deg) translateZ(90px)", label: "Left" },
//   ];

//   return (
//     <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#1D2235] to-[#121318] shadow-xl">
//       <div
//         className="relative flex h-[380px] w-full cursor-grab touch-none select-none items-center justify-center active:cursor-grabbing sm:h-[500px]"
//         onPointerDown={onDown}
//         onPointerMove={onMove}
//         onPointerUp={onUp}
//         onPointerCancel={onUp}
//         role="img"
//         aria-label={`Rotating 3D view of ${name}`}
//       >
//         <div
//           className="relative"
//           style={{ perspective: "1100px", perspectiveOrigin: "50% 45%" }}
//         >
//           <div
//             className="relative"
//             style={{
//               width: 180,
//               height: 230,
//               transformStyle: "preserve-3d",
//               transform: `rotateX(${angle.x}deg) rotateY(${angle.y}deg)`,
//             }}
//           >
//             {faces.map((f) => (
//               <div
//                 key={f.label}
//                 className="absolute inset-0 rounded-[6px] bg-cover bg-center"
//                 style={{
//                   transform: f.t,
//                   backgroundImage: `url(${texture})`,
//                   backfaceVisibility: "hidden",
//                   boxShadow: "inset 0 0 70px rgba(0,0,0,0.6)",
//                 }}
//               />
//             ))}
//             {/* top */}
//             <div
//               className="absolute rounded-[6px] bg-cover bg-center"
//               style={{
//                 width: 180,
//                 height: 180,
//                 transform: "rotateX(90deg) translateZ(115px)",
//                 backgroundImage: `url(${texture})`,
//                 filter: "brightness(1.15)",
//               }}
//             />
//             {/* bottom */}
//             <div
//               className="absolute rounded-[6px] bg-cover bg-center"
//               style={{
//                 width: 180,
//                 height: 180,
//                 transform: "rotateX(-90deg) translateZ(115px)",
//                 backgroundImage: `url(${texture})`,
//                 filter: "brightness(0.5)",
//               }}
//             />
//             {/* lift loops */}
//             {[
//               "translate3d(-78px, -54px, 78px)",
//               "translate3d(78px, -54px, 78px)",
//               "translate3d(-78px, -54px, -78px)",
//               "translate3d(78px, -54px, -78px)",
//             ].map((t) => (
//               <div
//                 key={t}
//                 className="absolute left-1/2 top-0 h-14 w-3 rounded-t-full border-2 border-b-0 border-white/60"
//                 style={{ transform: `${t}`, transformStyle: "preserve-3d" }}
//               />
//             ))}
//           </div>
//           <div
//             className="pointer-events-none mx-auto mt-6 h-6 w-52 rounded-[50%] blur-md"
//             style={{ background: "rgba(255, 255, 255, 0.05)" }}
//           />
//         </div>
//       </div>

//       {/* Dark Theme Control Bar */}
//       <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-[#0B0C10] px-4 py-3">
//         <span className="flex min-w-0 items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/60">
//           <Hand className="h-4 w-4 shrink-0" />
//           <span className="truncate">Drag to inspect</span>
//         </span>
//         <div className="flex shrink-0 items-center gap-2">
//           <button
//             onClick={() => setSpinning((s) => !s)}
//             className="rounded-full border border-white/15 p-2 text-white/80 transition-colors hover:border-amber-400 hover:text-amber-400"
//             aria-label={spinning ? "Pause rotation" : "Play rotation"}
//           >
//             {spinning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
//           </button>
//           <button
//             onClick={() => setAngle({ y: -28, x: -12 })}
//             className="rounded-full border border-white/15 p-2 text-white/80 transition-colors hover:border-amber-400 hover:text-amber-400"
//             aria-label="Reset view"
//           >
//             <RotateCcw className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- Main Product Details Page Component ---
// export default function ProductDetailsPage() {
//   const params = useParams();
//   const slug = params.slug as string;
  
//   // Fetch product data based on slug
//   const product = PRODUCTS_DETAILS[slug as keyof typeof PRODUCTS_DETAILS];

//   if (!product) {
//     notFound(); // Triggers your app/not-found.tsx if slug is invalid
//   }

//   const hasDiscount = product.originalPrice !== null;

//   return (
//     <section className="min-h-screen bg-[#0B0C10] py-10 md:py-16">
//       <div className="mx-auto max-w-7xl px-5 lg:px-8">
        
//         {/* Back Link */}
//         <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-amber-400 mb-6">
//           <ArrowLeft className="h-4 w-4" /> Back to Products
//         </Link>

//         <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          
//           {/* Left Column: Static Image (Styled like your cards) */}
//           <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-b from-[#1D2235] to-[#121318] p-6 overflow-hidden min-h-[200]">
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-[500] h-[500] object-contain object-center mix-blend-screen drop-shadow-2xl"
//             />
//           </div>

//           {/* Right Column: 3D Viewer + Details */}
//           <div className="flex flex-col space-y-6">
            
//             {/* Top: 3D Viewer */}
//             <BagViewer3D texture={product.texture} name={product.name} />

//             {/* Bottom: Product Details */}
//             <div className="flex-1 flex flex-col space-y-5">
//               <div>
//                 <p className="text-sm uppercase tracking-wider text-amber-400 font-semibold mb-1">
//                   Industrial Grade
//                 </p>
//                 <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
//                   {product.name}
//                 </h1>
//               </div>
              
//               <div className="flex items-baseline gap-3">
//                 <span className="text-3xl font-semibold text-white">${product.price.toFixed(2)}</span>
//                 {hasDiscount && (
//                   <>
//                     <span className="text-sm text-white/40 line-through">${product.originalPrice?.toFixed(2)}</span>
//                     <span className="text-xs font-bold uppercase bg-amber-400/10 text-amber-400 px-2 py-1 rounded-full border border-amber-400/20">
//                       Save {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
//                     </span>
//                   </>
//                 )}
//               </div>

//               <div className="text-sm text-white/60 leading-relaxed">
//                 <p>{product.description}</p>
//               </div>

//               {/* Specs Grid */}
//               <div className="grid grid-cols-2 gap-4 bg-white/5 border border-white/10 p-4 rounded-xl">
//                 {product.specs.map((spec, i) => (
//                   <div key={i}>
//                     <p className="text-[10px] uppercase font-semibold text-white/40">{spec.label}</p>
//                     <p className="text-sm font-medium text-white">{spec.value}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* Quantity & Add to Cart */}
//               <div className="flex flex-col sm:flex-row gap-4 pt-2">
//                 <div className="flex items-center border border-white/10 rounded-full bg-white/5 overflow-hidden w-full sm:w-auto">
//                   <button className="px-4 py-3 hover:bg-white/10 transition-colors text-white/70">-</button>
//                   <span className="w-12 text-center font-medium text-white">1</span>
//                   <button className="px-4 py-3 hover:bg-white/10 transition-colors text-white/70">+</button>
//                 </div>
                
//                 <button className="flex-1 flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#0B0C10] px-6 py-3 rounded-full font-bold transition-colors shadow-lg shadow-amber-400/20">
//                   <ShoppingBag className="h-5 w-5" />
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }