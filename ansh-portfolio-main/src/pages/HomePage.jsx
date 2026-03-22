import React, { Suspense } from "react";
import Hero from "../sections/Hero";

// Lazy load other sections
const About = React.lazy(() => import("../sections/About"));
const Projects = React.lazy(() => import("../sections/Projects"));
const Experiences = React.lazy(() => import("../sections/Experiences"));
const Contact = React.lazy(() => import("../sections/Contact"));
const Footer = React.lazy(() => import('../sections/Footer'));

const HomePage = () => {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>

      <div className="container mx-auto max-w-7xl relative z-10">
        <Suspense fallback={<div className="h-20" />}>
          <section id="about">
            <About />
          </section>

          <section id="projects">
            <Projects />
          </section>

          <section id="experiences">
            <Experiences />
          </section>

          <section id="contact">
            <Contact />
          </section>

          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default HomePage;
