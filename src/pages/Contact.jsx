import React, { useEffect, useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

/* ============ CONFIG (edit these) ============ */
const CONFIG = {
    email: "dondrianocrissan20@gmail.com",
    location: "Philippines",
    timezone: "Asia/Manila",
    // Put your PDF in the /public folder with this exact name
    resumeUrl: "/Crissan-Dondriano-Resume.pdf",
    resumeFileName: "Crissan-Dondriano-Resume.pdf",
    availability: "Available for new opportunities",
    emailjs: {
        serviceId: "service_26c31po",
        templateId: "template_kpfykz4",
        publicKey: "ohZQVNTPaiU-nRfNM",
    },
};

const SOCIALS = [
    {
        label: "LinkedIn",
        handle: "crissan-dondriano",
        href: "https://www.linkedin.com/in/crissan-dondriano-862862316/",
        icon: "uil-linkedin",
    },
    {
        label: "GitHub",
        handle: "CrissanDondriano",
        href: "https://github.com/CrissanDondriano",
        icon: "uil-github",
    },
];

const STACK = ["PHP / Laravel", "Vue.js", "React", "MySQL", "REST APIs", "Automation"];

const PROJECT_TYPES = [
    "Web Application",
    "API / Backend",
    "Workflow Automation",
    "Full-time Role",
    "Something Else",
];

const MAX_MESSAGE = 1000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validators = {
    name: (v) => (v.trim().length < 2 ? "Please enter your full name" : ""),
    email: (v) => (!EMAIL_REGEX.test(v.trim()) ? "Please enter a valid email address" : ""),
    project: (v) =>
        v.trim().length < 10 ? "Tell me a bit more (at least 10 characters)" : "",
};

const validateAll = (values) => ({
    name: validators.name(values.name),
    email: validators.email(values.email),
    project: validators.project(values.project),
});

const INITIAL_VALUES = { name: "", email: "", project: "" };

/* ============ HOOKS ============ */
const useLocalTime = (timeZone) => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const format = () =>
            new Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
                timeZone,
            }).format(new Date());

        setTime(format());
        const id = setInterval(() => setTime(format()), 30 * 1000);
        return () => clearInterval(id);
    }, [timeZone]);

    return time;
};

