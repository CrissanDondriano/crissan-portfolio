import React from 'react'
import Work from './projects/Work'

const Portfolio = () => {
  return (
    <section className="work section" id="portfolio">
      <div className="work__container container">
        <h2 className="section__title">Featured Projects</h2>
        <p className="section__subtitle">Here are some of the selected projects that showcase my passion for full stack development.</p>
        
        <Work />
      </div>
    </section>
  )
}

export default Portfolio