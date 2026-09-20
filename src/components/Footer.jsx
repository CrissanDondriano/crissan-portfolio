import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear()

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="footer">
            <div className="footer__container container">

                <div className="footer__grid">
                    <div className="footer__brand">
                        <a href="#home" className="footer__logo">
                            <span className="footer__logo-bracket" aria-hidden="true">&lt;</span>
                            Crissan Dondriano
                            <span className="footer__logo-bracket" aria-hidden="true"> /&gt;</span>
                        </a>
                        <p className="footer__tagline">
                            Full stack web developer building clean, reliable web applications.
                        </p>
                        <span className="footer__status">
                            <span className="footer__status-dot"></span>
                            Available for work
                        </span>
                    </div>

                    <div className="footer__column">
                        <h4 className="footer__heading">Navigate</h4>
                        <ul className="footer__list">
                            <li>
                                <a href="#home" className="footer__link">Home</a>
                            </li>
                            <li>
                                <a href="#portfolio" className="footer__link">Projects</a>
                            </li>
                            <li>
                                <a href="#about" className="footer__link">About</a>
                            </li>
                            <li>
                                <a href="#contact" className="footer__link">Contact</a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer__column">
                        <h4 className="footer__heading">Connect</h4>
                        <ul className="footer__list">
                            <li>
                                <a href="mailto:dondrianocrissan20@gmail.com" className="footer__link">
                                    Email
                                </a>
                            </li>
                            <li>

                                <a href="https://github.com/CrissanDondriano"
                                    className="footer__link"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    GitHub
                                </a>
                            </li>
                            <li>

                                <a href="https://www.linkedin.com/in/crissan-dondriano-862862316"
                                    className="footer__link"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer__social">

                    <a href="https://github.com/CrissanDondriano"
                        className="footer__social-link"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                    >
                        <i className="bx bxl-github"></i>
                    </a>

                    <a href="https://www.linkedin.com/in/crissan-dondriano-862862316"
                        className="footer__social-link"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                    >
                        <i className="bx bxl-linkedin"></i>
                    </a>

                    <a href="https://twitter.com/Cris_Dondriano"
                        className="footer__social-link"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Twitter"
                    >
                        <i className="bx bxl-twitter"></i>
                    </a>

                    <a href="https://www.instagram.com/krazybrocs/"
                        className="footer__social-link"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                    >
                        <i className="bx bxl-instagram"></i>
                    </a>

                    <a href="https://www.facebook.com/profile.php?id=61553827551192"
                        className="footer__social-link"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Facebook"
                    >
                        <i className="bx bxl-facebook"></i>
                    </a>
                </div>

                <div className="footer__bottom">
                    <span className="footer__copy">
                        © {year} Crissan Dondriano. All rights reserved.
                    </span>

                    <button
                        className="footer__top"
                        onClick={scrollToTop}
                        aria-label="Back to top"
                        type="button"
                    >
                        <i className="uil uil-arrow-up"></i>
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer