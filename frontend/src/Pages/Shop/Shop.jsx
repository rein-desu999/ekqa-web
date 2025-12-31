import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from '../../Components/home/Hero/Hero';
import Popular from '../../Components/home/Popular/Popular';
import Collections from '../../Components/home/Collections/Collections';
import ShopCategory from './ShopCategory';
import Product from '../Product/Product';

const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Collections />
      <Routes>
        <Route path="physical" element={<ShopCategory category="physical" />} />
        <Route path="digital" element={<ShopCategory category="digital" />} />
        <Route path="product/:productId" element={<Product />} />
      </Routes>
    </div>
  );
};

export default Shop;
