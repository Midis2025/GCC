"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface RevealProps {
  children: ReactNode;
  /** Stagger in milliseconds, applied as an animation-delay. */
  delay?: number;
  as?: ElementType;
  className?: string;
}

/**
 * Shared IntersectionObserver.
 *
 * A page can hold 30+ Reveal instances. Giving each one its own observer means
 * 30 observers competing for the same scroll callbacks; one shared observer
 * with a callback registry does the same work for a fraction of the cost.
 * Created lazily on first use so it is never constructed during SSR.
 */
type RevealCallback = () => void;

let sharedObserver: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, RevealCallback>();

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;

  sharedObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        callbacks.get(entry.target)?.();
        callbacks.delete(entry.target);
        sharedObserver?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
  );

  return sharedObserver;
}

/**
 * Fade-and-rise on first scroll into view.
 *
 * CSS-only animation - no animation library. `prefers-reduced-motion` is
 * honoured in globals.css, which pins `.reveal` to full opacity, so content is
 * never hidden from users who opt out of motion.
 */
export function Reveal({ children, delay = 0, as: Component = "div", className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = getObserver();

    // Fail open: without observer support, reveal immediately. Written to the
    // DOM rather than to state so the initial markup stays identical on server
    // and client, which keeps hydration clean.
    if (!observer) {
      element.dataset.visible = "true";
      return;
    }

    callbacks.set(element, () => setVisible(true));
    observer.observe(element);

    return () => {
      callbacks.delete(element);
      observer.unobserve(element);
    };
  }, []);

  return (
    <Component
      ref={ref}
      className={cn("reveal", className)}
      data-visible={visible ? "true" : "false"}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Component>
  );
}
