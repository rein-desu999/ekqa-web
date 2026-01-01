import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import './index.css';
import App from './app/App.jsx';
import ShopContextProvider from './Context/ShopContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </HashRouter>
);
