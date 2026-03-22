import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import "./custom-cursor.css";

const CustomCursor = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  useEffect(() => {
    if (isMobile) return;

    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll(".circle");

    const colors = [
      "#18CCFC", "#2BC5F9", "#3EBEF6", "#51B7F3", "#64B0F0",
      "#77A9ED", "#8AA2EA", "#9D9BE7", "#B094E4", "#C38DE1",
      "#D686DE", "#E97FDB", "#FC78D8", "#EF71D5", "#E26AD2",
      "#D563CF", "#C85CCC", "#BB55C9", "#AE48FF", "#A141FF"
    ];

    circles.forEach((circle, index) => {
      circle.x = 0;
      circle.y = 0;
      circle.style.backgroundColor = colors[index % colors.length];
    });

    window.addEventListener("mousemove", (e) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
    });

    function animateCircles() {
      let x = coords.x;
      let y = coords.y;

      circles.forEach((circle, index) => {
        circle.style.left = `${x - 12}px`;
        circle.style.top = `${y - 12}px`;
        circle.style.transform = `scale(${(circles.length - index) / circles.length})`;

        circle.x = x;
        circle.y = y;

        const next = circles[index + 1] || circles[0];
        x += (next.x - x) * 0.3;
        y += (next.y - y) * 0.3;
      });

      requestAnimationFrame(animateCircles);
    }

    animateCircles();

    return () => {
      window.removeEventListener("mousemove", () => {});
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {[...Array(20)].map((_, i) => (
        <div key={i} className="circle" />
      ))}
    </>
  );
};

export default CustomCursor;