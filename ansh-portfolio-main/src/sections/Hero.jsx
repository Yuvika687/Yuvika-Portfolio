import { motion } from "motion/react";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { FlipWords } from "../components/FlipWords";

const Hero = () => {
  // More granular breakpoints for better responsiveness
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isSmallTablet = useMediaQuery({ minWidth: 641, maxWidth: 900 });
  const isTablet = useMediaQuery({ minWidth: 901, maxWidth: 1200 });
  const isDesktop = useMediaQuery({ minWidth: 1201 });
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const handleHireMe = () => {
    window.location.href = "mailto:anshsinghal3107@gmail.com";
  };

  const skills = [
    { name: "Machine Learning", highlight: false },
    { name: "Deep Learning", highlight: true },
    { name: "MLOps", highlight: false },
    { name: "Data Science", highlight: false },
    { name: "Open Source", highlight: false },
  ];

  // Determine layout type
  const showMobileLayout = isMobile;
  const showDesktopLayout = !isMobile;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Main Container */}
      <div className="relative w-full h-full">

        {/* LARGE NAME - Fluid responsive sizing */}
        <motion.div
          className="absolute left-0 right-0 flex justify-center select-none overflow-hidden cursor-default px-4"
          style={{
            // Minimum 10% from top to stay below navbar on all landscape screens
            top: "max(10%, 5rem)",
            zIndex: 1,
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1
            className="font-black text-center leading-none tracking-tighter cursor-default animate-glow"
            style={{
              // Fluid font size using clamp
              fontSize: showMobileLayout ? "18vw" : "clamp(8vw, 12vw, 11vw)",
              fontFamily: "'Funnel Display', sans-serif",
              whiteSpace: showMobileLayout ? "normal" : "nowrap",
              letterSpacing: "-0.02em",
              willChange: "opacity",
            }}
          >
            {showMobileLayout ? (
              <>ANSH<br />SINGHAL</>
            ) : (
              "ANSH SINGHAL"
            )}
          </h1>
        </motion.div>

        {/* PHOTO - Responsive positioning */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 flex justify-center"
          style={{
            zIndex: 10,
            // Mobile: position from top, Desktop: position from bottom
            ...(showMobileLayout
              ? { top: "23%" }
              : { bottom: 0, alignItems: "flex-end" }
            ),
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 80 }}
        >
          <img
            src="/Ansh-Singhal-Hero.webp"
            alt="Ansh Singhal"
            loading="eager"
            decoding="async"
            style={{
              // Fluid height using clamp for desktop, auto for mobile
              height: showMobileLayout ? "auto" : "clamp(60vh, 75vh, 80vh)",
              width: showMobileLayout ? "100vw" : "auto",
              maxWidth: showMobileLayout ? "540px" : "none",
              objectFit: "contain",
              filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.5))",
            }}
          />
        </motion.div>

        {/* LEFT CONTENT - HeroText with FlipWords - Desktop/Tablet only */}
        {showDesktopLayout && (
          <motion.div
            className="absolute"
            style={{
              left: "clamp(1rem, 3vw, 4rem)",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              maxWidth: "clamp(200px, 25vw, 420px)",
            }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="backdrop-blur-xl bg-black/40 p-4 lg:p-6 xl:p-8 rounded-xl lg:rounded-2xl border border-white/10 shadow-2xl hover:bg-black/50 transition-all duration-300">
              <motion.h2
                className="font-medium text-white mb-1 lg:mb-2"
                style={{ fontSize: "clamp(0.875rem, 1.5vw, 1.5rem)" }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                Hi I'm Ansh Singhal,
              </motion.h2>
              <motion.p
                className="font-medium text-neutral-300 mb-0.5 lg:mb-1"
                style={{ fontSize: "clamp(0.75rem, 1.3vw, 1.25rem)" }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                AI/ML Engineer
              </motion.p>
              <motion.p
                className="text-neutral-400 mb-1 lg:mb-2"
                style={{ fontSize: "clamp(0.625rem, 1vw, 1rem)" }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
              >
                Dedicated to Crafting
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
              >
                <FlipWords
                  words={["Intelligent", "Scalable", "Data-Driven", "Robust"]}
                  className="font-black text-white"
                  style={{ fontSize: "clamp(1.25rem, 2.5vw, 2.5rem)" }}
                />
              </motion.div>
              <motion.p
                className="text-neutral-300 mt-0.5 lg:mt-1"
                style={{ fontSize: "clamp(0.625rem, 1vw, 1rem)" }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
              >
                ML Solutions
              </motion.p>

              {/* Buttons Container */}
              <motion.div
                className="mt-3 lg:mt-6 flex flex-wrap gap-2 lg:gap-3"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7 }}
              >
                <button
                  onClick={handleHireMe}
                  className="group/btn flex items-center gap-1.5 lg:gap-2 text-white font-bold tracking-wide hover:text-[#7a57db] transition-all duration-300 bg-white/5 hover:bg-white/10 px-3 lg:px-4 py-2 lg:py-3 rounded-lg lg:rounded-xl border border-white/10"
                  style={{ fontSize: "clamp(0.625rem, 1vw, 1rem)" }}
                >
                  <span className="text-[#7a57db] font-bold">//</span>
                  HIRE ME
                  <svg
                    className="transform group-hover/btn:translate-x-1 transition-transform duration-300"
                    style={{ width: "clamp(12px, 1.2vw, 20px)", height: "clamp(12px, 1.2vw, 20px)" }}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <a
                  href="/Ansh%20Singhal.pdf"
                  download="Ansh Singhal.pdf"
                  className="group/dl flex items-center gap-1.5 lg:gap-2 text-white font-bold tracking-wide hover:text-[#7a57db] transition-all duration-300 bg-gradient-to-r from-[#5c33cc]/20 to-[#7a57db]/20 hover:from-[#5c33cc]/30 hover:to-[#7a57db]/30 px-3 lg:px-4 py-2 lg:py-3 rounded-lg lg:rounded-xl border border-[#7a57db]/30"
                  style={{ fontSize: "clamp(0.625rem, 1vw, 1rem)" }}
                >
                  <svg
                    className="transform group-hover/dl:translate-y-1 transition-transform duration-300"
                    style={{ width: "clamp(12px, 1.2vw, 18px)", height: "clamp(12px, 1.2vw, 18px)" }}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M12 4V16M12 16L7 11M12 16L17 11M4 20H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  RESUME
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* RIGHT CONTENT - Skills - Desktop/Tablet only */}
        {showDesktopLayout && (
          <motion.div
            className="absolute text-right"
            style={{
              right: "clamp(1rem, 3vw, 4rem)",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
            }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="backdrop-blur-xl bg-black/40 p-4 lg:p-6 xl:p-8 rounded-xl lg:rounded-2xl border border-white/10 shadow-2xl hover:bg-black/50 transition-all duration-300">
              <ul className="space-y-2 lg:space-y-3 xl:space-y-4">
                {skills.map((skill, index) => (
                  <li
                    key={skill.name}
                    className={`
                      font-medium cursor-pointer
                      transition-all duration-300 py-0.5 lg:py-1 px-2 lg:px-3 rounded-lg -mr-2 lg:-mr-3
                      ${skill.highlight
                        ? "text-white font-bold bg-gradient-to-l from-[#7a57db]/20 to-transparent"
                        : hoveredSkill === index
                          ? "text-white bg-white/5"
                          : "text-neutral-400 hover:text-white"
                      }
                    `}
                    style={{
                      fontSize: skill.highlight
                        ? "clamp(0.875rem, 1.5vw, 1.5rem)"
                        : "clamp(0.75rem, 1.2vw, 1.25rem)"
                    }}
                    onMouseEnter={() => setHoveredSkill(index)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* MOBILE - Bottom content with HeroText and buttons - above navbar */}
        {showMobileLayout && (
          <motion.div
            className="absolute left-0 right-0 text-center px-4"
            style={{
              // Minimum 5.5rem from bottom to stay above navbar
              bottom: "max(6rem, 13vh)",
              zIndex: 20,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="backdrop-blur-xl bg-black/50 p-3 rounded-xl border border-white/10">
              {/* HeroText Content */}
              <motion.p
                className="text-sm font-medium text-neutral-300 mb-0.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                AI/ML Engineer
              </motion.p>
              <motion.p
                className="text-xs text-neutral-400 mb-0.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                Dedicated to Crafting
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mb-0.5"
              >
                <FlipWords
                  words={["Intelligent", "Scalable", "Data-Driven", "Robust"]}
                  className="font-black text-white text-base"
                />
              </motion.div>
              <motion.p
                className="text-xs text-neutral-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                ML Solutions
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="mt-2 flex justify-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
              >
                <button
                  onClick={handleHireMe}
                  className="group flex items-center gap-1.5 text-white font-bold text-xs bg-white/10 px-3 py-2 rounded-lg border border-white/10"
                >
                  <span className="text-[#7a57db] font-bold">//</span>
                  HIRE ME
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transform group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <a
                  href="/Ansh%20Singhal.pdf"
                  download="Ansh Singhal.pdf"
                  className="group flex items-center gap-1.5 text-white font-bold text-xs bg-gradient-to-r from-[#5c33cc]/30 to-[#7a57db]/30 px-3 py-2 rounded-lg border border-[#7a57db]/30"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transform group-hover:translate-y-1 transition-transform duration-300"
                  >
                    <path d="M12 4V16M12 16L7 11M12 16L17 11M4 20H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  RESUME
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default Hero;
