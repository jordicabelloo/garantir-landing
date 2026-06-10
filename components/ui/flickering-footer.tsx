"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import * as Color from "color-bits";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const getRGBA = (
  cssColor: React.CSSProperties["color"],
  fallback = "rgba(180, 180, 180)",
): string => {
  if (typeof window === "undefined") return fallback;
  if (!cssColor) return fallback;
  try {
    if (typeof cssColor === "string" && cssColor.startsWith("var(")) {
      const el = document.createElement("div");
      el.style.color = cssColor;
      document.body.appendChild(el);
      const computed = window.getComputedStyle(el).color;
      document.body.removeChild(el);
      return Color.formatRGBA(Color.parse(computed));
    }
    return Color.formatRGBA(Color.parse(cssColor as string));
  } catch {
    return fallback;
  }
};

export const colorWithOpacity = (color: string, opacity: number): string => {
  if (!color.startsWith("rgb")) return color;
  return Color.formatRGBA(Color.alpha(Color.parse(color), opacity));
};

function GarantirMarkSVG({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 27 27"
      fill="none"
      className={className}
    >
      <g transform="translate(2,2)" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter">
        <polyline points="9,1 1,1 1,9" />
        <polyline points="15,1 23,1 23,9" />
        <polyline points="1,15 1,23 9,23" />
        <polyline points="23,15 23,23 15,23" />
      </g>
    </svg>
  );
}

const footerLinks = [
  {
    title: "Product",
    links: [
      { id: 1, title: "How it works", url: "#how" },
      { id: 2, title: "What we test", url: "#tested" },
      { id: 3, title: "The verdict", url: "#verdict" },
      { id: 4, title: "Pricing", url: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { id: 5, title: "About", url: "#" },
      { id: 6, title: "Blog", url: "#" },
      { id: 7, title: "Careers", url: "#" },
      { id: 8, title: "Contact", url: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { id: 9,  title: "Privacy Policy", url: "#" },
      { id: 10, title: "Terms of Service", url: "#" },
      { id: 11, title: "Security", url: "#" },
      { id: 12, title: "GDPR", url: "#" },
    ],
  },
];

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  maxOpacity?: number;
  text?: string;
  fontSize?: number;
  fontWeight?: number | string;
}

const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 3,
  gridGap = 3,
  flickerChance = 0.2,
  color = "#B4B4B4",
  width,
  height,
  className,
  maxOpacity = 0.15,
  text = "",
  fontSize = 140,
  fontWeight = 600,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const memoizedColor = useMemo(() => getRGBA(color), [color]);

  const drawGrid = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, cols: number, rows: number, squares: Float32Array, dpr: number) => {
      ctx.clearRect(0, 0, w, h);
      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = w; maskCanvas.height = h;
      const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
      if (!maskCtx) return;
      if (text) {
        maskCtx.save();
        maskCtx.scale(dpr, dpr);
        maskCtx.fillStyle = "white";
        maskCtx.font = `${fontWeight} ${fontSize}px "Fraunces", "Georgia", serif`;
        maskCtx.textAlign = "center";
        maskCtx.textBaseline = "middle";
        maskCtx.fillText(text, w / (2 * dpr), h / (2 * dpr));
        maskCtx.restore();
      }
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * (squareSize + gridGap) * dpr;
          const y = j * (squareSize + gridGap) * dpr;
          const sw = squareSize * dpr, sh = squareSize * dpr;
          const maskData = maskCtx.getImageData(x, y, sw, sh).data;
          const hasText = maskData.some((v, idx) => idx % 4 === 0 && v > 0);
          const opacity = squares[i * rows + j];
          ctx.fillStyle = colorWithOpacity(memoizedColor, hasText ? Math.min(1, opacity * 3 + 0.4) : opacity);
          ctx.fillRect(x, y, sw, sh);
        }
      }
    },
    [memoizedColor, squareSize, gridGap, text, fontSize, fontWeight],
  );

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, w: number, h: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      const cols = Math.ceil(w / (squareSize + gridGap));
      const rows = Math.ceil(h / (squareSize + gridGap));
      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) squares[i] = Math.random() * maxOpacity;
      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity],
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) squares[i] = Math.random() * maxOpacity;
      }
    },
    [flickerChance, maxOpacity],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let gridParams: ReturnType<typeof setupCanvas>;

    const updateSize = () => {
      const nw = width || container.clientWidth;
      const nh = height || container.clientHeight;
      setCanvasSize({ width: nw, height: nh });
      gridParams = setupCanvas(canvas, nw, nh);
    };
    updateSize();

    let lastTime = 0;
    const animate = (time: number) => {
      if (!isInView) return;
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      updateSquares(gridParams.squares, dt);
      drawGrid(ctx, canvas.width, canvas.height, gridParams.cols, gridParams.rows, gridParams.squares, gridParams.dpr);
      rafId = requestAnimationFrame(animate);
    };

    const ro = new ResizeObserver(() => updateSize());
    ro.observe(container);
    const io = new IntersectionObserver(([e]) => setIsInView(e.isIntersecting), { threshold: 0 });
    io.observe(canvas);
    if (isInView) rafId = requestAnimationFrame(animate);

    return () => { cancelAnimationFrame(rafId); ro.disconnect(); io.disconnect(); };
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);

  return (
    <div ref={containerRef} className={cn("h-full w-full", className)} {...props}>
      <canvas ref={canvasRef} className="pointer-events-none" style={{ width: canvasSize.width, height: canvasSize.height }} />
    </div>
  );
};

