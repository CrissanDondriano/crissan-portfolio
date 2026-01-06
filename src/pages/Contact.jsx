import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
// import CV from "../../assets/Crissan-CV.pdf"

const Contact = () => {
    const form = useRef();
    const [formStatus, setFormStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const formData = new FormData(form.current);
        const errors = {};

        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const project = formData.get('project')?.trim();

        if (!name || name.length < 2) {
            errors.name = 'Please enter your full name';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!project || project.length < 10) {
            errors.project = 'Please provide more details about your project (minimum 10 characters)';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const sendEmail = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setFormStatus({
                type: 'error',
                message: 'Please fix the errors above before submitting.'
            });
            return;
        }

        setIsSubmitting(true);
        setFormStatus({ type: '', message: '' });

        try {
            await emailjs.sendForm(
                "service_26c31po",
                "template_kpfykz4",
                form.current,
                { publicKey: "ohZQVNTPaiU-nRfNM" }
            );

            setFormStatus({
                type: 'success',
                message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.'
            });

            e.target.reset();
            setFormErrors({});
        } catch (error) {
            console.error('Email send error:', error);
            setFormStatus({
                type: 'error',
                message: 'Oops! Something went wrong. Please try again or email me directly.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="contact section" id="contact" aria-labelledby="contact-heading">
            <div className="contact__container container grid">
                <div className="contact__description">
                    <h2 id="contact-heading" className="section__title">Let's Connect</h2>

                    <p className="section__subtitle">
                        Say hello at{" "}
                        <a
                            href="mailto:dondrianocrissan20@gmail.com"
                            className="section__link"
                            aria-label="Send email to Crissan Dondriano"
                        >
                            dondrianocrissan20@gmail.com
                        </a>
                    </p>

                    <p className="section__subtitle">
                        For more info, here's my{" "}
                        <a
                            href=""
                            className="section__link"
                            download="Crissan-Dondriano-Resume.pdf"
                            aria-label="Download my resume"
                        >
                            resume
                        </a>
                    </p>

                    <div className="section__social" role="navigation" aria-label="Social media links">
                        <a
                            href="https://www.linkedin.com/in/crissan-dondriano-862862316/"
                            className="section__social-icon"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit my LinkedIn profile"
                        >
                            <i className="uil uil-linkedin" aria-hidden="true"></i>
                        </a>

                        <a
                            href="https://github.com/CrissanDondriano"
                            className="section__social-icon"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit my GitHub profile"
                        >
                            <i className="uil uil-github" aria-hidden="true"></i>
                        </a>

                        <a
                            href="https://twitter.com/yourhandle"
                            className="section__social-icon"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit my Twitter profile"
                        >
                            <i className="uil uil-twitter" aria-hidden="true"></i>
                        </a>

                        <a
                            href="https://www.instagram.com/yourhandle"
                            className="section__social-icon"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit my Instagram profile"
                        >
                            <i className="uil uil-instagram" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>

                <div className="contact__content">
                    <form
                        ref={form}
                        onSubmit={sendEmail}
                        className="contact__form"
                        noValidate
                        aria-label="Contact form"
                    >
                        <div className="contact__form-div">
                            <input
                                type="text"
                                name="name"
                                className={`contact__form-input ${formErrors.name ? 'error' : ''}`}
                                placeholder=" "
                                required
                                aria-required="true"
                                aria-invalid={!!formErrors.name}
                                aria-describedby={formErrors.name ? "name-error" : undefined}
                            />
                            <label className="contact__form-tag">Name *</label>
                            {formErrors.name && (
                                <span id="name-error" className="form__error" role="alert">
                                    {formErrors.name}
                                </span>
                            )}
                        </div>

                        <div className="contact__form-div">
                            <input
                                type="email"
                                name="email"
                                className={`contact__form-input ${formErrors.email ? 'error' : ''}`}
                                placeholder=" "
                                required
                                aria-required="true"
                                aria-invalid={!!formErrors.email}
                                aria-describedby={formErrors.email ? "email-error" : undefined}
                            />
                            <label className="contact__form-tag">Email *</label>
                            {formErrors.email && (
                                <span id="email-error" className="form__error" role="alert">
                                    {formErrors.email}
                                </span>
                            )}
                        </div>

                        <div className="contact__form-div contact__form-area">
                            <textarea
                                name="project"
                                cols="30"
                                rows="10"
                                className={`contact__form-input ${formErrors.project ? 'error' : ''}`}
                                placeholder=" "
                                required
                                aria-required="true"
                                aria-invalid={!!formErrors.project}
                                aria-describedby={formErrors.project ? "project-error" : undefined}
                            ></textarea>
                            <label className="contact__form-tag">Project Details *</label>
                            {formErrors.project && (
                                <span id="project-error" className="form__error" role="alert">
                                    {formErrors.project}
                                </span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="button button--flex"
                            disabled={isSubmitting}
                            aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
                        >
                            {isSubmitting ? (
                                <>
                                    <i className="uil uil-spinner-alt" aria-hidden="true"></i>
                                </>
                            ) : (
                                <>
                                    Send Message
                                </>
                            )}
                        </button>

                        {formStatus.message && (
                            <div
                                className={`form__message form__message--${formStatus.type}`}
                                role="alert"
                                aria-live="polite"
                            >
                                {formStatus.message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;