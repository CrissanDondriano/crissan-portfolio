import React, { useEffect, useRef, useState } from 'react';
import Resume from './../assets/pdf/Crissan Resume.pdf';

const CONFIG = {
    role: 'Full-Stack Web Developer | Philippines',
    resumeUrl: Resume,
    resumeFileName: 'Crissan-Dondriano-Resume.pdf',
    experienceYears: 1.5,
};

const DESCRIPTION =
    "I'm a full-stack web developer who builds complete web applications, from the database to the interface. " +
    'My core stack is PHP/Laravel, Vue.js and MySQL, with REST APIs and GraphQL keeping the front end and back end clean and predictable. ' +
    "I work in HTML, CSS, JavaScript, TypeScript and PHP, and I've also used Python, Java, C and C++. " +
    'I care about readable code, responsive and accessible interfaces, and shipping work that solves a real problem. ' +
    'I also use workflow automation tools like Airtable, Softr and Make to remove manual work.';

const LANGUAGES = [
    { name: 'HTML5', note: 'Markup' },
    { name: 'CSS3', note: 'Styling' },
    { name: 'JavaScript', note: 'Scripting' },
    { name: 'TypeScript', note: 'Typed JavaScript' },
    { name: 'PHP', note: 'Server-side' },
    { name: 'Python', note: 'General purpose' },
    { name: 'Java', note: 'Object-oriented' },
    { name: 'C', note: 'Systems' },
    { name: 'C++', note: 'Systems & OOP' },
];

// Frameworks, libraries, tools and platforms (languages live in LANGUAGES above)
const SKILLS = [
    { name: 'React', group: 'Frontend' },
    { name: 'Vue 3', group: 'Frontend' },
    { name: 'Bootstrap', group: 'Frontend' },
    { name: 'jQuery', group: 'Frontend' },
    { name: 'Three.js', group: 'Frontend' },
    { name: 'GSAP', group: 'Frontend' },
    { name: 'Canvas API', group: 'Frontend' },
    { name: 'Laravel', group: 'Backend' },
    { name: 'MySQL', group: 'Backend' },
    { name: 'REST APIs', group: 'Backend' },
    { name: 'GraphQL', group: 'Backend' },
    { name: 'Git', group: 'Tools' },
    { name: 'Postman', group: 'Tools' },
    { name: 'Vite', group: 'Tools' },
    { name: 'Airtable', group: 'Automation' },
    { name: 'Make.com', group: 'Automation' },
    { name: 'Softr', group: 'Automation' },
];

const FILTERS = ['All', 'Frontend', 'Backend', 'Tools', 'Automation'];

const PILLARS = [
    {
        id: 'frontend',
        label: 'Frontend',
        group: 'Frontend',
        icon: 'uil-desktop',
        title: 'Interfaces that feel fast and considered',
        text: 'I build responsive, accessible UIs with a strong eye for UX, from component structure to the small interactions that make a product feel polished.',
        points: [
            'Component-driven UIs with Vue 3 and React',
            'Responsive layouts with Bootstrap, semantic HTML and clean CSS',
            'Motion and interaction with GSAP, Canvas and Three.js',
        ],
    },
    {
        id: 'backend',
        label: 'Backend',
        group: 'Backend',
        icon: 'uil-database',
        title: 'Reliable back ends and data models',
        text: 'I design the server side to be simple to maintain: clear structure, validated input and a database schema that fits the problem.',
        points: [
            'Laravel applications with clear structure and validation',
            'MySQL schema design and query work',
            'REST and GraphQL APIs consumed by Vue and React front ends',
            'API testing and debugging with Postman',
        ],
    },
    {
        id: 'automation',
        label: 'Automation',
        group: 'Automation',
        icon: 'uil-bolt-alt',
        title: 'Workflows that remove manual work',
        text: 'Not every problem needs custom code. I use no-code and automation tools where they get the job done faster and cheaper.',
        points: [
            'Databases and internal tools in Airtable and Softr',
            'Automated scenarios with Make.com',
            'Connecting apps and APIs so data flows without copy-paste',
        ],
    },
];

const STATS = [
    { value: CONFIG.experienceYears, decimals: 1, suffix: '+', label: 'Years of professional experience' },
    { value: LANGUAGES.length, decimals: 0, suffix: '', label: 'Languages in my toolkit' },
    { value: SKILLS.length, decimals: 0, suffix: '', label: 'Frameworks and tools in my toolkit' },
];

