"use client";
import React, { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Lenis from "@studio-freight/lenis";
import { useMediaQuery } from "react-responsive";

export const CustomScrollbar = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: isMobile ? 50 : 100,
    damping: isMobile ? 20 : 30,
    restDelta: 0.001
  });

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (isMobile) return;

    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed right-0 top-0 h-full w-1 bg-gray-200/20 backdrop-blur-sm z-50"
      style={{
        scaleY,
        transformOrigin: "top"
      }}
    >
      <motion.div
        className="h-full w-full bg-gradient-to-b from-[#18CCFC] via-[#6344F5] to-[#AE48FF]"
        style={{
          scaleY: scrollYProgress
        }}
      />
    </motion.div>
  );
}; 