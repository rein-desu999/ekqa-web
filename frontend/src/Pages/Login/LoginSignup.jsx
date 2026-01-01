import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";

const strongPasswordOk = (pw) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(pw);

const LoginSignup = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // "login" | "signup"

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [agree, setAgree] = useState(false); // signup only
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true); // signup only

  const [showPassword, setShowPassword] = useState(false);

  const [status, setStatus] = useState({ type: "", message: "" });

  const isSignup = useMemo(() => mode === "signup", [mode]);

  const switchMode = (next) => {
    setMode(next);
    setStatus({ type: "", message: "" });
    setPassword("");
    setShowPassword(false);

    if (next === "signup") {
      setAgree(false);
      setSubscribeNewsletter(true);
    } else {
      setFirstName("");
      setLastName("");
      setAgree(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // signup validations
    if (isSignup) {
      if (!agree) {
        setStatus({ type: "error", message: "Please agree to the terms to continue." });
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
    }

    try {
      setStatus({ type: "loading", message: isSignup ? "Creating account..." : "Logging in..." });

      // =======================
      // SIGN UP (users only)
      // =======================
      if (isSignup) {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, email, password, subscribeNewsletter }),
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          setStatus({ type: "error", message: data?.message || "Signup failed." });
          return;
        }

        localStorage.setItem("user_token", data.token);
        setStatus({ type: "success", message: "Account created! Logging you in..." });
        setTimeout(() => navigate("/home"), 250);
        return;
      }

      // =======================
      // LOGIN (user → fallback admin)
      // =======================

      // 1) Try USER login
      const resUser = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const dataUser = await resUser.json().catch(() => null);

      if (resUser.ok && dataUser?.token) {
        localStorage.setItem("user_token", dataUser.token);
        setStatus({ type: "success", message: "Logged in! Redirecting..." });
        setTimeout(() => navigate("/home"), 250);
        return;
      }

      // 2) If USER login fails → try ADMIN login
      if (resUser.status === 401) {
        const resAdmin = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const dataAdmin = await resAdmin.json().catch(() => null);

        if (resAdmin.ok && dataAdmin?.token) {
          localStorage.setItem("admin_token", dataAdmin.token);
          setStatus({ type: "success", message: "Admin login successful! Redirecting..." });
          setTimeout(() => navigate("/dashboard/admin/subscribers"), 250);
          return;
        }
      }

      setStatus({ type: "error", message: dataUser?.message || "Invalid email or password." });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Request failed." });
    }
  };

  return (
    <div className="auth">
      <div className="auth-card">
        <div className="auth-head">
          <h1 className="auth-title">{isSignup ? "Create Account" : "Login"}</h1>

          <div className="auth-tabs" role="tablist" aria-label="Auth mode">
            <button
              type="button"
              className={`auth-tab ${!isSignup ? "active" : ""}`}
              onClick={() => switchMode("login")}
            >
              Login
            </button>
            <button
              type="button"
              className={`auth-tab ${isSignup ? "active" : ""}`}
              onClick={() => switchMode("signup")}
            >
              Sign up
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignup ? (
            <div className="auth-grid2">
              <label className="auth-label">
                First name
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  autoComplete="given-name"
                  placeholder="First name"
                />
              </label>

              <label className="auth-label">
                Last name
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  autoComplete="family-name"
                  placeholder="Last name"
                />
              </label>
            </div>
          ) : null}

          <label className="auth-label">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              placeholder="Email"
            />
          </label>

          <label className="auth-label">
            Password
            <div className="auth-password">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isSignup ? "new-password" : "current-password"}
                required
                placeholder="Password"
              />
              <button
                type="button"
                className="auth-eye"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          {/* SIGNUP ONLY: Terms + Newsletter */}
          {isSignup ? (
            <>
              <div className="auth-agree">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  id="agree"
                />
                <label htmlFor="agree">
                  By continuing, I agree to the{" "}
                  <a className="auth-link" href="/faq">
                    terms of use & privacy policy
                  </a>
                </label>
              </div>

              <div className="auth-agree">
                <input
                  type="checkbox"
                  checked={subscribeNewsletter}
                  onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                  id="newsletter"
                />
                <label htmlFor="newsletter">Sign me up for the newsletter</label>
              </div>

              <p className="auth-footnote" style={{ marginTop: 20, marginBottom: 20 }}>
                Password must be 8+ chars with uppercase, lowercase, number, and special character.
              </p>
            </>
          ) : null}

          <button className="auth-btn" type="submit" disabled={status.type === "loading"}>
            {status.type === "loading"
              ? isSignup
                ? "Creating..."
                : "Logging in..."
              : isSignup
              ? "Create account"
              : "Continue"}
          </button>

          {!isSignup ? (
            <button
              type="button"
              className="auth-linkBtn"
              onClick={() => navigate("/login/forgot-password")}
            >
              Forgot your password?
            </button>
          ) : null}

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

export default LoginSignup;
