import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Products from './pages/Products';
import UserContextProvider from './context/userContext';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/customer/products" element={ <Products /> } />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
