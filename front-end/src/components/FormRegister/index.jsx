import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validateEmail from '../../utils/emailValidator';
import Button from '../Library/Button';
import TextInput from '../Library/TextInput';

function FormRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [canRegister, setCanRegister] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const MIN_NAME = 12;
  const MIN_PASSWORD = 6;

  useEffect(() => {
    if (name.length >= MIN_NAME
      && password.length >= MIN_PASSWORD
      && validateEmail(email)
    ) {
      setCanRegister(true);
    }
  }, [name, email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    if (!response.ok) {
      setError(true);
    } else {
      setError(false);
      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data));
      if (data.role === 'customer') {
        navigate('/customer/products');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div>
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
            placeholder="Digite seu Nome"
            data-testid="common_register__input-name"
            type="text"
            id="user-name"
            label="Name"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
          />
          <TextInput
            data-testid="common_register__input-email"
            type="email"
            id="user-email"
            label="Email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
          <TextInput
            placeholder="********"
            data-testid="common_register__input-password"
            type="password"
            id="user-password"
            label="Password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
          <Button
            type="submit"
            testid="common_register__button-register"
            disabled={ !canRegister }
          >
            CADASTRAR
          </Button>
        </form>
        { error && (
          <div
            className="text-red-500 text-center"
            data-testid="common_register__element-invalid_register"
          >
            Usuário já cadastrado
          </div>
        ) }
      </div>
    </div>
  );
}

export default FormRegister;
