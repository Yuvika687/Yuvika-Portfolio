import { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";

const About = () => {
  const grid2Container = useRef();
  return (
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 */}
        <div className="flex items-end grid-black-color grid-1">
          <img
            src="assets/hero-anim.gif"
            className="absolute w-full h-full object-contain object-center opacity-50"
          />
          <div className="z-10">
            <p className="headtext">Hi, I'm Ansh Singhal</p>
            <p className="subtext">
              AI/ML Engineer passionate about building intelligent systems, scalable backend tools, and contributing to open-source.
            </p>
          </div>
        </div>

        {/* Grid 2 */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            <p className="flex items-end text-5xl text-gray-500">AI MLOps OSS</p>
            
            <Card
              style={{top: "30%", left: "20%" }}
              image="assets/logos/docker.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{top: "60%", left: "45%" }}
              image="assets/logos/python.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{bottom: "30%", left: "70%" }}
              image="assets/logos/tensorflow.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{top: "55%", left: "0%" }}
              image="assets/logos/FastAPI.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{top: "10%", left: "38%" }}
              image="assets/logos/pytorch.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{top: "70%", left: "70%" }}
              image="assets/logos/Pandas.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{top: "70%", left: "25%" }}
              image="assets/logos/scikit-learn.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{top: "5%", left: "10%" }}
              image="assets/logos/Flask.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{top: "60%", left: "40%" }}
              image="assets/logos/AWS.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{top: "75%", left: "65%" }}
              image="assets/logos/git.svg"
              containerRef={grid2Container}
            />
          </div>
        </div>

        {/* Grid 3 */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-[50%]">
            <p className="headtext">Time Zone</p>
            <p className="subtext">
              I'm based in Mars, and open to remote work worldwide
            </p>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            <Globe />
          </figure>
        </div>

        {/* Grid 4 */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Do you want to start a project together?
            </p>
            <CopyEmailButton />
          </div>
        </div>

        {/* Grid 5 */}
        <div className="grid-default-color grid-5">
          <div className="z-10 w-[50%]">
            <p className="headText">Tech Stack</p>
            <p className="subtext">
              I specialize in a wide range of tools and technologies for AI, MLOps, and backend development.
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
