import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const links = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);

      // Update active section based on scroll position
      const sections = ["about", "projects", "skills", "contact"];
      let active = null;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop - 100) {
          active = section;
        }
      }

      setActiveSection(active);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    e.preventDefault();

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }

    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-black/90 backdrop-blur-md shadow-lg"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center"
        >
          <a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, "#home")}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center font-semibold text-sm text-white">
              HO
            </div>
          </a>
        </motion.div>

        {/* Desktop Navigation Links */}
        <motion.ul
          variants={navVariants}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex space-x-8 items-center"
        >
          {links.map((link) => (
            <motion.li
              key={link.name}
              variants={itemVariants}
              className="relative"
            >
              <a
                href={link.href}
                className={`relative px-1 py-2 transition-colors ${
                  activeSection === link.href.substring(1)
                    ? "text-primary"
                    : "hover:text-primary"
                }`}
                onClick={(e) => handleSmoothScroll(e, link.href)}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                  />
                )}
              </a>
            </motion.li>
          ))}
          <motion.li variants={itemVariants}>
            <a
              href="mailto:harmony@example.com"
              className="ml-4 bg-primary text-white px-5 py-2 rounded-md hover:scale-105 transition-all shadow-md shadow-primary/20"
            >
              Hire Me
            </a>
          </motion.li>
        </motion.ul>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden flex items-center">
          <button
            aria-label="Toggle menu"
            className="w-10 h-10 flex flex-col justify-center items-center focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={false}
          animate={{
            x: isMenuOpen ? "0%" : "100%",
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ type: "tween", duration: 0.3 }}
          className={`lg:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-lg z-50 flex flex-col justify-center items-center`}
        >
          <div className="absolute top-6 right-6">
            <button
              aria-label="Close menu"
              className="w-10 h-10 flex justify-center items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col items-center gap-6">
            {links.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-2xl font-medium text-white hover:text-primary transition-colors"
                onClick={(e) => handleSmoothScroll(e, link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="mailto:harmony@example.com"
              className="mt-4 bg-primary text-white px-6 py-3 rounded-md text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Hire Me
            </motion.a>
          </nav>

          <div className="absolute bottom-10 flex gap-6 text-white">
            <a
              href="https://github.com"
              className="text-2xl hover:text-primary transition-colors"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              className="text-2xl hover:text-primary transition-colors"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"></path>
              </svg>
            </a>
            <a
              href="https://twitter.com"
              className="text-2xl hover:text-primary transition-colors"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M459.4 151.7c.32 4.7.32 9.5.32 14.3 0 146.8-111.7 316-316 316-62.6 0-120.4-18.4-169.2-49.5 8.7 1 17.5 1.3 26.4 1.3 51.7 0 99.4-17.6 137.5-47.4-48.2-.9-88.9-32.7-102.2-76.6 6.6 1.2 13.4 1.9 20.3 1.9 9.8 0 19.4-1.3 28.4-3.7-50.5-10.1-88.8-54.6-88.8-107.9 0-.5 0-.9 0-1.4 14.9 8.3 31.9 13.4 50.3 14-30.7-20.6-50.9-55.5-50.9-95.4 0-21.1 5.7-40.9 15.6-58.1 56.9 69.9 142.1 116.7 238.3 121.5-1.9-8.4-3.6-17-3.6-25.8 0-62.8 50.9-113.7 113.7-113.7 32.8 0 62.4 13.6 83.2 35.5 26-5.1 50.4-14.8 72.1-28-8.5 26.3-26.4 48.2-49.8 62.2 22.9-2.7 45.3-8.8 66.1-17.6-14.3 21.4-32.4 40.3-53.2 55.1z"></path>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
