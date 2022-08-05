import React, { useState } from 'react';

function FormRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = false;
  const MIN_NAME = 12;
  const MIN_PASSWORD = 6;
  const emailRegex = /\S+@\S+\.\S+/;

  const onButton = (name.length >= MIN_NAME
    && emailRegex.test(email) && (password.length >= MIN_PASSWORD));
  console.log(name);
  return (
    <section>
      <form>

        <br />
        <p> Name </p>
        <input
          placeholder="Digite seu Nome"
          data-testid="common_register__input-name"
          type="text"
          value={ name }
          onChange={ (e) => setName(e.target.value) }
        />

        <br />

        <p> Email </p>
        <input
          data-testid="common_register__input-email"
          type="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />

        <br />
        <p> Password </p>
        <input
          placeholder="********"
          data-testid="common_register__input-password"
          type="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
        <br />
        <button
          type="button"
          data-testid="common_register__button-register"
          disabled={ !onButton }
        >
          CADASTRAR
        </button>
        {
          error
      && (
        <p data-testid="common_register__element-invalid_register">
          Mensagem de erro

        </p>)
        }
      </form>
    </section>
  );
}

export default FormRegister;
