import React, { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

const WorkItems = ({ item, index, onOpen }) => {
    const cardRef = useRef(null)
    const imgWrapRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    const tech = Array.isArray(item.tech) ? item.tech : []

    useEffect(() => {
        const el = cardRef.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(el)
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    // One handler drives both the card spotlight and the image tilt
    const handlePointerMove = (e) => {
        if (e.pointerType !== 'mouse') return

        const card = cardRef.current
        if (!card) return

        const cardRect = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${e.clientX - cardRect.left}px`)
        card.style.setProperty('--my', `${e.clientY - cardRect.top}px`)

        const wrap = imgWrapRef.current
        if (!wrap || prefersReducedMotion()) return

        const rect = wrap.getBoundingClientRect()
        const x = clamp((e.clientX - rect.left) / rect.width - 0.5, -0.5, 0.5)
        const y = clamp((e.clientY - rect.top) / rect.height - 0.5, -0.5, 0.5)
        wrap.style.setProperty('--rotateX', `${y * -6}deg`)
        wrap.style.setProperty('--rotateY', `${x * 6}deg`)
    }

    const handlePointerLeave = () => {
        const wrap = imgWrapRef.current
        if (!wrap) return
        wrap.style.setProperty('--rotateX', '0deg')
        wrap.style.setProperty('--rotateY', '0deg')
    }

    return (
        <li
            ref={cardRef}
            className={`work__card ${isVisible ? 'work__card--visible' : ''}`}
            style={{ '--delay': `${(index % 3) * 80}ms` }}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            {/* Mouse-only shortcut: the title button and "Details" button are the accessible controls */}
            <div
                className="work__img-wrap"
                ref={imgWrapRef}
                onClick={() => onOpen(item.id)}
            >
                <img
                    src={item.image}
                    alt={`${item.title} preview`}
                    className="work__img"
                    loading="lazy"
                    decoding="async"
                />
                <span className="work__img-shine"></span>

                {item.demo ? (
                    <span className="work__badge work__badge--live">
                        <span className="work__badge-dot"></span>Live
                    </span>
                ) : (
                    <span className="work__badge work__badge--opensource">
                        <span className="work__badge-dot"></span>Open Source
                    </span>
                )}

                <span className="work__quickview" aria-hidden="true">
                    <i className="uil uil-expand-arrows-alt"></i>
                    View details
                </span>
            </div>

            <div className="work__content">
                {(item.year || item.role) && (
                    <div className="work__meta">
                        {item.year && <span>{item.year}</span>}
                        {item.year && item.role && <span className="work__meta-divider">•</span>}
                        {item.role && <span>{item.role}</span>}
                    </div>
                )}

                <h3 className="work__title">
                    <button
                        type="button"
                        className="work__title-btn"
                        onClick={() => onOpen(item.id)}
                        aria-haspopup="dialog"
                    >
                        {item.title}
                    </button>
                </h3>

                {item.description && <p className="work__description">{item.description}</p>}

                {tech.length > 0 && (
                    <ul className="work__tech" aria-label="Technologies used">
                        {tech.map((t) => (
                            <li key={t} className="work__tech-item">
                                {t}
                            </li>
                        ))}
                    </ul>
                )}

                <div className="work__footer">
                    <div className="work__buttons">
                        {item.demo && (
                            
                            <a    href={item.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="work__button"
                                aria-label={`Live demo of ${item.title}`}
                            >
                                Live demo <i className="bx bx-right-arrow-alt work__button-icon"></i>
                            </a>
                        )}
                        {item.link && (
                            
                            <a    href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="work__button"
                                aria-label={`Source code of ${item.title} on GitHub`}
                            >
                                Source <i className="bx bx-right-arrow-alt work__button-icon"></i>
                            </a>
                        )}
                    </div>

                    <button
                        type="button"
                        className="work__more"
                        onClick={() => onOpen(item.id)}
                        aria-haspopup="dialog"
                        aria-label={`View details for ${item.title}`}
                    >
                        Details
                        <i className="uil uil-arrow-up-right" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </li>
    )
}

export default WorkItems