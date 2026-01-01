import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../LoginSignup.css";

const strongPasswordOk = (pw) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(pw);

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const prefillEmail = query.get("email") || "";

  const [email, setEmail] = useState(prefillEmail);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const [status, setStatus] = useState({ type: "", message: "" });

  const submit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    if (!strongPasswordOk(password)) {
      setStatus({
        type: "error",
        message:
          "Password must be 8+ chars and include uppercase, lowercase, number, and special character.",
      });
      return;
    }

    setStatus({ type: "loading", message: "Updating password..." });

    const res = await fetch("/api/auth/password/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code, newPassword: password }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      setStatus({ type: "error", message: data?.message || "Reset failed." });
      return;
    }

    setStatus({ type: "success", message: "Password updated! You can log in now." });
    setTimeout(() => navigate("/login"), 400);
  };

  return (
    <div className="auth">
      <div className="auth-card">
        <h1 className="auth-title">Reset password</h1>

        <form className="auth-form" onSubmit={submit}>
          <label className="auth-label">
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>

          <label className="auth-label">
            6-digit code
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              inputMode="numeric"
              placeholder="123456"
              required
            />
          </label>

          <label className="auth-label">
            New password
            <div className="auth-password">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" className="auth-eye" onClick={() => setShow((v) => !v)}>
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <label className="auth-label">
            Confirm new password
            <div className="auth-password">
              <input
                type={show2 ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
              <button type="button" className="auth-eye" onClick={() => setShow2((v) => !v)}>
                {show2 ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <button className="auth-btn" disabled={status.type === "loading"}>
            {status.type === "loading" ? "Saving..." : "Save new password"}
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

export default ResetPassword;
