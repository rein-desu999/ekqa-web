import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../Components/layout/Navbar/Navbar";
import Footer from "../Components/layout/Footer/Footer";

import Shop from "../Pages/Shop/Shop";
import Cart from "../Pages/Cart/Cart";
import Contact from "../Pages/Contact/Contact";
import LoginSignup from "../Pages/Login/LoginSignup";
import Empowering_Kids_With_Autism from "../Pages/Home/Empowering_Kids_With_Autism";
import Physical from "../Pages/Physical";
import Digital from "../Pages/Digital";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Empowering_Kids_With_Autism />} />

        <Route path="/shop/*" element={<Shop />} />

        <Route path="/physical" element={<Physical />} />
        <Route path="/digital" element={<Digital />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
