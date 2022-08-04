import React from 'react';

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <a href="/register">
        <input
          data-testid="common_login__button-register"
          type="button"
          value="Ainda não tenho conta"
        />
      </a>
    </div>
  );
}

export default Login;
