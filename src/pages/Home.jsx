import React, { useEffect, useRef, useState } from 'react';
import Social from './Social';

const ROLES = [
  'Full-Stack Web Developer',
  'Laravel & Vue.js Engineer',
  'REST API & Database Design',
  'Workflow Automation',
];

const DESCRIPTION =
  'Full-stack web developer based in the Philippines. I build reliable web applications end to end, ' +
  'from the database and REST APIs to clean, accessible interfaces, with Laravel, Vue.js and MySQL at the core.';

const TYPE_SPEED = 75;
const DELETE_SPEED = 40;
const HOLD_TIME = 1800;
const PAUSE_TIME = 350;

/* ============ HELPERS ============ */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const useTypewriter = (words) => {
  const [reduce] = useState(prefersReducedMotion);
  const [state, setState] = useState({ index: 0, text: '', deleting: false });

  useEffect(() => {
    if (reduce) return undefined;

    const word = words[state.index];
    let delay = TYPE_SPEED;
    let next;

    if (!state.deleting && state.text === word) {
      delay = HOLD_TIME;
      next = { ...state, deleting: true };
    } else if (!state.deleting) {
      next = { ...state, text: word.slice(0, state.text.length + 1) };
    } else if (state.text === '') {
      delay = PAUSE_TIME;
      next = { index: (state.index + 1) % words.length, text: '', deleting: false };
    } else {
      delay = DELETE_SPEED;
      next = { ...state, text: word.slice(0, state.text.length - 1) };
    }

    const id = setTimeout(() => setState(next), delay);
    return () => clearTimeout(id);
  }, [state, words, reduce]);

  return reduce ? words[0] : state.text;
};

/* ============ MAIN COMPONENT ============ */
const Home = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const rafRef = useRef(0);

  const role = useTypewriter(ROLES);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const handleSectionMove = (e) => {
    if (e.pointerType !== 'mouse' || prefersReducedMotion()) return;

    const el = sectionRef.current;
    if (!el) return;

    const { clientX, clientY } = e;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
      el.style.setProperty('--px', ((x / rect.width - 0.5) * 2).toFixed(3));
      el.style.setProperty('--py', ((y / rect.height - 0.5) * 2).toFixed(3));
    });
  };

  const handleSectionLeave = () => {
    const el = sectionRef.current;
    if (!el) return;
    el.style.setProperty('--px', '0');
    el.style.setProperty('--py', '0');
  };

  const handleImgMove = (e) => {
    if (e.pointerType !== 'mouse' || prefersReducedMotion()) return;

    const stage = stageRef.current;
    if (!stage) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));

    stage.style.setProperty('--tx', (x - 0.5).toFixed(3));
    stage.style.setProperty('--ty', (y - 0.5).toFixed(3));
    stage.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
    stage.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
  };

  const handleImgLeave = () => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty('--tx', '0');
    stage.style.setProperty('--ty', '0');
    stage.style.setProperty('--gx', '50%');
    stage.style.setProperty('--gy', '50%');
  };

  // Magnetic primary button
  const handleMagnetMove = (e) => {
    if (e.pointerType !== 'mouse' || prefersReducedMotion()) return;

    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.setProperty('--bx', `${(x * 0.2).toFixed(1)}px`);
    el.style.setProperty('--by', `${(y * 0.25).toFixed(1)}px`);
  };

  const handleMagnetLeave = (e) => {
    e.currentTarget.style.setProperty('--bx', '0px');
    e.currentTarget.style.setProperty('--by', '0px');
  };

  return (
    <section
      className="home section"
      id="home"
      aria-labelledby="home-heading"
      ref={sectionRef}
      onPointerMove={handleSectionMove}
      onPointerLeave={handleSectionLeave}
    >
      {/* Interactive background layers */}
      <div className="home__bg" aria-hidden="true">
        <div className="home__bg-grid"></div>

        <span className="home__blob home__blob--1"></span>
        <span className="home__blob home__blob--2"></span>
        <span className="home__blob home__blob--3"></span>

        <span className="home__particle home__particle--1"></span>
        <span className="home__particle home__particle--2"></span>
        <span className="home__particle home__particle--3"></span>
        <span className="home__particle home__particle--4"></span>
        <span className="home__particle home__particle--5"></span>

        <div className="home__spot">
          <div className="home__bg-grid home__bg-grid--lit"></div>
        </div>
        <span className="home__cursor-glow"></span>
      </div>

      <div className="home__container container">
        <div className="home__content">
          <div className="home__data">
            <span className="home__greeting">Hi, I&apos;m</span>
            <h1 id="home-heading" className="home__title">
              Crissan Dondriano
            </h1>

            <p className="home__role">
              <span className="home__sr-only">{ROLES[0]}</span>
              <span className="home__role-text" aria-hidden="true">
                {role}
              </span>
              <span className="home__caret" aria-hidden="true"></span>
            </p>

            <p className="home__description">{DESCRIPTION}</p>

            <div className="home__buttons">
              
              <a  href="#contact"
                className="button button--flex home__cta"
                aria-label="Contact Crissan Dondriano"
                onPointerMove={handleMagnetMove}
                onPointerLeave={handleMagnetLeave}
              >
                Contact me
                <i className="uil uil-arrow-right home__cta-icon" aria-hidden="true"></i>
              </a>

              <a href="#portfolio" className="home__ghost">
                View my work
              </a>

              <Social />
            </div>
          </div>

          <div className="home__img-container" ref={stageRef}>
            <span className="home__orb home__orb--1"></span>
            <span className="home__orb home__orb--2"></span>
            <span className="home__orb home__orb--3"></span>

            <div
              className="home__img-border"
              onPointerMove={handleImgMove}
              onPointerLeave={handleImgLeave}
            >
              <div
                className="home__img"
                role="img"
                aria-label="Profile picture of Crissan Dondriano"
              >
                <span className="home__img-shine"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="home__scroll" aria-label="Scroll to the About section">
        <span className="home__scroll-mouse" aria-hidden="true">
          <span className="home__scroll-wheel"></span>
        </span>
        <span className="home__scroll-text">Scroll</span>
      </a>
    </section>
  );
};

export default Home;