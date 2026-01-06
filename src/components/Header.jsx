import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const [activeNav, setActiveNav] = useState("#home");

  /*=============== Change Background Header ===============*/
  useEffect(() => {
    const scrollHeader = () => {
      const header = document.querySelector("#header");
      if (window.scrollY >= 80) {
        header.classList.add("scroll-header");
      } else {
        header.classList.remove("scroll-header");
      }
    };

    window.addEventListener("scroll", scrollHeader);
    return () => window.removeEventListener("scroll", scrollHeader);
  }, []);

  // Update active nav based on route
  useEffect(() => {
    if (location.pathname.startsWith("/about")) {
      setActiveNav("#about");
    } else if (location.pathname === "/portfolio") {
      setActiveNav("#portfolio");
    } else if (location.pathname === "/contact") {
      setActiveNav("#contact");
    } else {
      setActiveNav("#home");
    }
  }, [location]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && toggle) {
        setToggle(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [toggle]);
  
   // Prevent scroll when menu is open on mobile
  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [toggle]);

  const handleNavClick = (nav) => {
    setActiveNav(nav);
    setToggle(false);
  };

  const navItems = [
    { path: "/", label: "Home", icon: "uil-estate", hash: "#home" },
    { path: "/portfolio", label: "Portfolio", icon: "uil-scenery", hash: "#portfolio" },
    { path: "/about", label: "About", icon: "uil-user", hash: "#about" },
    { path: "/contact", label: "Contact", icon: "uil-message", hash: "#contact" },
  ];

  return (
    <header className="header" id="header" role="banner">
      <nav className="nav container" role="navigation" aria-label="Main navigation">
        <Link 
          to="/" 
          className="nav__logo"
          aria-label="Crissan Dondriano - Home"
        >
          Crissan Dondriano
        </Link>

        <div 
          className={toggle ? "nav__menu show-menu" : "nav__menu"}
          role="menu"
        >
          <ul className="nav__list" role="menubar">
            {navItems.map((item) => (
              <li className="nav__item" key={item.hash} role="none">
                <Link
                  to={item.path}
                  onClick={() => handleNavClick(item.hash)}
                  className={
                    activeNav === item.hash 
                      ? "nav__link active-link" 
                      : "nav__link"
                  }
                  aria-current={activeNav === item.hash ? "page" : undefined}
                  role="menuitem"
                >
                  <i className={`uil ${item.icon} nav__icon`} aria-hidden="true"></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <button
            className="nav__close"
            onClick={() => setToggle(false)}
            aria-label="Close navigation menu"
            type="button"
          >
            <i className="uil uil-times" aria-hidden="true"></i>
          </button>
        </div>

        <button
          className="nav__toggle"
          onClick={() => setToggle(!toggle)}
          aria-label={toggle ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={toggle}
          aria-controls="nav-menu"
          type="button"
        >
          <i className="uil uil-bars" aria-hidden="true"></i>
        </button>
      </nav>
    </header>
  );
};

export default Header;