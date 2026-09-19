import React, { useEffect, useRef } from 'react'

const ProjectModal = ({ project, index, total, onClose, onPrev, onNext }) => {
    const dialogRef = useRef(null)
    const scrollRef = useRef(null)

    const tech = Array.isArray(project.tech) ? project.tech : []

    // Open as a native modal (focus trap, Escape key and inert page come for free) and lock page scroll
    useEffect(() => {
        const dialog = dialogRef.current
        if (dialog && !dialog.open) dialog.showModal()

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [])

    // Start at the top whenever the user moves to another project
    useEffect(() => {
        scrollRef.current?.scrollTo?.({ top: 0 })
    }, [project.id])

    const handleCancel = (e) => {
        // Let React unmount the dialog instead of the browser closing it
        e.preventDefault()
        onClose()
    }

    // Clicks on the backdrop land on the <dialog> element itself
    const handleClick = (e) => {
        if (e.target === dialogRef.current) onClose()
    }

    const handleKeyDown = (e) => {
        if (total < 2) return
        if (e.key === 'ArrowLeft') {
            e.preventDefault()
            onPrev()
        } else if (e.key === 'ArrowRight') {
            e.preventDefault()
            onNext()
        }
    }

    return (
        <dialog
            ref={dialogRef}
            className="work__modal"
            aria-labelledby="work-modal-title"
            onCancel={handleCancel}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <button
                type="button"
                className="work__modal-close"
                onClick={onClose}
                aria-label="Close project details"
            >
                <i className="uil uil-times" aria-hidden="true"></i>
            </button>

            <div className="work__modal-scroll" ref={scrollRef}>
                <div className="work__modal-inner" key={project.id}>
                    <div className="work__modal-media">
                        <img
                            src={project.image}
                            alt={`${project.title} preview`}
                            className="work__modal-img"
                        />
                    </div>

                    <div className="work__modal-info">
                        {project.demo ? (
                            <span className="work__badge work__badge--live work__badge--static">
                                <span className="work__badge-dot"></span>Live
                            </span>
                        ) : (
                            <span className="work__badge work__badge--opensource work__badge--static">
                                <span className="work__badge-dot"></span>Open Source
                            </span>
                        )}

                        {(project.year || project.role) && (
                            <div className="work__meta">
                                {project.year && <span>{project.year}</span>}
                                {project.year && project.role && (
                                    <span className="work__meta-divider">•</span>
                                )}
                                {project.role && <span>{project.role}</span>}
                            </div>
                        )}

                        <h3 id="work-modal-title" className="work__modal-title">
                            {project.title}
                        </h3>

                        {project.description && (
                            <p className="work__modal-description">{project.description}</p>
                        )}

                        {tech.length > 0 && (
                            <ul className="work__tech" aria-label="Technologies used">
                                {tech.map((t) => (
                                    <li key={t} className="work__tech-item">
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {(project.demo || project.link) && (
                            <div className="work__modal-actions">
                                {project.demo && (
                                    
                                    <a    href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="button button--flex work__modal-primary"
                                    >
                                        Live demo
                                        <i
                                            className="uil uil-external-link-alt"
                                            aria-hidden="true"
                                        ></i>
                                    </a>
                                )}
                                {project.link && (
                                    
                                    <a    href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="work__ghost"
                                    >
                                        <i className="uil uil-github" aria-hidden="true"></i>
                                        View source
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {total > 1 && (
                <nav className="work__modal-nav" aria-label="Project navigation">
                    <button type="button" className="work__nav-btn" onClick={onPrev}>
                        <i className="uil uil-angle-left" aria-hidden="true"></i>
                        Previous
                    </button>

                    <span className="work__modal-count" aria-live="polite">
                        {index + 1} / {total}
                    </span>

                    <button type="button" className="work__nav-btn" onClick={onNext}>
                        Next
                        <i className="uil uil-angle-right" aria-hidden="true"></i>
                    </button>
                </nav>
            )}
        </dialog>
    )
}

export default ProjectModal