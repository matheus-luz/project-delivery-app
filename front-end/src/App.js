import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CustomerProducts from './pages/CustomerProducts';
import UserContextProvider from './context/userContext';
import MyOrders from './pages/MyOrders';
import Checkout from './pages/Checkout';
import DetailsOrders from './pages/DetailsOrders';
import SellerSales from './pages/Seller';
import SellerDetails from './pages/Seller/Details';
import SaleStatusUpdate from './pages/Seller/Details/Status';
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
            <Route path="/customer/orders" element={ <MyOrders /> } />
            <Route path="/customer/orders/:id" element={ <DetailsOrders /> } />
            <Route path="/seller/orders" element={ <SellerSales /> } />
            <Route path="/seller/orders/:id" element={ <SellerDetails /> } />
            <Route path="/seller/orders/update/:id" element={ <SaleStatusUpdate /> } />
            <Route path="/admin/manage" element={ <Admin /> } />
          </Routes>
        </CartContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
