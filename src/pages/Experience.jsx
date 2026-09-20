import React, { useEffect, useRef, useState } from "react";

const CONFIG = {
  experienceYears: 1.5,
};

const EXPERIENCES = [
  {
    id: "switchconnect",
    job: "Full-Stack Web Developer",
    year: "2024 — 2026",
    type: "Full-time",
    company: "Switchconnect PTY LTD",
    current: true,
    description:
      "I develop and maintain full web applications using React, Vue.js, Laravel, and MySQL. I handle both frontend and backend development, building responsive UI/UX, REST APIs, authentication systems, and data-driven features. I collaborate closely with teams and clients to deliver modern, scalable, and high-performing web solutions.",
    skills: ["React", "Vue.js", "Laravel", "MySQL", "REST APIs"],
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

const ALL_SKILLS = Array.from(new Set(EXPERIENCES.flatMap((exp) => exp.skills)));

const STATS = [
  { value: CONFIG.experienceYears, decimals: 1, suffix: "+", label: "Years of professional experience" },
  { value: EXPERIENCES.length, decimals: 0, suffix: "", label: "Roles, from internship to full-time" },
  { value: ALL_SKILLS.length, decimals: 0, suffix: "", label: "Technologies used on the job" },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Experience = () => {
  const timelineRef = useRef(null);
  const itemRefs = useRef([]);

  const [fillHeight, setFillHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [expandedIds, setExpandedIds] = useState(() => new Set());

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

  const jumpToItem = (index) => {
    itemRefs.current[index]?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "center",
    });
  };

  const handleSectionMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--sx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--sy", `${e.clientY - rect.top}px`);
  };

  const handleCardMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      className="experience section"
      id="experience"
      aria-labelledby="experience-heading"
      onPointerMove={handleSectionMove}
    >
      <div className="experience__bg" aria-hidden="true">
        <span className="experience__cursor-glow"></span>
      </div>

      <div className="experience__container container">
        <div className="experience__intro">
          <p className="experience__eyebrow">
            <span className="experience__eyebrow-line" aria-hidden="true"></span>
            Experience
          </p>

          <h2 id="experience-heading" className="experience__heading">
            Work experience
          </h2>

          <p className="experience__lead">
            Professional roles building full-stack web applications, plus an internship
            building an educational game in Unity.
          </p>

          <div className="experience__stats">
            {STATS.map((stat) => (
              <div className="experience__stat" key={stat.label}>
                <span className="experience__stat-value">
                  {stat.value.toFixed(stat.decimals)}
                  {stat.suffix}
                </span>
                <span className="experience__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="experience__controls">
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
          </div>
        </div>

        <div className="experience__timeline" ref={timelineRef}>
          <div className="experience__track" aria-hidden="true">
            <div className="experience__track-fill" style={{ height: `${fillHeight}px` }}></div>
          </div>

          <ol className="experience__list">
            {EXPERIENCES.map((exp, index) => {
              const isOpen = expandedIds.has(exp.id);

              return (
                <li
                  key={exp.id}
                  ref={(el) => (itemRefs.current[index] = el)}
                  className={
                    "experience__item" + (index <= activeIndex ? " experience__item--active" : "")
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
                        <li key={skill} className="experience__skill">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Experience;