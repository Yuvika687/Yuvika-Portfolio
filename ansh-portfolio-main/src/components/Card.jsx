import { useEffect, useState } from "react";
import { motion } from "motion/react";

const Card = ({ style, text, image, containerRef, alt }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setPosition({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [containerRef]);

  return image && !text ? (
    <motion.img
      className={`absolute w-15 cursor-grab ${
        isHovered ? "scale-110 z-10" : "scale-100"
      }`}
      src={image}
      style={{
        ...style,
        transform: `translate(${position.x * 0.05}px, ${position.y * 0.05}px)`,
      }}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
      alt={alt || "Technology logo"}
      loading="lazy"
    />
  ) : (
    <motion.div
      className={`absolute px-1 py-4 text-xl text-center rounded-full ring ring-gray-700 font-extralight bg-storm w-[12rem] cursor-grab ${
        isHovered ? "scale-110 z-10" : "scale-100"
      }`}
      style={{
        ...style,
        transform: `translate(${position.x * 0.05}px, ${position.y * 0.05}px)`,
      }}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
    >
      {text}
    </motion.div>
  );
};

export default Card;
