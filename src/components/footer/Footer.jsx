import React from 'react'
import './footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container container">
                <h1 className="footer__title">Crissan Dondriano</h1>

                <ul className="footer__list">
                    <li>
                        <a href="#about" className="footer__link">About</a>
                    </li>
                    <li>
                        <a href="#portfolio" className="footer__link">Projects</a>
                    </li>
                    <li>
                        <a href="#contacts" className="footer__link">Contacts</a>
                    </li>
                </ul>

                <div className="footer__social">
                    <a href="https://www.instagram.com/krazybrocs/" className="footer__social-link" target='_blank'>
                        <i className="bx bxl-instagram"></i>
                    </a>

                    <a href="https://www.facebook.com/profile.php?id=61553827551192" className="footer__social-link" target='_blank'>
                        <i className="bx bxl-facebook"></i>
                    </a>

                    <a href="https://twitter.com/Cris_Dondriano" className="footer__social-link" target='_blank'>
                        <i className="bx bxl-twitter"></i>
                    </a>
                </div>

                <span className="footer__copy">
                    © 2021 Dondriano's Portfolio
                </span>
            </div>
        </footer>
    )
}

export default Footer