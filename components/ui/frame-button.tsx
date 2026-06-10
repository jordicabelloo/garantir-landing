/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";
import React from "react";
import { motion } from "motion/react";

type ButtonVariant = "outline" | "default" | "secondary";

type BaseProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  glow?: boolean;
  size?: number | string;
  offset?: number;
  hoverOffset?: number;
};

type ButtonProps = BaseProps &
  ComponentPropsWithoutRef<typeof motion.button> & {
    as?: "button";
    href?: never;
  };

type AnchorProps = BaseProps &
  Omit<ComponentPropsWithoutRef<typeof motion.a>, "href"> & {
    as: "link";
    href: string;
  };

type FrameButtonProps = ButtonProps | AnchorProps;

export function FrameButton({
  children,
  className,
  variant = "default",
  glow = false,
  size = 20,
  offset = 7.5,
  hoverOffset = 7,
  ...props
}: FrameButtonProps) {
  const commonStyles = cn(
    "group relative inline-flex overflow-visible items-center justify-center",
    "border px-8 py-4",
    "cursor-pointer no-underline",
    "uppercase tracking-[0.2em]",
    "text-sm font-medium",
    "transition-all duration-300",
    "select-none",

    variant === "default" && [
      "bg-primary border-primary text-primary-foreground hover:brightness-110",
    ],

    variant === "secondary" && [
      "bg-transparent border-[rgba(236,230,216,0.25)] text-foreground hover:bg-[rgba(236,230,216,0.08)]",
    ],

    variant === "outline" && [
      "bg-transparent border-[rgba(236,230,216,0.25)] text-foreground hover:bg-[rgba(236,230,216,0.08)]",
    ],

    className,
  );

  const glowLayer = glow ? (
    <div
      className="absolute inset-0 -z-10 opacity-0 blur-2xl group-hover:opacity-40 group-hover:scale-110"
      style={{ background: "currentColor" }}
    />
  ) : null;

  const Content = (
    <>
      {glowLayer}
      {children}
      <FrameMarkers size={size} offset={offset} hoverOffset={hoverOffset} />
    </>
  );

  if (props.as === "link") {
    const { as, href, ...anchorProps } = props;
    return (
      <motion.a href={href} className={commonStyles} initial="initial" whileHover="hover" whileTap="tap" {...anchorProps}>
        {Content}
      </motion.a>
    );
  }

  const { as, ...buttonProps } = props;
  return (
    <motion.button className={commonStyles} whileTap={{ scale: 0.985 }} {...buttonProps}>
      {Content}
    </motion.button>
  );
}

type IconProps = React.SVGProps<SVGSVGElement>;

export function ChevronDownLeft({ className, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn("icon", className)} {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 8v8h8" />
    </svg>
  );
}

export function ChevronDownRight({ className, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn("icon", className)} {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M16 8v8h-8" />
    </svg>
  );
}

export function ChevronUpLeft({ className, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn("icon", className)} {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 16v-8h8" />
    </svg>
  );
}

export function ChevronUpRight({ className, ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn("icon", className)} {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M16 16v-8h-8" />
    </svg>
  );
}

interface FrameMarkersProps {
  className?: string;
  size?: number | string;
  offset?: number;
  hoverOffset?: number;
}

export function FrameMarkers({ className, size = 20, offset = 7.5, hoverOffset = 4 }: FrameMarkersProps) {
  const isSizeString = typeof size === "string" && size.includes("-");
  const baseStyles = cn(
    "absolute text-muted-foreground transition-all duration-300 ease-out pointer-events-none",
    "group-hover:text-foreground",
    isSizeString ? size : "",
    className,
  );
  const styleBase = isSizeString ? {} : { width: size, height: size };
  const offsetPx = `-${offset}px`;
  const movePx = `${hoverOffset}px`;
  const negMovePx = `-${hoverOffset}px`;

  return (
    <>
      <ChevronUpLeft
        style={{ ...styleBase, top: offsetPx, left: offsetPx, "--move-x": negMovePx, "--move-y": negMovePx } as React.CSSProperties}
        className={cn(baseStyles, "group-hover:[transform:translate(var(--move-x),var(--move-y))]")}
      />
      <ChevronUpRight
        style={{ ...styleBase, top: offsetPx, right: offsetPx, "--move-x": movePx, "--move-y": negMovePx } as React.CSSProperties}
        className={cn(baseStyles, "group-hover:[transform:translate(var(--move-x),var(--move-y))]")}
      />
      <ChevronDownRight
        style={{ ...styleBase, bottom: offsetPx, right: offsetPx, "--move-x": movePx, "--move-y": movePx } as React.CSSProperties}
        className={cn(baseStyles, "group-hover:[transform:translate(var(--move-x),var(--move-y))]")}
      />
      <ChevronDownLeft
        style={{ ...styleBase, bottom: offsetPx, left: offsetPx, "--move-x": negMovePx, "--move-y": movePx } as React.CSSProperties}
        className={cn(baseStyles, "group-hover:[transform:translate(var(--move-x),var(--move-y))]")}
      />
    </>
  );
}

export default FrameButton;
