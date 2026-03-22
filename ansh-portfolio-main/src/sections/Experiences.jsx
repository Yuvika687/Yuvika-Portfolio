// sections/Experiences.jsx
import React from "react";
import { Timeline } from "../components/Timeline";
import { experiences } from "../constants";

export default function Experiences() {
  return (
    <section id="experiences" className="py-20">
      <div className="w-full">
        <Timeline data={experiences} />
      </div>
    </section>
  );
}
