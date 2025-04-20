const Header = () => {
    const links = [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Projects', href: '#projects' },
      { name: 'Skills', href: '#skills' },
      { name: 'Contact', href: '#contact' },
    ];
  
    return (
      <div className="flex justify-between items-center w-full pt-6">
        <div className="text-xl font-semibold">HO</div>
        <ul className="flex space-x-6 pt-1">
          {links.map((link) => (
            <li key={link.name} className="relative group">
              <a href={link.href} className="hover:text-primary">
                {link.name}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-bottom-right group-hover:origin-bottom-left"></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Header;
  