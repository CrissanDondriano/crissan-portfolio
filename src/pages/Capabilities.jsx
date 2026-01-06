import React from "react";

const Capabilities = () => {
    const skills = [
        { name: "HTML", icon: "uil uil-html5" },
        { name: "CSS", icon: "uil uil-css3-simple" },
        { name: "JavaScript", icon: "uil uil-java-script" },
        { name: "TypeScript", icon: "uil uil-brackets-curly" },

        { name: "React.js", icon: "uil uil-react" },
        { name: "Vue.js", icon: "uil uil-vuejs" },

        { name: "PHP", icon: "uil uil-php" },
        { name: "Laravel", icon: "uil uil-laravel" },

        { name: "GraphQL", icon: "uil uil-database-alt" },
        { name: "MySQL", icon: "uil uil-database" },

        { name: "Python", icon: "uil uil-python" },
        { name: "Java", icon: "uil uil-java" },
        { name: "C", icon: "uil uil-brackets-curly" },
        { name: "C++", icon: "uil uil-brackets-curly" },

        { name: "Bootstrap", icon: "uil uil-bootstrap" },
        { name: "Git", icon: "uil uil-github-alt" },

        { name: "UI/UX Design", icon: "uil uil-palette" },
        { name: "Responsive Design", icon: "uil uil-mobile-android" },

        { name: "API Development", icon: "uil uil-exchange" }
    ];

  return (
    <section className="capabilities section" id="capabilities">
      <div className="capabilities__container container grid">
        <h2 className="section__title">My Capabilities</h2>

        <div className="capabilities__information">
          <p className="capabilities__description">
            I’m continuously expanding my skill set to stay adaptable and
            deliver better solutions. I’m committed to learning new
            technologies, improving my craft, and keeping my capabilities
            aligned with modern industry standards.
          </p>
          
          <div className="capabilities__skills">
            {skills.map((skill, index) => (
              <div key={index} className="skill__badge">
                <i className={skill.icon}></i>
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