/* ============ FIELD COMPONENT ============ */
const Field = ({
    as = "input",
    id,
    name,
    label,
    type = "text",
    value,
    error,
    touched,
    onChange,
    onBlur,
    onKeyDown,
    autoComplete,
    maxLength,
    rows,
}) => {
    const Tag = as;
    const showError = touched && error;
    const showValid = touched && !error && value.length > 0;
    const stateClass = showError ? "contact__field--error" : showValid ? "contact__field--valid" : "";

    return (
        <div className={`contact__field ${stateClass}`}>
            <Tag
                id={id}
                name={name}
                type={as === "input" ? type : undefined}
                rows={as === "textarea" ? rows : undefined}
                className="contact__input"
                placeholder=" "
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                autoComplete={autoComplete}
                maxLength={maxLength}
                aria-required="true"
                aria-invalid={!!showError}
                aria-describedby={showError ? `${id}-error` : undefined}
            />
            <label htmlFor={id} className="contact__label">
                {label}
            </label>

            {(showError || showValid) && (
                <i
                    className={`uil ${showError ? "uil-exclamation-circle" : "uil-check-circle"} contact__status-icon`}
                    aria-hidden="true"
                ></i>
            )}

            {showError && (
                <p id={`${id}-error`} className="contact__error" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};

/* ============ MAIN COMPONENT ============ */
const Contact = () => {
    const form = useRef(null);
    const successRef = useRef(null);
    const copyTimer = useRef(null);

    const [values, setValues] = useState(INITIAL_VALUES);
    const [touched, setTouched] = useState({});
    const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
    const [status, setStatus] = useState({ type: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sent, setSent] = useState(false);
    const [copied, setCopied] = useState(false);

    const localTime = useLocalTime(CONFIG.timezone);
    const errors = useMemo(() => validateAll(values), [values]);

    // Move focus to the success message for screen readers / keyboard users
    useEffect(() => {
        if (sent) successRef.current?.focus();
    }, [sent]);

    // Clean up the copy timer on unmount
    useEffect(() => () => clearTimeout(copyTimer.current), []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        if (status.type === "error") setStatus({ type: "", message: "" });
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const handleKeyDown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            e.preventDefault();
            form.current?.requestSubmit();
        }
    };

    const handlePointerMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(CONFIG.email);
            setCopied(true);
            clearTimeout(copyTimer.current);
            copyTimer.current = setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${CONFIG.email}`;
        }
    };

    const resetForm = () => {
        setValues(INITIAL_VALUES);
        setTouched({});
        setProjectType(PROJECT_TYPES[0]);
        setStatus({ type: "", message: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setTouched({ name: true, email: true, project: true });

        const firstInvalid = Object.keys(errors).find((key) => errors[key]);
        if (firstInvalid) {
            setStatus({
                type: "error",
                message: "Please fix the highlighted fields and try again.",
            });
            form.current?.elements[firstInvalid]?.focus();
            return;
        }

        // Honeypot: real users never fill this in
        if (form.current?.elements["website"]?.value) {
            setSent(true);
            resetForm();
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: "", message: "" });

        try {
            await emailjs.sendForm(
                CONFIG.emailjs.serviceId,
                CONFIG.emailjs.templateId,
                form.current,
                { publicKey: CONFIG.emailjs.publicKey }
            );

            setSent(true);
            resetForm();
        } catch (error) {
            console.error("Email send error:", error);
            setStatus({
                type: "error",
                message: `Something went wrong. Please try again or email me directly at ${CONFIG.email}.`,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const messageLength = values.project.length;
    const counterClass =
        messageLength > MAX_MESSAGE * 0.9 ? "contact__counter contact__counter--warn" : "contact__counter";

    return (
        <section className="contact section" id="contact" aria-labelledby="contact-heading">
            <div className="contact__container container">
                {/* ============ LEFT: INFO ============ */}
                <div className="contact__info">
                    <p className="contact__eyebrow contact__reveal" style={{ "--delay": "0ms" }}>
                        <span className="contact__eyebrow-line" aria-hidden="true"></span>
                        Contact
                    </p>

                    <h2
                        id="contact-heading"
                        className="contact__title contact__reveal"
                        style={{ "--delay": "80ms" }}
                    >
                        Let's build something great together
                    </h2>

                    <p className="contact__lead contact__reveal" style={{ "--delay": "160ms" }}>
                        Have a project, a role, or an idea worth shipping? I'm a full-stack web
                        developer who turns requirements into clean, reliable web applications.
                        Send me a message and I'll get back to you soon.
                    </p>

                    <div
                        className="contact__badge contact__reveal"
                        style={{ "--delay": "220ms" }}
                        role="status"
                    >
                        <span className="contact__badge-dot" aria-hidden="true"></span>
                        {CONFIG.availability}
                    </div>

                    <ul
                        className="contact__stack contact__reveal"
                        style={{ "--delay": "280ms" }}
                        aria-label="Technologies I work with"
                    >
                        {STACK.map((tech) => (
                            <li key={tech} className="contact__stack-item">
                                {tech}
                            </li>
                        ))}
                    </ul>

                    <div className="contact__cards contact__reveal" style={{ "--delay": "340ms" }}>
                        <div className="contact__card">
                            <span className="contact__card-icon" aria-hidden="true">
                                <i className="uil uil-envelope"></i>
                            </span>
                            <div className="contact__card-body">
                                <span className="contact__card-label">Email</span>
                                
                                <a    href={`mailto:${CONFIG.email}`}
                                    className="contact__card-value"
                                    aria-label={`Send an email to ${CONFIG.email}`}
                                >
                                    {CONFIG.email}
                                </a>
                            </div>
                            <button
                                type="button"
                                className={`contact__copy ${copied ? "contact__copy--done" : ""}`}
                                onClick={handleCopyEmail}
                                aria-label={copied ? "Email address copied" : "Copy email address"}
                            >
                                <i
                                    className={`uil ${copied ? "uil-check" : "uil-copy"}`}
                                    aria-hidden="true"
                                ></i>
                                <span>{copied ? "Copied" : "Copy"}</span>
                            </button>
                            <span className="contact__sr-only" aria-live="polite">
                                {copied ? "Email address copied to clipboard" : ""}
                            </span>
                        </div>

                        <div className="contact__card">
                            <span className="contact__card-icon" aria-hidden="true">
                                <i className="uil uil-map-marker"></i>
                            </span>
                            <div className="contact__card-body">
                                <span className="contact__card-label">Based in</span>
                                <span className="contact__card-value">
                                    {CONFIG.location}
                                    {localTime && (
                                        <span className="contact__card-meta">
                                            {" "}
                                            · {localTime} local time
                                        </span>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="contact__links contact__reveal" style={{ "--delay": "400ms" }}>
                        
                        <a    href={CONFIG.resumeUrl}
                            className="contact__resume"
                            download={CONFIG.resumeFileName}
                        >
                            <i className="uil uil-file-download-alt" aria-hidden="true"></i>
                            Download Resume
                        </a>

                        {SOCIALS.map((social) => (
                            
                            <a    key={social.label}
                                href={social.href}
                                className="contact__social"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit my ${social.label} profile`}
                            >
                                <i className={`uil ${social.icon}`} aria-hidden="true"></i>
                                <span>{social.label}</span>
                                <i
                                    className="uil uil-arrow-up-right contact__social-arrow"
                                    aria-hidden="true"
                                ></i>
                            </a>
                        ))}
                    </div>
                </div>

                {/* ============ RIGHT: FORM ============ */}
                <div
                    className="contact__form-card contact__reveal"
                    style={{ "--delay": "200ms" }}
                    onPointerMove={handlePointerMove}
                >
                    {sent ? (
                        <div
                            className="contact__success"
                            ref={successRef}
                            tabIndex={-1}
                            role="status"
                            aria-live="polite"
                        >
                            <svg
                                className="contact__success-icon"
                                viewBox="0 0 52 52"
                                aria-hidden="true"
                            >
                                <circle className="contact__success-circle" cx="26" cy="26" r="24" />
                                <path className="contact__success-check" d="M14 27l8 8 16-17" />
                            </svg>
                            <h3 className="contact__success-title">Message sent!</h3>
                            <p className="contact__success-text">
                                Thanks for reaching out. I'll review your message and get back to
                                you as soon as I can.
                            </p>
                            <button
                                type="button"
                                className="contact__again"
                                onClick={() => setSent(false)}
                            >
                                <i className="uil uil-redo" aria-hidden="true"></i>
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form
                            ref={form}
                            onSubmit={handleSubmit}
                            className="contact__form"
                            noValidate
                            aria-label="Contact form"
                        >
                            <div className="contact__form-head">
                                <h3 className="contact__form-title">Send me a message</h3>
                                <p className="contact__form-sub">
                                    Fields marked with * are required.
                                </p>
                            </div>

                            <fieldset className="contact__fieldset">
                                <legend className="contact__legend">What's this about?</legend>
                                <div className="contact__chips">
                                    {PROJECT_TYPES.map((type) => (
                                        <label key={type} className="contact__chip">
                                            <input
                                                type="radio"
                                                name="project_type"
                                                value={type}
                                                className="contact__chip-input"
                                                checked={projectType === type}
                                                onChange={() => setProjectType(type)}
                                            />
                                            <span>{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>

                            <Field
                                id="contact-name"
                                name="name"
                                label="Full name *"
                                autoComplete="name"
                                value={values.name}
                                error={errors.name}
                                touched={touched.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            <Field
                                id="contact-email"
                                name="email"
                                type="email"
                                label="Email address *"
                                autoComplete="email"
                                value={values.email}
                                error={errors.email}
                                touched={touched.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            <Field
                                as="textarea"
                                id="contact-project"
                                name="project"
                                label="Project details *"
                                rows={6}
                                maxLength={MAX_MESSAGE}
                                value={values.project}
                                error={errors.project}
                                touched={touched.project}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onKeyDown={handleKeyDown}
                            />

                            <div className="contact__meta">
                                <span className="contact__hint">
                                    <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to send
                                </span>
                                <span className={counterClass} aria-live="off">
                                    {messageLength} / {MAX_MESSAGE}
                                </span>
                            </div>

                            {/* Honeypot (hidden from real users) */}
                            <div className="contact__honeypot" aria-hidden="true">
                                <label htmlFor="contact-website">Website</label>
                                <input
                                    id="contact-website"
                                    type="text"
                                    name="website"
                                    tabIndex={-1}
                                    autoComplete="off"
                                />
                            </div>

                            <button
                                type="submit"
                                className="button button--flex contact__submit"
                                disabled={isSubmitting}
                                aria-label={isSubmitting ? "Sending message" : "Send message"}
                            >
                                {isSubmitting ? (
                                    <>
                                        <i
                                            className="uil uil-spinner-alt contact__spinner"
                                            aria-hidden="true"
                                        ></i>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <i
                                            className="uil uil-message contact__submit-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </>
                                )}
                            </button>

                            {status.message && (
                                <div
                                    className={`contact__alert contact__alert--${status.type}`}
                                    role="alert"
                                >
                                    <i className="uil uil-exclamation-triangle" aria-hidden="true"></i>
                                    <span>{status.message}</span>
                                </div>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;