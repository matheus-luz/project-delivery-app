import PropTypes from 'prop-types';
import { useEffect, useContext, useState } from 'react';
import { userContext } from '../../context/userContext';
import validateEmail from '../../utils/emailValidator';
import TextInput from '../Library/TextInput';

function FormAdmin({ getUsers }) {
  const [exist, setExist] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const MIN_NAME = 12;
  const MIN_PASSWORD = 6;

  const { user } = useContext(userContext);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  useEffect(() => {
    if (form.name.length >= MIN_NAME
      && form.password.length >= MIN_PASSWORD
      && validateEmail(form.email)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [form.name, form.password, form.email]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: user.token,
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        console.log('User already exists');
        setExist(true);
      } else {
        setExist(false);
        setForm({
          name: '',
          email: '',
          password: '',
          role: 'customer',
        });
      }
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {exist && (
        <div
          className="alert alert-danger"
          role="alert"
          data-testid="admin_manage__element-invalid-register"
        >
          Usuário já existe
        </div>
      )}

      <form style={ { display: 'flex' } } onSubmit={ onSubmit }>
        <TextInput
          data-testid="admin_manage__input-name"
          id="admin_manage__input-name"
          label="Nome"
          name="name"
          onChange={ (e) => { setForm({ ...form, name: e.target.value }); } }
          placeholder="Nome e sobrenome"
          type="text"
          value={ form.name }
        />
        <TextInput
          data-testid="admin_manage__input-email"
          id="admin_manage__input-email"
          label="Email"
          name="email"
          onChange={ (e) => { setForm({ ...form, email: e.target.value }); } }
          placeholder="seu-email@site.com.br"
          type="text"
          value={ form.email }
        />
        <TextInput
          data-testid="admin_manage__input-password"
          id="admin_manage__input-password"
          label="Senha"
          name="password"
          onChange={ (e) => { setForm({ ...form, password: e.target.value }); } }
          placeholder="******"
          type="password"
          value={ form.password }
        />
        <select
          data-testid="admin_manage__select-role"
          name="role"
          onChange={ (e) => { setForm({ ...form, role: e.target.value }); } }
          style={ { border: '2px solid black' } }
          value={ form.role }
        >
          <option value="seller">Vendedor</option>
          <option value="customer">Cliente</option>
        </select>
        <button
          data-testid="admin_manage__button-register"
          disabled={ disabled }
          style={ { border: '1px solid black' } }
          type="submit"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

FormAdmin.propTypes = {
  getUsers: PropTypes.func.isRequired,
};

export default FormAdmin;
