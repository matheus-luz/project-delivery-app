import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CustomerProducts from './pages/CustomerProducts';
import UserContextProvider from './context/userContext';
import MeusPedidos from './pages/MeusPedidos';
import Checkout from './pages/Checkout';
import DetalhesPedido from './pages/DetalhesPedido';
import SallerSales from './pages/Saller';
import SallerDetails from './pages/Saller/Details';
import SaleStatusUpdate from './pages/Saller/Details/Status';
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
            <Route path="/customer/orders" element={ <MeusPedidos /> } />
            <Route path="/customer/orders/:id" element={ <DetalhesPedido /> } />
            <Route path="/saller/orders" element={ <SallerSales /> } />
            <Route path="/saller/orders/:id" element={ <SallerDetails /> } />
            <Route path="/saller/orders/update/:id" element={ <SaleStatusUpdate /> } />
            <Route path="/admin/manage" element={ <Admin /> } />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>

    </div>
  );
}

export default App;
