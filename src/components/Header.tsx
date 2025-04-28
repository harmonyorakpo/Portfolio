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
              href="mailto:harmonyorakpo@gmail.com"
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
              href="mailto:harmonyorakpo@gmail.com"
              className="mt-4 bg-primary text-white px-6 py-3 rounded-md text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Hire Me
            </motion.a>
          </nav>

          
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
