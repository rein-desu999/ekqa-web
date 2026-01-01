import React from "react";
import "./Our_team.css";

// Images
import alyssaImg from "../../assets/team/alyssa.jpg";
import hoanhImg from "../../assets/team/hoanh.jpg";

const Our_team = () => {
  return (
    <section className="section team">
      <div className="container team-inner">
        <header className="team-header">
          <h1>Our Team</h1>
          <p className="team-intro">
            A small but dedicated team working together to support and empower
            children with autism.
          </p>
        </header>

        {/* Founder (top of hierarchy) */}
        <div className="team-founder">
          <div className="team-card leader team-person">
            <div className="team-photoWrap">
              <img
                className="team-photo"
                src={alyssaImg}
                alt="Alyssa Ing"
                loading="lazy"
              />
            </div>

            {/* Only name + role */}
            <p className="team-name">Alyssa Ing</p>
            <p className="team-role">Founder</p>
          </div>
        </div>

        {/* Team members */}
        <div className="team-branch">
          <div className="team-card team-person">
            <div className="team-photoWrap">
              <img
                className="team-photo"
                src={hoanhImg}
                alt="Boi Hoanh Lam"
                loading="lazy"
              />
            </div>

            {/* Only name + role */}
            <p className="team-name">Boi Hoanh Lam</p>
            <p className="team-role">Website Manager</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Our_team;
