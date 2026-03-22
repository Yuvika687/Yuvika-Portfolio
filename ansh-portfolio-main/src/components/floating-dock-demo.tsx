import React, { useState } from "react";
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import { FloatingDock } from "./ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
  IconFileText,
  IconSearch,
} from "@tabler/icons-react";
import ResumeModal from "./ResumeModal";

export default function FloatingDockDemo() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      to: "/#hero",
      type: "hash"
    },
    {
      title: "About",
      icon: <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      to: "/#about",
      type: "hash"
    },
    {
      title: "Projects",
      icon: <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      to: "/#projects",
      type: "hash"
    },
    {
      title: "Experience",
      icon: <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      to: "/#experiences",
      type: "hash"
    },
    {
      title: "Dhara",
      icon: <IconSearch className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      to: "/dhara",
      type: "link"
    },
    {
      title: "Resume",
      icon: <IconFileText className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      onClick: () => setIsResumeOpen(true),
      type: "button"
    },
    {
      title: "LinkedIn",
      icon: <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      to: "https://www.linkedin.com/in/anshhh-singhal/",
      type: "external"
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      to: "https://github.com/AnshSinghal",
      type: "external"
    },
  ];
  
  return (
    <>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <FloatingDock items={links} />
      </div>
      <div className="md:hidden">
        <FloatingDock items={links} />
      </div>
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
}
