import React, { useEffect, useState } from 'react';
import FormAdmin from '../../components/Admin/FormAdmin';
import TableUser from '../../components/Admin/TableUser';
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

  // 1 - Caso 'renderUsers' seja 'true':
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
  // 1.2 - modifica o estado de 'renderUsers' para 'true',
  // 1.3 - modifica o estado de 'userExist' para 'false' e limpa os inputs.
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
      setInputsOnChange(inputs);
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
    <>
      {/* Falta implementar o header */}
      <h1>Header</h1>
      <div style={ { margin: '20px 100px' } }>
        { userExist && (
          <h1 data-testid="admin_manage__element-invalid-register">Já Registrado</h1>
        ) }
        <h1>Cadastrar novo usuário</h1>
        <FormAdmin
          handleInputOnChange={ handleInputOnChange }
          handleRegisterBtn={ handleRegisterBtn }
          isDelBtnDisabled={ isDelBtnDisabled }
          inputsOnChange={ inputsOnChange }
        />
        <h1>Lista de usuários</h1>
        <TableUser
          handleDeleteBtn={ handleDeleteBtn }
          users={ users }
        />
      </div>
    </>
  );
}

export default Admin;
