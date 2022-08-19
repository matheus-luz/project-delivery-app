import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CustomerProducts from './pages/CustomerProducts';
import UserContextProvider from './context/userContext';
import CheckoutOrders from './pages/Customer';
import Checkout from './pages/Checkout';
import CustomerDetails from './pages/CustomerDetails';
import SellerSales from './pages/Seller';
import SellerDetails from './pages/SellerDetails';
import Admin from './pages/Admin';
import CartContextProvider from './context/cartContext';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <CartContextProvider>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/customer/products" element={ <CustomerProducts /> } />
            <Route path="/customer/checkout" element={ <Checkout /> } />
            <Route path="/customer/orders" element={ <CheckoutOrders /> } />
            <Route path="/customer/orders/:id" element={ <CustomerDetails /> } />
            <Route path="/seller/orders" element={ <SellerSales /> } />
            <Route path="/seller/orders/:id" element={ <SellerDetails /> } />
            <Route path="/admin/manage" element={ <Admin /> } />
          </Routes>
        </CartContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
