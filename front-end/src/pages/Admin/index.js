import React, { useEffect, useState } from 'react';

const inputs = {
  name: '',
  email: '',
  password: '',
  role: 'seller',
};

const URL = 'http://localhost:3001/admin';

function Admin() {
  const [adminData, setAdminData] = useState({});
  const [inputsOnChange, setInputsOnChange] = useState(inputs);
  const [renderUsers, setRenderUsers] = useState(false);
  const [users, setUsers] = useState([]);

  const getItem = (key) => JSON.parse(localStorage
    .getItem(key)) || [];

  useEffect(() => {
    const getAdmin = async () => {
      const user = await getItem('user');
      setAdminData(user);
      setRenderUsers(true);
    };
    getAdmin();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          authorization: adminData.token,
        },
      });
      const data = await response.json();
      setUsers(data);
    };
    if (renderUsers) {
      getUsers();
      setRenderUsers(false);
    }
  }, [adminData, setUsers, renderUsers]);

  console.log(users);

  const handleInputOnChange = ({ target: { name, value } }) => {
    setInputsOnChange((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterBtn = async (e) => {
    e.preventDefault();
    await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: adminData.token,
      },
      body: JSON.stringify(inputsOnChange),
    });
    setRenderUsers(true);
  };

  const handleDeleteBtn = async ({ target: { value } }) => {
    console.log(value);
    const id = { id: Number(value) };
    console.log(id);
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
      <h1>Cadastrar novo usuário</h1>
      <div>
        <form>
          <input
            name="name"
            onChange={ handleInputOnChange }
            placeholder="Nome e sobrenome"
            // eslint-disable-next-line sonarjs/no-duplicate-string
            style={ { border: '1px solid black' } }
            type="text"
            value={ inputsOnChange.name }
          />
          <input
            name="email"
            onChange={ handleInputOnChange }
            placeholder="seu-email@site.com.br"
            style={ { border: '1px solid black' } }
            type="text"
            value={ inputsOnChange.email }
          />
          <input
            name="password"
            onChange={ handleInputOnChange }
            placeholder="******"
            style={ { border: '1px solid black' } }
            type="password"
            value={ inputsOnChange.password }
          />
          <select
            name="role"
            onChange={ handleInputOnChange }
            style={ { border: '1px solid black' } }
            value={ inputsOnChange.role }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
          </select>
          <button
            onClick={ handleRegisterBtn }
            style={ { border: '1px solid black' } }
            type="button"
          >
            Cadastrar
          </button>
        </form>
      </div>
      <h1>Lista de usuários</h1>
      <div>
        { users.map((e, index) => (
          <div
            key={ `user-${e.name}` }
            style={ { display: 'flex' } }
          >
            <h1>{ index + 1}</h1>
            <h1>{ e.name }</h1>
            <h1>{ e.email }</h1>
            <h1>{ e.role }</h1>
            <button
              onClick={ handleDeleteBtn }
              style={ { border: '1px solid black' } }
              type="button"
              value={ e.id }
            >
              Excluir
            </button>
          </div>
        )) }
      </div>
    </div>
  );
}

export default Admin;
