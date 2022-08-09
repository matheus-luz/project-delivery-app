import PropTypes from 'prop-types';
import React from 'react';

function Header({ children }) {
  return (
    <nav>
      <div>
        {children}
      </div>
      <h3
        data-testid="customer_products__element-navbar-user-full-name"
      >
        NOME-DE-USUARIO
      </h3>
      <button
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
