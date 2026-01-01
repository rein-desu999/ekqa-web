import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../../app/Reveal";

import NewsLetter from "../../Components/home/NewsLetter/NewsLetter";
import "./Home.css";

import event1_7 from "../../assets/Event/1/event1_7.jpg";
import event1_8 from "../../assets/Event/1/event1_8.jpg";

// ✅ Founder image (make sure this file exists in your repo)
import alyssaImg from "../../assets/team/alyssa.jpg";

const Empowering_Kids_With_Autism = () => {
  // Different animation for Founder section (not using <Reveal />)
  const founderRef = useRef(null);
  const [founderInView, setFounderInView] = useState(false);

  useEffect(() => {
    const el = founderRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFounderInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="home">
      {/* HERO */}
      <section className="home-hero">
        <div className="container home-hero-inner">
          <div className="home-hero-left">
            <p className="home-kicker">Empowering Kids With Autism • 501(c)(3)</p>
            <h1 className="home-title">
              Raising awareness & supporting children with autism.
            </h1>
            <p className="home-subtitle">
              We raise awareness for children with autism and support Children’s
              Hospital Los Angeles’ Autism Department—building a more inclusive
              community through advocacy and action.
            </p>

            <div className="home-cta">
              <Link className="btn btn-primary" to="/event">
                Explore events
              </Link>
              <a className="btn btn-outline" href="#support">
                Support our mission
              </a>
            </div>

            <div className="home-badges">
              <span className="badge">Supporting CHLA Autism Department</span>
              <span className="badge">Community-led advocacy</span>
            </div>
          </div>

          <div className="home-hero-right">
            <img className="home-hero-image" src={event1_7} alt="Community event" />
          </div>
        </div>
      </section>

      {/* MISSION */}
      <Reveal>
        <section
          className="home-section mission-bg"
          style={{ backgroundImage: `url(${event1_8})` }}
        >
          <div className="container">
            <h2 className="home-h2">Our mission</h2>
            <p className="home-text">
              The purpose of our organization is to{" "}
              <span className="accent">raise awareness</span> for children with
              autism and support{" "}
              <span className="accent">
                Children’s Hospital Los Angeles’ Autism Department
              </span>
              . We aim to inspire others to recognize the{" "}
              <span className="accent">potential in every child</span>,
              regardless of their neurological differences, and work together
              towards a more<span className="accent"> inclusive society</span>.
              We strive to take initiative and recognize the importance of{" "}
              <span className="accent">advocacy</span> to support neurodiverse
              communities.
            </p>

            <div className="home-cards">
              <div className="card">
                <h3>Raise awareness</h3>
                <p>
                  We share stories, resources, and community education to reduce
                  stigma and increase understanding.
                </p>
              </div>
              <div className="card">
                <h3>Advocate</h3>
                <p>
                  We promote inclusion and encourage action that supports
                  neurodiverse kids and families.
                </p>
              </div>
              <div className="card">
                <h3>Support CHLA</h3>
                <p>
                  We uplift and support Children’s Hospital Los Angeles’ Autism
                  Department through community-driven initiatives.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* FOUNDER (new section + different animation) */}
      <section className="home-section section-white">
        <div
          ref={founderRef}
          className={`container founder ${founderInView ? "is-in" : ""}`}
        >
          <div className="founder-media founder-anim founder-anim--img">
            <img
              className="founder-img"
              src={alyssaImg}
              alt="Alyssa Ing, Founder and President"
              loading="lazy"
            />
          </div>

          <div className="founder-content founder-anim founder-anim--text">
            <p className="home-kicker">Our Founder & President</p>
            <h2 className="home-h2 founder-title">Alyssa Ing</h2>
            <p className="founder-sub">
              UCLA undergraduate • Molecular Biology
            </p>

            <div className="founder-card">
              <h3 className="founder-h3">How it started</h3>
              <p className="home-text founder-text">
                While working on a Capstone research project, Alyssa studied how
                negative portrayals of autism in media can shape children’s
                attitudes and understanding. As she looked for resources to
                share with families in her community, she noticed a gap—there
                simply weren’t enough accessible, kid-friendly supports.
              </p>
              <p className="home-text founder-text">
                That experience became the spark for{" "}
                <span className="accent">Empowering Kids With Autism</span>: a
                nonprofit built to raise awareness, uplift neurodiverse kids,
                and connect families to meaningful support through advocacy,
                education, and community action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORT / DONATE (white bg) */}
      <Reveal>
        <section id="support" className="home-section section-white">
          <div className="container support">
            <div>
              <h2 className="home-h2">Support our work</h2>
              <p className="home-text">
                We’re new—and every bit of support helps us grow our impact.
                Right now you can help by attending events, sharing resources,
                or supporting our cause through our shop.
              </p>

              <div className="home-cta">
                <Link className="btn btn-primary" to="/shop">
                  Visit the shop
                </Link>
                <button className="btn btn-outline" disabled title="Coming soon">
                  Donate (coming soon)
                </button>
              </div>
            </div>

            <div className="support-note">
              <p className="support-title">Donation feature</p>
              <p className="support-text">
                Donations will be enabled in a future update. For now, the shop
                is the best way to support.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* EVENTS PREVIEW (white bg) */}
      <Reveal>
        <section className="home-section section-white">
          <div className="container">
            <div className="events-header">
              <h2 className="home-h2">Past events</h2>
              <Link className="link" to="/event">
                See all
              </Link>
            </div>

            <div className="events-grid">
              <Link className="event-card" to="/event">
                <img src={event1_7} alt="Community event" />
                <div className="event-overlay" />
                <div className="event-meta">
                  <p className="event-title">Walk-A-Thon</p>
                  <p className="event-date">Oct 8, 2024</p>
                </div>
              </Link>

              <Link className="event-card" to="/event">
                <img src={event1_7} alt="Community event" />
                <div className="event-overlay" />
                <div className="event-meta">
                  <p className="event-title">Awareness Booth</p>
                  <p className="event-date">April 6, 2025</p>
                </div>
              </Link>

              <Link className="event-card" to="/event">
                <img src={event1_7} alt="Community event" />
                <div className="event-overlay" />
                <div className="event-meta">
                  <p className="event-title">School Capstone Showcase</p>
                  <p className="event-date">March 12, 2025</p>
                </div>
              </Link>

              <Link className="event-card" to="/event">
                <img src={event1_7} alt="Community event" />
                <div className="event-overlay" />
                <div className="event-meta">
                  <p className="event-title">Community Meet-up</p>
                  <p className="event-date">February 2, 2025</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* divider between Past Events and Newsletter */}
      <div className="section-divider" />

      {/* NEWSLETTER */}
      <NewsLetter />
    </div>
  );
};

export default Empowering_Kids_With_Autism;
