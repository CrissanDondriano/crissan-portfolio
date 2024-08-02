import React from 'react'
import './portfolio.css'
import Work from './Work'

const Portfolio = () => {
  return (
    <section className="work section" id="portfolio">
      <h2 className="section__title">Portfolio</h2>
      <p className="section__subtitle">My recent work</p>
      
      <Work />
    </section>
  )
}

export default Portfolio