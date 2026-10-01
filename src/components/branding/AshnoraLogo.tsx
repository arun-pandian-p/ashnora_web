import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { forwardRef, useState } from "react";

interface AshnoraLogoProps {
  className?: string;
  size?: number;
  compact?: boolean;
  showTagline?: boolean;
  textColor?: string;
  accentColor?: string;
  animated?: boolean;
  variant?: "light" | "dark";
  showWordmark?: boolean;
}

export const AshnoraLogo = forwardRef<HTMLDivElement, AshnoraLogoProps>(({
  className,
  size = 38,
  compact = false,
  showTagline = false,
  textColor,
  animated = false,
  variant = "light",
  showWordmark = true
}, ref) => {
  const isDark = variant === "dark";
  const iconHeight = size;
  const [imgError, setImgError] = useState(false);

  const Wrapper = animated ? motion.div : "div";
  const wrapperProps = animated ?
  { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5 } } :
  {};

  const logoSrc = isDark ? "brand/ashnora-logo-white.png" : "brand/ashnora-logo-black.png";

  return (
    <Wrapper
      ref={ref}
      {...wrapperProps as any}
      className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      
      {!imgError ? (
        <img
          src={logoSrc}
          alt="Ashnora"
          onError={() => setImgError(true)}
          style={{ height: `${iconHeight}px`, width: 'auto' }}
          className="object-contain shrink-0"
        />
      ) : (
        /* Crisp inline vector emblem fallback */
        <div 
          style={{ width: `${iconHeight}px`, height: `${iconHeight}px` }} 
          className="rounded-xl bg-[#0B1F3A] flex items-center justify-center p-1.5 shadow-sm shrink-0 border border-orange-500/20"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
            <path d="M50 12 L84 82 L64 82 L50 48 L36 82 L16 82 Z" fill="#FFFFFF" />
            <path d="M26 62 Q50 46 74 62 Q50 90 26 62 Z" fill="#F97316" />
            <path d="M44 32 Q50 20 46 14 Q52 24 50 32 Z" fill="#F97316" />
          </svg>
        </div>
      )}

      {(!compact && showWordmark) && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className="text-xl md:text-2xl font-black tracking-tight font-sans flex items-center"
            style={textColor ? { color: textColor } : undefined}>
            <span className={isDark ? "text-white" : "text-[#0B1F3A]"}>Ash</span>
            <span className="text-[#F97316]">nora</span>
          </span>
          <span className="text-[10px] font-medium tracking-wider text-muted-foreground mt-0.5">
            {showTagline ? "One Platform. Every Restaurant." : "Restaurant OS"}
          </span>
        </div>
      )}
    </Wrapper>
  );
});

AshnoraLogo.displayName = "AshnoraLogo";