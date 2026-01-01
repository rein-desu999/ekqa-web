import React from "react";
import "./Analytics.css";

const LOOKER_EMBED_URL = "https://lookerstudio.google.com/embed/reporting/ebdf4cdc-c512-403e-9b3e-c1ad054626a8/page/Zs6jF";

const Analytics = () => {
  return (
    <div className="dash-analytics">
      <div className="dash-analytics-header">
        <div>
          <h1 className="dash-analytics-title">Analytics</h1>
          <p className="dash-analytics-subtitle">
            Google Analytics (via Looker Studio)
          </p>
        </div>

        <a
          className="dash-analytics-link"
          href={LOOKER_EMBED_URL}
          target="_blank"
          rel="noreferrer"
        >
          Open in new tab
        </a>
      </div>

      <p className="dash-analytics-note">
        Some browsers block Google cookies inside embedded reports.
        If the report doesn’t load, click <strong>Open in new tab</strong>.
      </p>

      <div className="dash-analytics-frameWrap">
        <iframe
          title="EKQA Analytics"
          src={LOOKER_EMBED_URL}
          className="dash-analytics-frame"
          frameBorder="0"
          allow="clipboard-read; clipboard-write"
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Analytics;
