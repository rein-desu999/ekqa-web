import './App.css';
import Event from './Pages/Event';
import Contact from './Pages/Contact';
import Cart from './Pages/Cart';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Physical from './Pages/Physical';
import Digital from './Pages/Digital';
import LoginSignup from './Pages/LoginSignup';
import Navbar from './Components/Navbar/Navbar';
import Empowering_Kids_With_Autism from './Pages/Empowering_Kids_With_Autism';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
{/*import physical_banner from './Components/Assets/banner_physical.png*/}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/home' element={<Empowering_Kids_With_Autism/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path="/physical" element={<Physical />} />
          <Route path="/digital" element={<Digital />} />
          {/*
          <Route index element={<div>Main Shop Context</div>}/>
            <Route path='category' element={<ShopCategory category="shop"/>}/>
            <Route path='product/:productId' element={<Product/>}/> 
          <Route path='/physical' element={<ShopCategory banner={physical_banner} category="physical"/>}/>
          <Route path='/in-person' element={<EventList category="in-person"/>}/>
          */}
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
