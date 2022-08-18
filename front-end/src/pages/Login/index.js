import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Library/Button';
import TextInput from '../../components/Library/TextInput';
import { userContext } from '../../context/userContext';
import validateEmail from '../../utils/emailValidator';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [canLogin, setCanLogin] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const passwordLenght = 6;
  const navigate = useNavigate();

  const { setUser } = useContext(userContext);

  useEffect(() => {
    if (validateEmail(email) && password.length >= passwordLenght) {
      setCanLogin(true);
    }
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      setInvalidLogin(true);
    } else {
      setInvalidLogin(false);
      const data = await response.json();
      setUser(data);
      if (data.role === 'customer') {
        navigate('/customer/products');
      } if (data.role === 'seller') {
        navigate('/seller/orders');
      } if (data.role === 'administrator') {
        navigate('/admin/manage');
      }
    }
  };

  const redirectToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div>
        <h1 className="text-3xl text-center my-3">DELIVERY APP</h1>
        <form
          onSubmit={ handleSubmit }
          className={ `bg-slate-100 border-2 
          border-slate-300 
          p-4 
          shadow-md
          flex
          flex-col
          gap-3` }
        >
          <TextInput
            id="user-login"
            data-testid="common_login__input-email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
            type="text"
            label="Login"
            placeholder="email@trybeer.com"
          />
          <TextInput
            id="user-password"
            data-testid="common_login__input-password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            type="password"
            label="Senha"
            placeholder="********"
          />
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
            Registrar
          </Button>
        </form>
        { invalidLogin && (
          <div
            className="text-red-500 text-center"
            data-testid="common_login__element-invalid-email"
          >
            Usuário ou senha inválidos
          </div>
        ) }
      </div>
    </div>
  );
}

export default Login;
