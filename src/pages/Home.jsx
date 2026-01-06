import React from 'react'
import Social from './Social';

const Home = () => {
  return (
    <section className="home section" id='home'>
      <div className="home__container container">
        <div className="home__content">
          <div className="home__data">
            <h1 className="home__title">Hi, I Am <br/> Crissan Dondriano</h1>
            <p className="home__description">
              A creative developer based in the Philippines passionate about building 
              accessible and user-friendly websites.
            </p>

            <div className="home__buttons">
              <a href="#contact" className="button button--flex" aria-label="Contact Crissan Dondriano">
                Contact me
              </a>
              <Social /> 
            </div>
          </div>

          <div className="home__img" role="img" aria-label="Profile picture of Crissan Dondriano"></div>
        </div>
      </div>
    </section>
  )
}

export default Home