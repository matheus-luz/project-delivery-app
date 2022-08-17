import PropTypes from 'prop-types';
import AdminHead from '../Library/List/ListHead/admin';

function TableUser(props) {
  const { users, handleDelete } = props;

  return (
    <div className="p-3 border border-1 border-gray-300 shadow-md">
      <table
        className={ `border 
      border-none 
      table-auto
      gap-3
      border-separate 
      border-spacing-y-1` }
      >
        <thead>
          <AdminHead />
        </thead>
        <tbody>
          { users.map((e, index) => (
            <tr
              key={ e.id }
            >
              <td
                className={ `bg-trybe-primary-light 
                px-2 
                text-center 
                rounded-l-md
                text-lg
                font-bold
                text-trybe-primary-dark` }
                data-testid={ `admin_manage__element-user-table-item-number-${index}` }
              >
                { e.id }
              </td>
              <td
                className={ `bg-gray-100
                font-bold
                text-trybe-primary-dark
                px-2` }
                data-testid={ `admin_manage__element-user-table-name-${index}` }
              >
                { e.name }
              </td>
              <td
                className={ `bg-trybe-primary
                text-center
                px-2
                  text-medium
                  text-white
                ` }
                data-testid={ `admin_manage__element-user-table-email-${index}` }
              >
                { e.email }
              </td>
              <td
                className={ `bg-trybe-purple
                px-10
                text-medium
                text-white
              ` }
                data-testid={ `admin_manage__element-user-table-role-${index}` }
              >
                { e.role === 'customer'
                  ? e.role.replace('customer', 'Cliente')
                  : e.role.replace('seller', 'Vendedor') }
              </td>
              <td
                className="border border-none bg-trybe-blue h-full rounded-r-md px-3"
              >
                <button
                  className="px-2 py-1 text-white"
                  data-testid={ `admin_manage__element-user-table-remove-${index}` }
                  onClick={ () => handleDelete(e.id) }
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
