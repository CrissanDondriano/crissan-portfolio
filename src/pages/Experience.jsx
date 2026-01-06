import React from "react";

const Experience = () => {
  return (
    <section className="experience section" id="experience">
      <div className="experience__container container grid">
        <h2 className="section__title">My Experience</h2>

        <div className="experience__information">
          {/* CURRENT JOB */}
          <div className="experience__item">
            <div className="experience__header">
              <h5 className="experience__job">Full-Stack Web Developer</h5>
              <p className="experience__year">2024 — Present</p>
            </div>

            <p className="experience__company">Switchconnect PTY LTD</p>

            <p className="experience__description">
              I develop and maintain full web applications using React, Vue.js,
              Laravel, and MySQL. I handle both frontend and backend
              development, building responsive UI/UX, REST APIs, authentication
              systems, and data-driven features. I collaborate closely with
              teams and clients to deliver modern, scalable, and high-performing
              web solutions.
            </p>
          </div>

          {/* OJT – PROGRAMMER INTERN */}
          <div className="experience__item">
            <div className="experience__header">
              <h5 className="experience__job">Programmer Intern</h5>
              <p className="experience__year">2023</p>
            </div>
            <p className="experience__company">Public Employment Service Office (PESO)</p>
          

            <p className="experience__description">
              Developed “Linang – Living Interactions: Navigating Aquatic and
              Natural Geography,” an educational game aligned with the UN’s
              Sustainable Development Goals (Life Below Water & Life on Land).
              Contributed to programming, UI interaction, and ensuring smooth
              gameplay with efficient resource usage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
