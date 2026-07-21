"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
  /** Animate direct children individually with this stagger (seconds) instead of the wrapper as a whole. */
  stagger?: number;
}

export default function ScrollReveal({
  children,
  className,
  y = 32,
  duration = 1,
  delay = 0,
  stagger,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const targets = stagger ? Array.from(el.children) : el;

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [y, duration, delay, stagger] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
