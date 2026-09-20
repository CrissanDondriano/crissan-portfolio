import React, { useEffect, useRef, useState } from "react";
import Logo from "../assets/images/logo.png";

const CONFIG = {
  name: "Crissan Dondriano",
  logoSrc: Logo,
};

const NAV_ITEMS = [
  { hash: "#home", label: "Home", icon: "uil-estate" },
  { hash: "#about", label: "About", icon: "uil-user" },
  { hash: "#experience", label: "Experience", icon: "uil-briefcase-alt" },
  { hash: "#portfolio", label: "Projects", icon: "uil-scenery" },
  { hash: "#contact", label: "Contact", icon: "uil-message" },
];

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [activeNav, setActiveNav] = useState(NAV_ITEMS[0].hash);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const navListRef = useRef(null);
  const navRefs = useRef(new Map());
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const progressRef = useRef(null);

  const closeMenu = () => setToggle(false);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      setScrolled(scrollTop >= 80);

      if (progressRef.current) {
        const progress = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0;
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      const sections = NAV_ITEMS.map((item) => ({
        hash: item.hash,
        el: document.querySelector(item.hash),
      })).filter((s) => s.el);

      if (sections.length === 0) return;

      const trigger = window.innerHeight * 0.35;
      let current = sections[0].hash;
      let bestTop = -Infinity;

      sections.forEach(({ hash, el }) => {
        const top = el.getBoundingClientRect().top;
        if (top <= trigger && top > bestTop) {
          bestTop = top;
          current = hash;
        }
      });

      if (docHeight > 0 && scrollTop >= docHeight - 2) {
        let lowest = sections[0];
        sections.forEach((s) => {
          if (s.el.getBoundingClientRect().top > lowest.el.getBoundingClientRect().top) {
            lowest = s;
          }
        });
        current = lowest.hash;
      }

      setActiveNav(current);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const update = () => {
      const activeEl = navRefs.current.get(activeNav);
      const listEl = navListRef.current;

      if (!activeEl || !listEl) {
        setIndicator((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }));
        return;
      }

      const listRect = listEl.getBoundingClientRect();
      const elRect = activeEl.getBoundingClientRect();
      setIndicator({
        left: elRect.left - listRect.left,
        width: elRect.width,
        opacity: 1,
      });
    };

    update();

    const resizeObserver = new ResizeObserver(update);
    if (navListRef.current) resizeObserver.observe(navListRef.current);
    document.fonts?.ready?.then(update);

    return () => resizeObserver.disconnect();
  }, [activeNav]);

  useEffect(() => {
    if (!toggle) return undefined;

    const menu = menuRef.current;
    const getFocusable = () =>
      menu ? Array.from(menu.querySelectorAll("a[href], button:not([disabled])")) : [];

    getFocusable()[0]?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setToggle(false);
        toggleRef.current?.focus();
        return;
      }

      if (e.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [toggle]);

  useEffect(() => {
    if (!toggle) return undefined;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [toggle]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    const onChange = (e) => {
      if (e.matches) setToggle(false);
    };

    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className={`header${scrolled ? " scroll-header" : ""}`} id="header">
      <nav className="nav" aria-label="Main navigation">
        
        <a  href="#home"
          className="nav__logo"
          aria-label={`${CONFIG.name} - Home`}
          onClick={closeMenu}
        >
          {logoFailed ? (
            <>
              <span className="nav__logo-bracket" aria-hidden="true">
                &lt;
              </span>
              <span className="nav__logo-text">{CONFIG.name}</span>
              <span className="nav__logo-bracket" aria-hidden="true">
                /&gt;
              </span>
            </>
          ) : (
            <img
              src={CONFIG.logoSrc}
              alt=""
              className="nav__logo-img"
              decoding="async"
              onError={() => setLogoFailed(true)}
            />
          )}
        </a>

        <div className="nav__right">
          <div
            id="nav-menu"
            ref={menuRef}
            className={`nav__menu${toggle ? " show-menu" : ""}`}
          >
            <button
              className="nav__close"
              onClick={() => {
                setToggle(false);
                toggleRef.current?.focus();
              }}
              aria-label="Close navigation menu"
              type="button"
            >
              <span className="nav__close-line"></span>
              <span className="nav__close-line"></span>
            </button>

            <div className="nav__links" ref={navListRef}>
              <ul className="nav__list">
                {NAV_ITEMS.map((item) => (
                  <li className="nav__item" key={item.hash}>
                    
                    <a  href={item.hash}
                      ref={(el) => navRefs.current.set(item.hash, el)}
                      onClick={closeMenu}
                      className={
                        activeNav === item.hash ? "nav__link active-link" : "nav__link"
                      }
                      aria-current={activeNav === item.hash ? "location" : undefined}
                    >
                      <i className={`uil ${item.icon} nav__icon`} aria-hidden="true"></i>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <span
                className="nav__indicator"
                style={{
                  transform: `translateX(${indicator.left}px)`,
                  width: `${indicator.width}px`,
                  opacity: indicator.opacity,
                }}
                aria-hidden="true"
              ></span>
            </div>
          </div>

          <button
            ref={toggleRef}
            className={toggle ? "nav__toggle active" : "nav__toggle"}
            onClick={() => setToggle(!toggle)}
            aria-label={toggle ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={toggle}
            aria-controls="nav-menu"
            type="button"
          >
            <span className="nav__toggle-box" aria-hidden="true">
              <span className="nav__toggle-line"></span>
              <span className="nav__toggle-line"></span>
              <span className="nav__toggle-line"></span>
            </span>
          </button>
        </div>
      </nav>

      <div
        className={`nav__backdrop${toggle ? " nav__backdrop--open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      ></div>

      <div className="header__progress" ref={progressRef} aria-hidden="true"></div>
    </header>
  );
};

export default Header;