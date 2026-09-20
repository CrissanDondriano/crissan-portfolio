import React, { useEffect, useRef, useState } from "react";

/* ============ CONFIG (edit these) ============ */
const CONFIG = {
  experienceYears: 1.5,
  // Put your PDF in the /public folder with this exact name
  resumeUrl: "/Crissan-Dondriano-Resume.pdf",
  resumeFileName: "Crissan-Dondriano-Resume.pdf",
};

const EXPERIENCES = [
  {
    id: "switchconnect",
    job: "Full-Stack Web Developer",
    // If this role has ended, update `year` and set `current` to false
    year: "2024 — Present",
    type: "Full-time",
    company: "Switchconnect PTY LTD",
    current: true,
    description:
      "I develop and maintain full web applications using React, Vue.js, Laravel, and MySQL. I handle both frontend and backend development, building responsive UI/UX, REST APIs, authentication systems, and data-driven features. I collaborate closely with teams and clients to deliver modern, scalable, and high-performing web solutions.",
    skills: ["React", "Vue.js", "Laravel", "MySQL", "REST APIs"],
    // Edit these to match specifics you're comfortable claiming
    achievements: [
      "Built and shipped features across the full stack, from database schema to UI",
      "Implemented authentication and role-based access for internal tools",
      "Worked directly with clients to scope, estimate, and deliver features",
    ],
  },
  {
    id: "peso",
    job: "Programmer Intern",
    year: "2023",
    type: "Internship",
    company: "Public Employment Service Office (PESO)",
    current: false,
    description:
      "Developed \u201cLinang \u2013 Living Interactions: Navigating Aquatic and Natural Geography,\u201d an educational game aligned with the UN\u2019s Sustainable Development Goals (Life Below Water & Life on Land). Contributed to programming, UI interaction, and ensuring smooth gameplay with efficient resource usage.",
    skills: ["Unity", "C#", "Game Design"],
    achievements: [
      "Programmed core gameplay systems in Unity/C#",
      "Built UI interactions aligned with the SDG educational goals of the project",
      "Optimized assets and logic for smoother in-game performance",
    ],
  },
];

// Every unique skill across all roles, used by the filter
const ALL_SKILLS = Array.from(new Set(EXPERIENCES.flatMap((exp) => exp.skills)));

const STATS = [
  { value: CONFIG.experienceYears, decimals: 1, suffix: "+", label: "Years of professional experience" },
  { value: EXPERIENCES.length, decimals: 0, suffix: "", label: "Roles, from internship to full-time" },
  { value: ALL_SKILLS.length, decimals: 0, suffix: "", label: "Technologies used on the job" },
];

/* ============ HELPERS ============ */
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const useCountUp = (target, active, decimals = 0, duration = 1400) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;

    if (prefersReducedMotion()) {
      setValue(target);
      return undefined;
    }

    let raf = 0;
    let start = null;

    const tick = (now) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);

  return value.toFixed(decimals);
};

/* ============ STAT CARD ============ */
const Stat = ({ value, decimals, suffix, label, active }) => {
  const display = useCountUp(value, active, decimals);

  return (
    <div className="experience__stat">
      <span className="experience__stat-value">
        {display}
        {suffix}
      </span>
      <span className="experience__stat-label">{label}</span>
    </div>
  );
};

