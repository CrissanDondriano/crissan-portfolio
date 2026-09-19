import React, { useEffect, useRef, useState } from 'react'
import Work from './projects/Work'

const GITHUB_URL = 'https://github.com/CrissanDondriano'

const Portfolio = () => {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  // Reveal the header once the section scrolls into view
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Feeds the faint cursor-following glow in the background
  const handlePointerMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--sx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--sy', `${e.clientY - rect.top}px`)
  }

  return (
    <section
      className={`work section ${isVisible ? 'work--visible' : ''}`}
      id="portfolio"
      aria-labelledby="portfolio-heading"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
    >
      <div className="work__bg" aria-hidden="true">
        <span className="work__cursor-glow"></span>
      </div>

      <div className="work__container container">
        <header className="work__header">
          <p className="work__eyebrow work__reveal" style={{ '--delay': '0ms' }}>
            <span className="work__eyebrow-line" aria-hidden="true"></span>
            Portfolio
          </p>

          <h2
            id="portfolio-heading"
            className="work__heading work__reveal"
            style={{ '--delay': '80ms' }}
          >
            Featured projects
          </h2>

          <p className="work__lead work__reveal" style={{ '--delay': '160ms' }}>
            Selected full-stack projects, from database design and APIs to the interface.
            Open any project for the details, a live demo or the source code.
          </p>
        </header>

        <Work />

        <div className="work__cta work__reveal" style={{ '--delay': '240ms' }}>
          <div className="work__cta-text">
            <h3 className="work__cta-title">Have a project in mind?</h3>
            <p className="work__cta-sub">
              I'm available for new opportunities. Let's talk about what you're building.
            </p>
          </div>

          <div className="work__cta-actions">
            <a href="#contact" className="button button--flex">
              Get in touch
              <i className="uil uil-arrow-right work__cta-icon" aria-hidden="true"></i>
            </a>
            
            <a  href={GITHUB_URL}
              className="work__ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="uil uil-github" aria-hidden="true"></i>
              More on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Portfolio