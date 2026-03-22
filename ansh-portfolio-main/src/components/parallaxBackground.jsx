import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useMediaQuery } from "react-responsive";

const ParallaxBackground = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 50 });
  
  // Simplified transforms for mobile
  const mountainY = useTransform(x, [0, 0.5], ["0%", isMobile ? "30%" : "70%"]);
  const planetsX = useTransform(x, [0, 0.5], ["0%", isMobile ? "-10%" : "-20%"]);

  return (
    <section className="absolute inset-0 bg-black/40">
      <div className="relative h-screen overflow-y-hidden">
        {/* Background Sky */}
        <div
          className="absolute inset-0 w-full h-screen -z-50"
          style={{
            backgroundImage: "url(/assets/sky.jpg)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        />
        {/* Mountains - Combined layers for mobile */}
        <motion.div
          className="absolute inset-0 -z-40"
          style={{
            backgroundImage: isMobile 
              ? "url(/assets/mountain-3.png)"
              : "url(/assets/mountain-3.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountainY,
          }}
        />
        {/* Planets */}
        <motion.div
          className="absolute inset-0 -z-30"
          style={{
            backgroundImage: "url(/assets/planets.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            x: planetsX,
          }}
        />
        {/* Additional mountain layers only for desktop */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute inset-0 -z-20"
              style={{
                backgroundImage: "url(/assets/mountain-2.png)",
                backgroundPosition: "bottom",
                backgroundSize: "cover",
                y: useTransform(x, [0, 0.5], ["0%", "30%"]),
              }}
            />
            <motion.div
              className="absolute inset-0 -z-10"
              style={{
                backgroundImage: "url(/assets/mountain-1.png)",
                backgroundPosition: "bottom",
                backgroundSize: "cover",
                y: useTransform(x, [0, 0.5], ["0%", "0%"]),
              }}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default ParallaxBackground;
