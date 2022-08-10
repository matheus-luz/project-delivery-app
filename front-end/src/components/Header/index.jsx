import PropTypes from 'prop-types';
import React from 'react';

function Header({ children }) {
  return (
    <nav className="bg-trybe-primary flex h-12 items-center">
      <div>
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
        NOME-DE-USUARIO
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