/* ============ HOOKS ============ */
const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const useCountUp = (target, active, decimals = 0, duration = 1400) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!active) return;

        if (prefersReducedMotion()) {
            setValue(target);
            return;
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

/* ============ INTERACTIVE BACKGROUND ============ */
const AboutBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const reduce = prefersReducedMotion();

        const raw = getComputedStyle(document.documentElement)
            .getPropertyValue('--light-blue')
            .trim();
        const match = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(raw);
        const rgb = match
            ? `${parseInt(match[1], 16)}, ${parseInt(match[2], 16)}, ${parseInt(match[3], 16)}`
            : '240, 240, 240';

        const LINK_DIST = 120;
        const MOUSE_DIST = 160;
        const REPEL_DIST = 70;

        let w = 0;
        let h = 0;
        let particles = [];
        let raf = 0;
        let running = false;
        const mouse = { x: -9999, y: -9999 };

        const draw = () => {
            ctx.clearRect(0, 0, w, h);

            for (const p of particles) {
                if (!reduce) {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0 || p.x > w) p.vx *= -1;
                    if (p.y < 0 || p.y > h) p.vy *= -1;

                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const d = Math.hypot(dx, dy);
                    if (d > 0 && d < REPEL_DIST) {
                        const push = (1 - d / REPEL_DIST) * 1.2;
                        p.x += (dx / d) * push;
                        p.y += (dy / d) * push;
                    }
                }
            }

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const d = Math.hypot(a.x - b.x, a.y - b.y);
                    if (d < LINK_DIST) {
                        ctx.strokeStyle = `rgba(${rgb}, ${(1 - d / LINK_DIST) * 0.18})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            for (const p of particles) {
                const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
                if (d < MOUSE_DIST) {
                    ctx.strokeStyle = `rgba(${rgb}, ${(1 - d / MOUSE_DIST) * 0.5})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
                ctx.fillStyle = `rgba(${rgb}, ${d < MOUSE_DIST ? 0.9 : 0.45})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const loop = () => {
            draw();
            raf = requestAnimationFrame(loop);
        };

        const start = () => {
            if (running || reduce) return;
            running = true;
            raf = requestAnimationFrame(loop);
        };

        const stop = () => {
            running = false;
            cancelAnimationFrame(raf);
        };

        const init = () => {
            const rect = canvas.getBoundingClientRect();
            w = rect.width;
            h = rect.height;
            if (!w || !h) return;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = Math.max(24, Math.min(90, Math.floor((w * h) / 16000)));
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.4 + 0.6,
            }));

            if (reduce) draw();
        };

        const onPointerMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                mouse.x = x;
                mouse.y = y;
            } else {
                mouse.x = -9999;
                mouse.y = -9999;
            }
        };

        const onPointerLeave = () => {
            mouse.x = -9999;
            mouse.y = -9999;
        };

        init();

        const resizeObserver = new ResizeObserver(init);
        resizeObserver.observe(canvas);

        const visibilityObserver = new IntersectionObserver(
            ([entry]) => (entry.isIntersecting ? start() : stop()),
            { threshold: 0 }
        );
        visibilityObserver.observe(canvas);

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        document.addEventListener('pointerleave', onPointerLeave);

        return () => {
            stop();
            resizeObserver.disconnect();
            visibilityObserver.disconnect();
            window.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerleave', onPointerLeave);
        };
    }, []);

    return (
        <div className="about__bg" aria-hidden="true">
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

/* ============ STAT CARD ============ */
const Stat = ({ value, decimals, suffix, label, active }) => {
    const display = useCountUp(value, active, decimals);

    return (
        <div className="about__stat">
            <span className="about__stat-value">
                {display}
                {suffix}
            </span>
            <span className="about__stat-label">{label}</span>
        </div>
    );
};

/* ============ MAIN COMPONENT ============ */
const About = () => {
    const sectionRef = useRef(null);
    const tabRefs = useRef([]);
    const [isVisible, setIsVisible] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Cursor spotlight, shared by the "What I do" panel and the language cards
    const handlePointerMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };

    const handleTabKeyDown = (e) => {
        const last = PILLARS.length - 1;
        let next = null;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            next = activeTab === last ? 0 : activeTab + 1;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            next = activeTab === 0 ? last : activeTab - 1;
        } else if (e.key === 'Home') {
            next = 0;
        } else if (e.key === 'End') {
            next = last;
        }

        if (next !== null) {
            e.preventDefault();
            setActiveTab(next);
            tabRefs.current[next]?.focus();
        }
    };

    const matchCount =
        filter === 'All' ? SKILLS.length : SKILLS.filter((s) => s.group === filter).length;

    const pillar = PILLARS[activeTab];

    const languagesSection = (
        <div className="about__languages">
            <p
                className="about__stack-label about__lang-label about__reveal"
                style={{ '--delay': '450ms' }}
            >
                Languages
            </p>

            <ul className="about__lang-grid" aria-label="Languages I work with">
                {LANGUAGES.map((lang, i) => (
                    <li
                        key={lang.name}
                        className="about__lang"
                        style={{ '--i': i }}
                        onPointerMove={handlePointerMove}
                    >
                        <span className="about__lang-index" aria-hidden="true">
                            {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="about__lang-name">{lang.name}</span>
                        <span className="about__lang-note">{lang.note}</span>
                    </li>
                ))}
            </ul>
        </div>
    );

    const stackSection = (
        <div className="about__stack about__reveal" style={{ '--delay': '560ms' }}>
            <div className="about__stack-head">
                <p className="about__stack-label">Frameworks &amp; Tools</p>

                <div className="about__filters" role="group" aria-label="Filter technologies by category">
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            type="button"
                            className={`about__filter ${filter === f ? 'about__filter--active' : ''}`}
                            aria-pressed={filter === f}
                            onClick={() => setFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <ul className="about__chips" aria-label="Frameworks and tools">
                {SKILLS.map((skill) => {
                    const dim = filter !== 'All' && skill.group !== filter;
                    return (
                        <li
                            key={skill.name}
                            className={`about__chip ${dim ? 'about__chip--dim' : ''}`}
                        >
                            {skill.name}
                        </li>
                    );
                })}
            </ul>

            <p className="about__sr-only" aria-live="polite">
                {filter === 'All'
                    ? `Showing all ${SKILLS.length} frameworks and tools`
                    : `${matchCount} technologies in ${filter}`}
            </p>
        </div>
    );

    return (
        <section
            className={`about section ${isVisible ? 'about--visible' : ''}`}
            id="about"
            aria-labelledby="about-heading"
            ref={sectionRef}
        >
            <AboutBackground />

            <div className="about__container container">
                <header className="about__header">
                    <p className="about__eyebrow about__reveal" style={{ '--delay': '0ms' }}>
                        <span className="about__eyebrow-line" aria-hidden="true"></span>
                        About
                    </p>
                    <h2
                        id="about-heading"
                        className="about__heading about__reveal"
                        style={{ '--delay': '80ms' }}
                    >
                        About Me
                    </h2>
                </header>

                <div className="about__layout about__layout--split">
                    <div className="about__main">
                        <h3 className="about__title about__reveal" style={{ '--delay': '160ms' }}>
                            {CONFIG.role}
                        </h3>

                        <p className="about__description about__reveal" style={{ '--delay': '240ms' }}>
                            {DESCRIPTION}
                        </p>

                        <div className="about__stats about__reveal" style={{ '--delay': '320ms' }}>
                            {STATS.map((stat) => (
                                <Stat key={stat.label} {...stat} active={isVisible} />
                            ))}
                        </div>

                        <div className="about__buttons about__reveal" style={{ '--delay': '400ms' }}>
                            
                            <a    href={CONFIG.resumeUrl}
                                className="button button--flex about__resume"
                                download={CONFIG.resumeFileName}
                                aria-label="Download my resume as PDF"
                            >
                                <i className="uil uil-file-download-alt" aria-hidden="true"></i>
                                Download Resume
                            </a>
                            <Social />
                        </div>
                    </div>

                    <div
                        className="about__panel about__reveal"
                        style={{ '--delay': '280ms' }}
                        onPointerMove={handlePointerMove}
                    >
                        <p className="about__panel-label">What I do</p>

                        <div
                            className="about__tablist"
                            role="tablist"
                            aria-label="Areas of expertise"
                            onKeyDown={handleTabKeyDown}
                        >
                            {PILLARS.map((item, index) => (
                                <button
                                    key={item.id}
                                    ref={(el) => (tabRefs.current[index] = el)}
                                    type="button"
                                    role="tab"
                                    id={`about-tab-${item.id}`}
                                    className="about__tab"
                                    aria-selected={activeTab === index}
                                    aria-controls={`about-panel-${item.id}`}
                                    tabIndex={activeTab === index ? 0 : -1}
                                    onClick={() => setActiveTab(index)}
                                >
                                    <i className={`uil ${item.icon}`} aria-hidden="true"></i>
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </div>

                        <div
                            key={pillar.id}
                            className="about__tabpanel"
                            role="tabpanel"
                            id={`about-panel-${pillar.id}`}
                            aria-labelledby={`about-tab-${pillar.id}`}
                            tabIndex={0}
                        >
                            <h4 className="about__tabpanel-title">{pillar.title}</h4>
                            <p className="about__tabpanel-text">{pillar.text}</p>

                            <ul className="about__points">
                                {pillar.points.map((point) => (
                                    <li key={point}>
                                        <i className="uil uil-check-circle" aria-hidden="true"></i>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                type="button"
                                className="about__highlight"
                                onClick={() => setFilter(pillar.group)}
                            >
                                Highlight {pillar.label.toLowerCase()} tools
                                <i className="uil uil-arrow-down" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {languagesSection}
                {stackSection}
            </div>
        </section>
    );
};

export default About;