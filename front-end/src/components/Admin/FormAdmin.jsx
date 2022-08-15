import PropTypes from 'prop-types';
import TextInput from '../Library/TextInput';

function FormAdmin(props) {
  const {
    handleInputOnChange, handleRegisterBtn, isDelBtnDisabled, inputsOnChange,
  } = props;

  return (
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
  );
}

FormAdmin.propTypes = {
  handleInputOnChange: PropTypes.func.isRequired,
  handleRegisterBtn: PropTypes.func.isRequired,
  inputsOnChange: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    password: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  isDelBtnDisabled: PropTypes.func.isRequired,
};

export default FormAdmin;
