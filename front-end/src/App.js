import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CustomerProducts from './pages/CustomerProducts';
import UserContextProvider from './context/userContext';
import MyOrders from './pages/MyOrders';
import Checkout from './pages/Checkout';
import CustomerDetails from './pages/CustomerDetails';
import SellerSales from './pages/Seller';
import SellerDetails from './pages/SellerDetails';
import Admin from './pages/Admin';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/customer/products" element={ <CustomerProducts /> } />
            <Route path="/customer/checkout" element={ <Checkout /> } />
            <Route path="/customer/orders" element={ <MyOrders /> } />
            <Route path="/customer/orders/:id" element={ <CustomerDetails /> } />
            <Route path="/seller/orders" element={ <SellerSales /> } />
            <Route path="/seller/orders/:id" element={ <SellerDetails /> } />
            <Route path="/admin/manage" element={ <Admin /> } />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
