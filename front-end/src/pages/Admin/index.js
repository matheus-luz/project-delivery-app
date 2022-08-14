import React, { useEffect, useState } from 'react';
import TextInput from '../../components/Library/TextInput';
import validateEmail from '../../utils/emailValidator';

const inputs = {
  name: '',
  email: '',
  password: '',
  role: 'seller',
};

const URL = 'http://localhost:3001/admin';

const MIN_NAME = 12;
const MIN_PASSWORD = 6;

function Admin() {
  const [adminData, setAdminData] = useState({});
  const [inputsOnChange, setInputsOnChange] = useState(inputs);
  const [userExist, setUserExist] = useState(false);
  const [users, setUsers] = useState([]);
  const [renderUsers, setRenderUsers] = useState(false);

  const getItem = (key) => JSON.parse(localStorage
    .getItem(key)) || [];

  // 1 - Busca as informações do administrador no LocalStorage e armazena no estado 'adminData'.
  // 2 - Modifica o estado de 'renderUsers' para 'true'.
  useEffect(() => {
    (async () => {
      const user = await getItem('user');
      setAdminData(user);
      setRenderUsers(true);
    })();
  }, []);

  // 1 - Caso 'adminData' seja 'true':
  // 1.1 - busca os usuários no banco de dados e amarzena no estado 'users',
  // 1.2 - modifica o estado de 'renderUsers' para 'false'.
  useEffect(() => {
    const getUsers = async () => {
      const data = await fetch(URL, {
        method: 'GET',
        headers: {
          authorization: adminData.token,
        },
      }).then((response) => response.json());
      setUsers(data);
    };
    if (renderUsers) {
      getUsers();
      setRenderUsers(false);
    }
  }, [adminData, setUsers, renderUsers]);

  const handleInputOnChange = ({ target: { name, value } }) => {
    setInputsOnChange((prev) => ({ ...prev, [name]: value }));
  };

  // Verifica se nome ou email já existem no banco de dados.
  const validateResgister = () => {
    const userName = users.map((u) => u.name);
    const userEmail = users.map((u) => u.email);
    const nameExist = userName.includes(inputsOnChange.name);
    const emailExist = userEmail.includes(inputsOnChange.email);
    return nameExist || emailExist;
  };

  // 1 - Caso nome e email não existam no banco de dados:
  // 1.1 - cria um novo usuário,
  // 1.2 - modifica o estado de 'renderUsers' para 'false'.
  // 2 - Do contrário: modifica o estado de 'userExist' para 'true'.
  const handleRegisterBtn = async (e) => {
    e.preventDefault();
    const validate = validateResgister();
    if (!validate) {
      await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: adminData.token,
        },
        body: JSON.stringify(inputsOnChange),
      });
      setRenderUsers(true);
      setUserExist(false);
    } else {
      setUserExist(true);
    }
  };

  // Verifica se o nome, email e senha estão de acordo com as regras.
  const isDelBtnDisabled = () => (
    inputsOnChange.name.length >= MIN_NAME
    && validateEmail(inputsOnChange.email)
    && inputsOnChange.password.length >= MIN_PASSWORD
  );

  // Deleta usuário do banco de dados e modifica o estado de 'renderUsers' para 'true'.
  const handleDeleteBtn = async ({ target: { value } }) => {
    await fetch(URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: adminData.token,
      },
      body: JSON.stringify({ id: Number(value) }),
    });
    setRenderUsers(true);
  };

  return (
    <div style={ { margin: '20px 100px' } }>
      {
        userExist
      && (
        <h1 data-testid="admin_manage__element-invalid-register">Já Registrado</h1>
      )
      }
      <h1>Cadastrar novo usuário</h1>
      <div>
        <form style={ { display: 'flex' } }>
          <TextInput
            data-testid="admin_manage__input-name"
            id="admin_manage__input-name"
            label="Nome"
            name="name"
            onChange={ handleInputOnChange }
            placeholder="Nome e sobrenome"
            type="text"
            value={ inputsOnChange.name }
          />
          <TextInput
            data-testid="admin_manage__input-email"
            id="admin_manage__input-email"
            label="Email"
            name="email"
            onChange={ handleInputOnChange }
            placeholder="seu-email@site.com.br"
            type="text"
            value={ inputsOnChange.email }
          />
          <TextInput
            data-testid="admin_manage__input-password"
            id="admin_manage__input-password"
            label="Senha"
            name="password"
            onChange={ handleInputOnChange }
            placeholder="******"
            type="password"
            value={ inputsOnChange.password }
          />
          <select
            data-testid="admin_manage__select-role"
            name="role"
            onChange={ handleInputOnChange }
            style={ { border: '2px solid black' } }
            value={ inputsOnChange.role }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
          </select>
          <button
            data-testid="admin_manage__button-register"
            disabled={ !isDelBtnDisabled() }
            onClick={ handleRegisterBtn }
            style={ { border: '1px solid black' } }
            type="button"
          >
            Cadastrar
          </button>
        </form>
      </div>
      <h1>Lista de usuários</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          { users.map((e) => (
            <tr
              key={ e.id }
            >
              <td
                data-testid={ `admin_manage__element-user-table-item-number-${e.id}` }
              >
                { e.id }
              </td>
              <td
                data-testid={ `admin_manage__element-user-table-name-${e.id}` }
              >
                { e.name }
              </td>
              <td
                data-testid={ `admin_manage__element-user-table-email-${e.id}` }
              >
                { e.email }
              </td>
              <td
                data-testid={ `admin_manage__element-user-table-role-${e.id}` }
              >
                { e.role === 'customer'
                  ? e.role.replace('customer', 'Cliente')
                  : e.role.replace('seller', 'Vendedor') }
              </td>
              <td>
                <button
                  data-testid={ `admin_manage__element-user-table-remove-${e.id}` }
                  onClick={ handleDeleteBtn }
                  style={ { border: '1px solid black' } }
                  type="button"
                  value={ e.id }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