export function GarantirFooter() {
  return (
    <footer id="footer" className="relative w-full pb-0 border-t border-dashed border-[rgba(14,13,11,0.25)]" style={{ background: '#f2ece0', color: '#0e0d0b' }}>
      {/* Vertical dashed lines — same column as the rest of the page */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-20rem)] border-x border-dashed border-[rgba(14,13,11,0.25)]" />
      </div>
      <div className="relative flex flex-col md:flex-row md:items-start md:justify-between px-10 pt-12 pb-8"
        style={{ paddingLeft: 'calc(10rem + 4rem)', paddingRight: 'calc(10rem + 4rem)' }}
      >
        {/* Brand column */}
        <div className="flex flex-col items-start gap-y-4 max-w-xs mb-10 md:mb-0">
          <Link href="/">
            <Image
              src="/garantir-logo.png"
              alt="Garantir"
              width={0}
              height={0}
              sizes="100vw"
              style={{ height: '150px', width: 'auto', pointerEvents: 'none', filter: 'brightness(0)' }}
              draggable={false}
              priority
            />
          </Link>
          <p className="text-sm text-[rgba(14,13,11,0.5)] leading-relaxed">
            The independent proving ground between &ldquo;interested in AI automation&rdquo; and &ldquo;approved to deploy it.&rdquo;
          </p>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[rgba(14,13,11,0.5)]">
            Independent · provably local · finance-specific
          </p>
        </div>

        {/* Links columns */}
        <div className="flex gap-x-16">
          {footerLinks.map((column, idx) => (
            <ul key={idx} className="flex flex-col gap-y-2.5">
              <li className="mb-1 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[rgba(14,13,11,0.5)]">
                {column.title}
              </li>
              {column.links.map((link) => (
                <li key={link.id}
                  className="group inline-flex cursor-pointer items-center gap-1 text-sm text-[rgba(14,13,11,0.45)] hover:text-[#0e0d0b] transition-colors"
                >
                  <Link href={link.url}>{link.title}</Link>
                  <div className="flex size-3.5 items-center justify-center border border-[rgba(14,13,11,0.15)] rounded translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">
                    <ChevronRightIcon className="h-2.5 w-2.5" />
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Flickering grid */}
      <div className="w-full h-40 md:h-56 relative mt-6" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#f2ece0] z-10 from-10%" />
        <div className="absolute inset-0 w-[calc(100%-20rem)] mx-auto">
          <FlickeringGrid
            text="Protect your data"
            fontSize={120}
            fontWeight={700}
            className="h-full w-full"
            squareSize={2}
            gridGap={3}
            color="#5d7e10"
            maxOpacity={0.55}
            flickerChance={0.08}
          />
        </div>
      </div>
    </footer>
  );
}
