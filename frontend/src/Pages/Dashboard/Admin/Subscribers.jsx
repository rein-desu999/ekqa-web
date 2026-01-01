import React, { useEffect, useMemo, useState } from "react";
import "./Subscribers.css";

const Subscribers = () => {
  const [loading, setLoading] = useState(true);
  const [subscribers, setSubscribers] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("admin_token");

  const fetchSubs = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/subscribers", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) throw new Error("Unauthorized. Please log in again.");

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Failed to load subscribers.");
      }

      const data = await res.json();
      setSubscribers(data.subscribers || []);
    } catch (e) {
      setError(e.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyAll = async () => {
    const emails = subscribers.map((s) => s.email).join("\n");
    await navigator.clipboard.writeText(emails);
    alert("Copied all emails to clipboard!");
  };

  const downloadCsv = async () => {
    const res = await fetch("/api/admin/subscribers.csv", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      alert("CSV download failed.");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  const deleteSubscriber = async (id, email) => {
    const ok = window.confirm(`Delete subscriber?\n\n${email}`);
    if (!ok) return;

    setError("");
    try {
      const res = await fetch(`/api/admin/subscribers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) throw new Error("Unauthorized. Please log in again.");

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Delete failed.");
      }

      // optimistic UI update
      setSubscribers((prev) => prev.filter((s) => s._id !== id));
    } catch (e) {
      setError(e.message || "Error");
    }
  };

  const count = useMemo(() => subscribers.length, [subscribers]);

  return (
    <div className="subs">
      <div className="subs-header">
        <div>
          <h1 className="subs-title">Subscribers</h1>
          <p className="subs-subtitle">Total: {count}</p>
        </div>

        <div className="subs-actions">
          <button className="subs-btn" onClick={fetchSubs} disabled={loading}>
            Refresh
          </button>
          <button className="subs-btn" onClick={copyAll} disabled={!count}>
            Copy all
          </button>
          <button className="subs-btn primary" onClick={downloadCsv} disabled={!count}>
            Download CSV
          </button>
        </div>
      </div>

      {error ? <div className="subs-error">{error}</div> : null}

      <div className="subs-tableWrap">
        <table className="subs-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Subscribed</th>
              <th style={{ width: 120 }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="subs-loading">
                  Loading...
                </td>
              </tr>
            ) : count === 0 ? (
              <tr>
                <td colSpan={3} className="subs-empty">
                  No subscribers yet.
                </td>
              </tr>
            ) : (
              subscribers.map((s) => (
                <tr key={s._id}>
                  <td className="subs-email">{s.email}</td>
                  <td>
                    {new Date(s.createdAt).toLocaleString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </td>
                  <td className="subs-actionsCell">
                    <button
                      className="subs-btn danger"
                      onClick={() => deleteSubscriber(s._id, s.email)}
                      title="Delete subscriber"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subscribers;
