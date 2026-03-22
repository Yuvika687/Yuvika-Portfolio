import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomCursor from "./components/CustomCursor";
import FloatingDockDemo from "./components/floating-dock-demo";
import { Particles } from "./components/Particles";
import { CustomScrollbar } from "./components/ui/custom-scrollbar";
import { SmoothScroll } from "./components/ui/smooth-scroll";
import { useMediaQuery } from "react-responsive";
import { SpeedInsights } from '@vercel/speed-insights/react';

const HomePage = React.lazy(() => import("./pages/HomePage"));
const DharaPage = React.lazy(() => import("./pages/DharaPage"));

const App = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  return (
    <Router>
      <SmoothScroll>
        <div className="relative min-h-screen overflow-x-hidden">
          <style jsx global>{`
            html {
              scrollbar-width: none;
              -ms-overflow-style: none;
              ${isMobile ? 'overflow-x: hidden;' : ''}
            }
            html::-webkit-scrollbar {
              display: none;
            }
            body {
              ${isMobile ? 'overflow-x: hidden; position: relative;' : ''}
            }
          `}</style>

          {!isMobile && <CustomCursor />}
          <CustomScrollbar />

          <div className="fixed inset-0 -z-10">
            <Particles
              className="absolute inset-0"
              quantity={isMobile ? 100 : 200}
              staticity={isMobile ? 10 : 15}
              color="#ffffff"
              size={0.8}
              ease={30}
              vx={0.2}
              vy={0.2}
            />
          </div>

          <div className="fixed top-0 left-0 w-full z-50">
            <FloatingDockDemo />
          </div>

          <React.Suspense fallback={
            <div className="flex items-center justify-center h-screen w-full bg-black text-white">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dhara" element={<DharaPage />} />
            </Routes>
          </React.Suspense>

          <SpeedInsights />
        </div>
      </SmoothScroll>
    </Router>
  );
};

export default App;
