import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Unsubscribe.css";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const Unsubscribe = () => {
  const query = useQuery();
  const prefill = query.get("email") || "";

  const [email, setEmail] = useState(prefill);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) throw new Error(data?.message || "Unsubscribe failed.");

      setMsg(data?.message || "You’ve been unsubscribed.");
    } catch (err) {
      setError(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="unsub">
      <h1 className="unsub-title">Unsubscribe</h1>
      <p className="unsub-subtitle">
        Enter your email to remove it from our newsletter list.
      </p>

      <form className="unsub-form" onSubmit={submit}>
        <label className="unsub-label">
          Email
          <input
            className="unsub-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
            required
          />
        </label>

        <button className="unsub-btn" disabled={loading}>
          {loading ? "Removing..." : "Unsubscribe"}
        </button>
      </form>

      {msg ? <div className="unsub-msg ok">{msg}</div> : null}
      {error ? <div className="unsub-msg err">{error}</div> : null}
    </div>
  );
};

export default Unsubscribe;
