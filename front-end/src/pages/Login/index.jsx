import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Library/Button';
import validateEmail from '../../utils/emailValidator';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [canLogin, setCanLogin] = useState(false);
  const passwordLenght = 6;
  const navigate = useNavigate();

  useEffect(() => {
    if (validateEmail(email) && password.length >= passwordLenght) {
      setCanLogin(true);
    }
  }, [email, password]);

  const handleSubmit = async (e) => {
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
        <form onSubmit={ handleSubmit }>
          <label htmlFor="user-login">
            Login
            <input
              id="user-login"
              data-testid="common_login__input-email"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
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
          <Button
            type="submit"
            testid="common_login__button-login"
            disabled={ !canLogin }
          >
            Login
          </Button>
          <Button
            type="button"
            color="tertiary"
            testid="common_login__button-register"
            onClick={ redirectToRegister }
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
