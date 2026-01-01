import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin_token");
    navigate("/login");
  };

  return (
    <div className="dash">
      <aside className="dash-sidebar">
        <div className="dash-brand" onClick={() => navigate("/home")} role="button" tabIndex={0}>
          EKQA Dashboard
        </div>

        <nav className="dash-nav">
          <NavLink to="/dashboard/admin/subscribers" className="dash-link">
            Subscribers
          </NavLink>
          {/* later: analytics, traffic, etc */}
          <NavLink to="/dashboard/admin/analytics" className="dash-link">
            Analytics
          </NavLink>
        </nav>


        <div className="dash-spacer" />
        <button className="dash-logout" onClick={logout}>
          Log out
        </button>
      </aside>

      <main className="dash-main">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
