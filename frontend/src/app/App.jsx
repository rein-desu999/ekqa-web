import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "../Components/layout/Navbar/Navbar";
import Footer from "../Components/layout/Footer/Footer";
import PageTransition from "../app/PageTransition";
import RouteAnalytics from "../app/RouteAnalytics";
import Analytics from "../Pages/Dashboard/Admin/Analytics";

import Shop from "../Pages/Shop/Shop";
import Cart from "../Pages/Cart/Cart";
import Contact from "../Pages/Contact/Contact";
import LoginSignup from "../Pages/Login/LoginSignup";
import Empowering_Kids_With_Autism from "../Pages/Home/Empowering_Kids_With_Autism";
import Physical from "../Pages/Physical";
import Digital from "../Pages/Digital";
import Our_team from "../Pages/Team/Our_team";


import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import Subscribers from "../Pages/Dashboard/Admin/Subscribers";
import Unsubscribe from "../Pages/Unsubscribe/Unsubscribe";
import ProtectedRoute from "../Pages/Dashboard/ProtectedRoute";

import ForgotPassword from "../Pages/Login/ForgotPassword/ForgotPassword";
import ResetPassword from "../Pages/Login/ForgotPassword/ResetPassword";
function AppShell() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Navbar />}
      <RouteAnalytics />
      <Routes>
        <Route
          path="/"
          element={
            <PageTransition>
              <Navigate to="/home" replace />
            </PageTransition>
          }
        />
        <Route
          path="/home"
          element={
            <PageTransition>
              <Empowering_Kids_With_Autism />
            </PageTransition>
          }
        />

        <Route
          path="/shop/*"
          element={
            <PageTransition>
              <Shop />
            </PageTransition>
          }
        />

        <Route
          path="/physical"
          element={
            <PageTransition>
              <Physical />
            </PageTransition>
          }
        />
        <Route
          path="/digital"
          element={
            <PageTransition>
              <Digital />
            </PageTransition>
          }
        />
        <Route
          path="/our_team"
          element={
            <PageTransition>
              <Our_team />
            </PageTransition>
          }
        />

        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
        <Route
          path="/unsubscribe"
          element={
            <PageTransition>
              <Unsubscribe />
            </PageTransition>
          }
        />
        <Route
          path="/cart"
          element={
            <PageTransition>
              <Cart />
            </PageTransition>
          }
        />

        <Route
          path="/login"
          element={
            <PageTransition>
              <LoginSignup />
            </PageTransition>
          }
        />
        <Route path="/login/forgot-password" element={<ForgotPassword />} />
        <Route path="/login/reset-password" element={<ResetPassword />} />

        {/* PROTECTED DASHBOARD */}
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="admin/subscribers" element={<Subscribers />} />
            <Route path="admin" element={<Navigate to="/dashboard/admin/subscribers" replace />} />
            <Route path="admin/analytics" element={<Analytics />} />
          </Route>
          
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

      {!isDashboard && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
