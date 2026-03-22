"use client";
import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { useMediaQuery } from "react-responsive";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  useEffect(() => {
    if (isMobile) return;

    let lenis: Lenis | null = null;
    let rafId: number;

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    } catch (error) {
      console.error("Failed to initialize smooth scroll:", error);
    }

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (lenis) {
        lenis.destroy();
      }
    };
  }, [isMobile]);

  return <div className={isMobile ? "overflow-x-hidden" : ""}>{children}</div>;
}; 