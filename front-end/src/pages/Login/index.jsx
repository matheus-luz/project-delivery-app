import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Library/Button';
import TextInput from '../../components/Library/TextInput';
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
    <div className="flex items-center justify-center h-screen w-screen">
      <div>
        <div>Imagem</div>
        <h1 className="text-3xl text-center my-3">APP</h1>
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
      </div>
    </div>
  );
}

export default Login;
