"use client";

import Link from "next/link";
import { useRef, type ComponentProps, type MouseEvent, type PointerEvent } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticLinkProps extends ComponentProps<typeof Link> {
  strength?: number;
}

export default function MagneticLink({
  strength = 0.35,
  className,
  children,
  onMouseMove,
  onMouseLeave,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
  ...props
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: "power3.out" });
    }
    onMouseMove?.(e);
  }

  function handleMouseLeave(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (el) {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    }
    onMouseLeave?.(e);
  }

  // Press feedback via pointer events (covers touch as well as mouse) since the
  // magnetic x/y tween above already owns this element's transform via gsap —
  // a CSS active:scale utility would conflict with that inline transform.
  function handlePointerDown(e: PointerEvent<HTMLAnchorElement>) {
    if (ref.current) gsap.to(ref.current, { scale: 0.94, duration: 0.15, ease: "power2.out" });
    onPointerDown?.(e);
  }

  function handlePointerUp(e: PointerEvent<HTMLAnchorElement>) {
    if (ref.current) gsap.to(ref.current, { scale: 1, duration: 0.3, ease: "power2.out" });
    onPointerUp?.(e);
  }

  function handlePointerLeave(e: PointerEvent<HTMLAnchorElement>) {
    if (ref.current) gsap.to(ref.current, { scale: 1, duration: 0.3, ease: "power2.out" });
    onPointerLeave?.(e);
  }

  function handlePointerCancel(e: PointerEvent<HTMLAnchorElement>) {
    if (ref.current) gsap.to(ref.current, { scale: 1, duration: 0.3, ease: "power2.out" });
    onPointerCancel?.(e);
  }

  return (
    <Link
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerCancel}
      {...props}
    >
      {children}
    </Link>
  );
}
