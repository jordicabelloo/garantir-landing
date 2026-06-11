"use client";

import { cn } from "@/lib/utils";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  titleClassName,
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border border-[rgba(14,13,11,0.18)] bg-[#f9f8f6] px-5 py-4 transition-all duration-700",
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-[#f2ece0] after:to-transparent after:content-['']",
        "hover:border-[rgba(14,13,11,0.32)] hover:bg-[#f5f3ee]",
        "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        {icon && (
          <span className="relative inline-flex shrink-0 items-center justify-center rounded-full border border-[rgba(14,13,11,0.14)] bg-[#f2ece0] p-1.5">
            {icon}
          </span>
        )}
        <p
          className={cn(
            "font-serif text-lg font-medium tracking-tight text-[#0e0d0b]",
            titleClassName
          )}
        >
          {title}
        </p>
      </div>
      <p className="font-sans text-sm text-[rgba(14,13,11,0.7)]">{description}</p>
      <p className="font-mono text-xs tracking-widest uppercase text-[rgba(14,13,11,0.38)]">
        {date}
      </p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center">
      {cards?.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}

export { DisplayCard };
