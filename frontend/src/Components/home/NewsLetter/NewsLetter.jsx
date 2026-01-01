import React, { useState } from "react";
import "./NewsLetter.css";
import event1_6 from "../../../assets/Event/1/event1_6.jpg";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" }); // success | error | loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // basic HTML validation
    if (!e.currentTarget.checkValidity()) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    try {
      setStatus({ type: "loading", message: "Submitting..." });

      // Later you’ll create this backend endpoint:
      // - Save email to MongoDB
      // - Send notification email to alyssaaingg@gmail.com
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        let msg = "Something went wrong. Please try again.";
        try {
          const data = await res.json();
          if (data?.message) msg = data.message;
        } catch (_) {}
        throw new Error(msg);
      }

      setStatus({ type: "success", message: "You’re subscribed! 🎉" });
      setEmail("");
      setSubmitted(false);
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Submission failed." });
    }
  };

  return (
    <section className="newsletter">
      <div className="container newsletter-inner">
        <div className="newsletter-left">
          <img src={event1_6} alt="Newsletter" />
        </div>

        <div className="newsletter-right">
          <h2>Get News On Our Next Events and Resource</h2>
          <p>Subscribe to our newsletter and stay updated.</p>

          <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
            <label className="newsletter-label" htmlFor="newsletter-email">
              Email Address
            </label>

            <input
              id="newsletter-email"
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={submitted ? "validated" : ""}
              autoComplete="email"
            />

            <button className="newsletter-btn" type="submit" disabled={status.type === "loading"}>
              {status.type === "loading" ? "Submitting..." : "Subscribe"}
            </button>

            {status.type === "success" ? (
            <p className="newsletter-status is-success" role="status">
                You’re subscribed! 🎉{" "}
                <a href="/unsubscribe" style={{ textDecoration: "underline" }}>
                Unsubscribe
                </a>
            </p>
            ) : null}

          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
