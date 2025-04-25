import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    // { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  // Smooth scroll function
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string): void => {
    e.preventDefault();
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
    
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="flex justify-between items-center w-full pt-6 px-4">
      {/* Logo */}
      <div className="text-xl font-semibold">HO</div>

      {/* Desktop Navigation Links */}
      <ul className="hidden lg:flex space-x-6">
        {links.map((link) => (
          <li key={link.name} className="relative group">
            <a 
              href={link.href} 
              className="hover:text-primary"
              onClick={(e) => handleSmoothScroll(e, link.href)}
            >
              {link.name}
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-bottom-right group-hover:origin-bottom-left"></span>
            </a>
          </li>
        ))}
      </ul>

      {/* Hamburger Menu for Mobile */}
      <div className="lg:hidden flex items-center">
        <button 
          className="text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation Links */}
      <div 
        className={`lg:hidden fixed inset-0 bg-gray-800 z-50 transition-transform ${isMenuOpen ? "transform translate-x-0" : "transform translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button 
            className="text-2xl text-white" 
            onClick={() => setIsMenuOpen(false)}
          >
            ×
          </button>
        </div>
        <ul className="flex flex-col items-center space-y-6 mt-24 text-white">
          {links.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                className="text-2xl" 
                onClick={(e) => handleSmoothScroll(e, link.href)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;