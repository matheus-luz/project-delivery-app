import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validateEmail from '../../utils/emailValidator';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [canLogin, setCanLogin] = useState(false);
  const passwordLenght = 6;
  const navigate = useNavigate();

  useEffect(() => {
    if (validateEmail(username) && password.length >= passwordLenght) {
      setCanLogin(true);
    }
  }, [username, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const redirectToRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <div>
        <div>Imagem</div>
        <h1>Nome do aplicativo</h1>
        <form>
          <label htmlFor="user-login">
            Login
            <input
              id="user-login"
              data-testid="common_login__input-email"
              value={ username }
              onChange={ (e) => setUsername(e.target.value) }
              type="text"
              placeholder="email@trybeer.com"
            />
          </label>
          <label htmlFor="user-password">
            Senha
            <input
              id="user-password"
              data-testid="common_login__input-password"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
              type="password"
              placeholder="********"
            />
          </label>
          <button
            type="submit"
            data-testid="common_login__button-login"
            disabled={ !canLogin }
            onClick={ handleSubmit }
          >
            Login
          </button>
          <button
            type="button"
            data-testid="common_login__button-register"
            onClick={ redirectToRegister }
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