/* ============ MAIN COMPONENT ============ */
const Experience = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const itemRefs = useRef([]);

  const [isVisible, setIsVisible] = useState(false);
  const [fillHeight, setFillHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [expandedIds, setExpandedIds] = useState(() => new Set());
  const [skillFilter, setSkillFilter] = useState("All");

  // Reveal the intro once the section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll-driven timeline: the line fills and each card lights up as you reach it
  useEffect(() => {
    let raf = null;

    const update = () => {
      const timeline = timelineRef.current;
      if (!timeline) return;

      const rect = timeline.getBoundingClientRect();
      const triggerLine = window.innerHeight * 0.45;
      const clamped = Math.max(0, Math.min(triggerLine - rect.top, rect.height));
      setFillHeight(clamped);

      let next = -1;
      itemRefs.current.forEach((el, index) => {
        if (!el) return;
        if (clamped >= el.offsetTop + 8) next = index;
      });
      setActiveIndex(next);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        update();
        raf = null;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Cards grow and shrink when expanded, so re-measure when the timeline resizes
    const resizeObserver = new ResizeObserver(onScroll);
    if (timelineRef.current) resizeObserver.observe(timelineRef.current);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      resizeObserver.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const allOpen = expandedIds.size === EXPERIENCES.length;

  const toggleExpanded = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    setExpandedIds(allOpen ? new Set() : new Set(EXPERIENCES.map((exp) => exp.id)));
  };

  const toggleSkill = (skill) => {
    setSkillFilter((prev) => (prev === skill ? "All" : skill));
  };

  const jumpToItem = (index) => {
    itemRefs.current[index]?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "center",
    });
  };

  // Faint cursor glow across the whole section (mouse only)
  const handleSectionMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--sx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--sy", `${e.clientY - rect.top}px`);
  };

  // Spotlight on the card under the cursor
  const handleCardMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const matchingCount =
    skillFilter === "All"
      ? EXPERIENCES.length
      : EXPERIENCES.filter((exp) => exp.skills.includes(skillFilter)).length;

  const resultText =
    skillFilter === "All"
      ? `${EXPERIENCES.length} roles`
      : `${matchingCount} of ${EXPERIENCES.length} roles use ${skillFilter}`;

  return (
    <section
      className={`experience section ${isVisible ? "experience--visible" : ""}`}
      id="experience"
      aria-labelledby="experience-heading"
      ref={sectionRef}
      onPointerMove={handleSectionMove}
    >
      <div className="experience__bg" aria-hidden="true">
        <span className="experience__cursor-glow"></span>
      </div>

      <div className="experience__container container">
        {/* ============ LEFT: INTRO, STATS, FILTER ============ */}
        <div className="experience__intro">
          <p className="experience__eyebrow experience__reveal" style={{ "--delay": "0ms" }}>
            <span className="experience__eyebrow-line" aria-hidden="true"></span>
            Experience
          </p>

          <h2
            id="experience-heading"
            className="experience__heading experience__reveal"
            style={{ "--delay": "80ms" }}
          >
            Work experience
          </h2>

          <p className="experience__lead experience__reveal" style={{ "--delay": "160ms" }}>
            Professional roles building full-stack web applications, plus an internship
            building an educational game in Unity.
          </p>

          <div className="experience__stats experience__reveal" style={{ "--delay": "240ms" }}>
            {STATS.map((stat) => (
              <Stat key={stat.label} {...stat} active={isVisible} />
            ))}
          </div>

          <div className="experience__filter experience__reveal" style={{ "--delay": "320ms" }}>
            <p className="experience__label" id="experience-filter-label">
              Filter by technology
            </p>

            <div
              className="experience__filters"
              role="group"
              aria-labelledby="experience-filter-label"
            >
              {["All", ...ALL_SKILLS].map((skill) => (
                <button
                  key={skill}
                  type="button"
                  className={`experience__filter-btn ${
                    skillFilter === skill ? "experience__filter-btn--active" : ""
                  }`}
                  aria-pressed={skillFilter === skill}
                  onClick={() => setSkillFilter(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="experience__controls experience__reveal" style={{ "--delay": "400ms" }}>
            <button
              type="button"
              className="experience__expand-all"
              onClick={toggleAll}
              aria-pressed={allOpen}
            >
              <i
                className={`uil ${allOpen ? "uil-angle-double-up" : "uil-angle-double-down"}`}
                aria-hidden="true"
              ></i>
              {allOpen ? "Collapse all" : "Expand all"}
            </button>

            <span className="experience__result" aria-live="polite">
              {resultText}
            </span>
          </div>
        </div>

        {/* ============ RIGHT: TIMELINE ============ */}
        <div className="experience__timeline" ref={timelineRef}>
          <div className="experience__track" aria-hidden="true">
            <div className="experience__track-fill" style={{ height: `${fillHeight}px` }}></div>
          </div>

          <ol className="experience__list">
            {EXPERIENCES.map((exp, index) => {
              const isOpen = expandedIds.has(exp.id);
              const isMatch = skillFilter === "All" || exp.skills.includes(skillFilter);

              return (
                <li
                  key={exp.id}
                  ref={(el) => (itemRefs.current[index] = el)}
                  className={
                    "experience__item" +
                    (index <= activeIndex ? " experience__item--active" : "") +
                    (isMatch ? "" : " experience__item--muted")
                  }
                >
                  <button
                    type="button"
                    className="experience__dot"
                    onClick={() => jumpToItem(index)}
                    aria-label={`Jump to ${exp.job} at ${exp.company}`}
                  ></button>

                  <div className="experience__card" onPointerMove={handleCardMove}>
                    <div className="experience__header">
                      <div className="experience__title-group">
                        <h3 className="experience__job">{exp.job}</h3>
                        <span className="experience__type">{exp.type}</span>
                      </div>

                      <p className="experience__year">
                        {exp.current && (
                          <span className="experience__live" aria-hidden="true"></span>
                        )}
                        {exp.year}
                      </p>
                    </div>

                    <p className="experience__company">
                      <i className="uil uil-building" aria-hidden="true"></i>
                      {exp.company}
                    </p>

                    <p className="experience__description">{exp.description}</p>

                    <button
                      type="button"
                      className="experience__toggle"
                      aria-expanded={isOpen}
                      aria-controls={`experience-details-${exp.id}`}
                      onClick={() => toggleExpanded(exp.id)}
                    >
                      <span>{isOpen ? "Hide key work" : "Show key work"}</span>
                      <i
                        className={`uil uil-angle-down experience__toggle-icon${
                          isOpen ? " experience__toggle-icon--open" : ""
                        }`}
                        aria-hidden="true"
                      ></i>
                    </button>

                    <div
                      id={`experience-details-${exp.id}`}
                      className={`experience__details-wrap${
                        isOpen ? " experience__details-wrap--open" : ""
                      }`}
                    >
                      <div className="experience__details-inner">
                        <ul className="experience__achievements">
                          {exp.achievements.map((point) => (
                            <li key={point}>
                              <i className="uil uil-check-circle" aria-hidden="true"></i>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <ul className="experience__skills" aria-label="Technologies used">
                      {exp.skills.map((skill) => (
                        <li key={skill}>
                          <button
                            type="button"
                            className={`experience__skill ${
                              skillFilter === skill ? "experience__skill--match" : ""
                            }`}
                            aria-pressed={skillFilter === skill}
                            onClick={() => toggleSkill(skill)}
                          >
                            {skill}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ============ CLOSING STRIP ============ */}
        <div className="experience__cta experience__reveal" style={{ "--delay": "240ms" }}>
          <div className="experience__cta-text">
            <h3 className="experience__cta-title">Want the full picture?</h3>
            <p className="experience__cta-sub">
              Download my resume, or send me a message about your next project or role.
            </p>
          </div>

          <div className="experience__cta-actions">
            
            <a  href={CONFIG.resumeUrl}
              className="button button--flex"
              download={CONFIG.resumeFileName}
            >
              <i className="uil uil-file-download-alt" aria-hidden="true"></i>
              Download Resume
            </a>

            <a href="#contact" className="experience__ghost">
              Get in touch
              <i className="uil uil-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;