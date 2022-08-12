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
          </Routes>
        </BrowserRouter>
      </UserContextProvider>

    </div>
  );
}

export default App;
