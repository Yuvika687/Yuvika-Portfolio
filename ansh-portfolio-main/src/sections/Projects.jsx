import React from "react";
import { FaGithub } from "react-icons/fa";
import { projects } from "../data/projects";
import { PinContainer } from "../components/ui/Pin";

const Projects = () => {
  return (
    <section id="projects" className="c-space section-spacing">
      <h2 className="text-heading">
        <span className="text-purple">Recent Projects</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {projects.map((item) => (
          <div
            className="flex items-stretch"
            key={item.id}
          >
            <PinContainer
              title={item.title}
              href={item.link}
              className="h-full w-full"
            >
              <div className="flex flex-col justify-between h-full p-4 bg-[#0F111A] rounded-2xl">
                <div className="relative flex items-center justify-center w-full overflow-hidden h-[20vh] lg:h-[30vh]">
                  <div
                    className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                    style={{ backgroundColor: "#13162D" }}
                  >
                    <img src="/assets/grid.png" alt="bgimg" className="w-full h-full object-cover opacity-20" />
                  </div>
                  <img
                    src={item.img}
                    alt="cover"
                    className="z-10 absolute bottom-0 w-full h-full object-cover"
                  />
                </div>

                <h1 className="font-bold lg:text-2xl md:text-xl text-base mt-4">
                  {item.title}
                </h1>

                <p
                  className="text-sm text-[#BEC1DD] mt-4 flex-grow"
                >
                  {item.des}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    {item.iconLists.map((icon, index) => (
                      <div
                        key={index}
                        className="border border-white/[.2] rounded-full bg-black w-8 h-8 flex justify-center items-center"
                      >
                        <img src={icon} alt={`icon${index}`} className="p-2" />
                      </div>
                    ))}
                  </div>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-purple hover:text-purple/80 transition-colors"
                  >
                    <FaGithub className="w-6 h-6" />
                    <span className="lg:text-xl md:text-xs text-sm">View on GitHub</span>
                  </a>
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
