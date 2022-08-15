import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../context/userContext';

function Header({ children }) {
  const { user } = useContext(userContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="bg-trybe-primary flex h-12 items-center">
      <div
        className="
      flex gap-3
      text-white
      font-bold
      text-2xl
      px-4"
      >
        {children}
      </div>
      <h3
        data-testid="customer_products__element-navbar-user-full-name"
        className={ `text-white 
        text-2xl 
        font-bold 
        ml-auto 
        bg-trybe-purple 
        px-4 
        py-2
        h-full 
        text-center` }
      >
        {user.name}
      </h3>
      <button
        className={ `bg-trybe-blue 
        text-white 
        text-xl 
        font-bold 
        px-4 
        py-2 
        h-full 
        text-center` }
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
        onClick={ logout }
      >
        Sair
      </button>
    </nav>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
