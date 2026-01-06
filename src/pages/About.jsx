import React from 'react';
import Social from './Social';
import { Link } from 'react-router-dom';

const About = ({ isFullPage = false }) => {
    if (!isFullPage) {
        return (
            <section className="about section" id="about" aria-labelledby="about-heading">
                <div className="about__container container grid">
                    <h2 id="about-heading" className="section__title">About Me</h2>

                    <div className="about__information">
                        <h3 className='about__title'>
                            Full-Stack Web Developer | Philippines
                        </h3>

                        <p className="about__description">
                            As a frontend developer, I specialize in crafting clean, modern, and user-friendly interfaces with a strong focus on UI/UX design.
                            I also have solid experience in backend development, allowing me to build complete and functional web applications from start to finish.
                            With a passion for creating meaningful digital experiences, I'm committed to delivering high-quality projects that exceed client expectations
                            and help businesses grow.
                        </p>
                        <Link 
                            className="about__links" 
                            to="/about"
                            aria-label="Read more about my background and experience"
                        >
                            More About Me
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="about section" id="about" aria-labelledby="about-full-heading">
            <div className="about__container container grid">
                <h2 id="about-full-heading" className="section__title">About Me</h2>

                <div className="about__information">
                    <h3 className='about__title'>
                        Full-Stack Web Developer | Philippines
                    </h3>

                    <p className="about__description">
                        As a frontend developer, I specialize in crafting clean, modern, and user-friendly interfaces with a strong focus on UI/UX design.
                        I also have solid experience in backend development, allowing me to build complete and functional web applications from start to finish.
                        With a passion for creating meaningful digital experiences, I'm committed to delivering high-quality projects that exceed client expectations
                        and help businesses grow.
                    </p>
                    
                    <div className="about__buttons">
                        <a 
                            href="/resume.pdf" 
                            className="button button--flex"
                            download="Crissan-Resume.pdf"
                            aria-label="Download my resume as PDF"
                        >
                            Download Resume
                        </a>
                        <Social /> 
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;