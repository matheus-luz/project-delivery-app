import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <a href="/register">
      <input type="button" value="Botão de cadastro"/>
      </a>
    </div>
  );
}

export default Login;
