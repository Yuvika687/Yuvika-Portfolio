import {
  FaGithub,
  FaKaggle,
  FaLinkedin,
  FaLinkedinIn,
} from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

const Footer = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn className="w-6 h-6" />,
      url: "https://www.linkedin.com/in/anshhh-singhal/"
    },
    {
      name: "GitHub",
      icon: <FaGithub className="w-6 h-6" />,
      url: "https://github.com/AnshSinghal"
    },
    {
      name: "Kaggle",
      icon: <FaKaggle className="w-6 h-6" />,
      url: "https://www.kaggle.com/anshsinghal3107"
    }
  ];

  return (
    <footer className="c-space py-8">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-8">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label={social.name}
            >
              {social.icon}
          </a>
        ))}
        </div>
        <p className="text-sm text-neutral-400">
          © 2024 Ansh Singhal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
