import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../LoginSignup.css"; // reuse same styling

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending code..." });

    const res = await fetch("/api/auth/password/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      setStatus({ type: "error", message: data?.message || "Failed to send code." });
      return;
    }

    setStatus({ type: "success", message: "If the email exists, a code was sent." });

    setTimeout(() => navigate(`/login/reset-password?email=${encodeURIComponent(email)}`), 300);
  };

  return (
    <div className="auth">
      <div className="auth-card">
        <h1 className="auth-title">Forgot password</h1>

        <form className="auth-form" onSubmit={submit}>
          <label className="auth-label">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </label>

          <button className="auth-btn" disabled={status.type === "loading"}>
            {status.type === "loading" ? "Sending..." : "Send 6-digit code"}
          </button>

          {status.message ? (
            <p
              className={`auth-status ${
                status.type === "error" ? "is-error" : status.type === "success" ? "is-success" : ""
              }`}
              role="status"
            >
              {status.message}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
