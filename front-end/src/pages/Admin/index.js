import React, { useCallback, useContext, useEffect, useState } from 'react';
import FormAdmin from '../../components/Admin/FormAdmin';
import TableUser from '../../components/Admin/TableUser';
import Header from '../../components/Header';
import HeaderButton from '../../components/Header/HeaderButton';
import { userContext } from '../../context/userContext';

function Admin() {
  const [users, setUsers] = useState([]);

  const { user } = useContext(userContext);

  const getUsers = useCallback(
    async () => {
      const response = await fetch('/api/admin', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: user.token,
        },
      });
      const data = await response.json();
      setUsers(data);
      console.log('getusers');
    },
    [user.token],
  );

  useEffect(() => {
    if (user.token) getUsers();
  }, [setUsers, user.token, getUsers]);

  const handleDelete = async (id) => {
    await fetch('/api/admin', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: user.token,
      },
      body: JSON.stringify({ id }),
    });
    getUsers();
  };

  return (
    <>
      <Header>
        <HeaderButton
          to=""
          label="GERENCIAR USUÁRIO"
          testid="customer_products__element-navbar-link-products"
        />
      </Header>
      <div style={ { margin: '20px 100px' } }>
        <h1>Cadastrar novo usuário</h1>
        <FormAdmin getUsers={ getUsers } />
        <h1>Lista de usuários</h1>
        {users && users.length > 0 && (
          <TableUser
            users={ users }
            handleDelete={ handleDelete }
          />
        )}
      </div>
    </>
  );
}

export default Admin;
