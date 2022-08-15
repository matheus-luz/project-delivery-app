import PropTypes from 'prop-types';

function TableUser(props) {
  const { users, handleDelete } = props;

  return (
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
        { users.map((e, index) => (
          <tr
            key={ e.id }
          >
            <td
              data-testid={ `admin_manage__element-user-table-item-number-${index}` }
            >
              { e.id }
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-name-${index}` }
            >
              { e.name }
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-email-${index}` }
            >
              { e.email }
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-role-${index}` }
            >
              { e.role === 'customer'
                ? e.role.replace('customer', 'Cliente')
                : e.role.replace('seller', 'Vendedor') }
            </td>
            <td>
              <button
                data-testid={ `admin_manage__element-user-table-remove-${index}` }
                onClick={ () => handleDelete(e.id) }
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
  );
}

TableUser.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    token: PropTypes.string,
  })).isRequired,
};

export default TableUser;
