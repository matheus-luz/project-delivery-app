import PropTypes from 'prop-types';
import React from 'react';

function Button({ type, onClick, children, testid, color, disabled }) {
  const getColor = () => {
    switch (color) {
    case 'primary':
      return `tracking-wide 
      bg-trybe-primary 
      text-white 
      hover:bg-trybe-primary-dark 
      uppercase`;
    case 'secondary':
      return `tracking-wide 
      bg-trybe-secondary 
      text-white 
      hover:bg-trybe-secondary-dark 
      uppercase`;
    case 'tertiary':
      return `ring-trybe-primary
      ring-2 
      ring-inset 
      bg-transparent 
      text-trybe-primary 
      hover:bg-gray-100 
      uppercase`;
    default:
      return 'bg-trybe-primary text-white hover:bg-trybe-primary-dark';
    }
  };
  return (
    <button
      type={ type === 'submit' ? 'submit' : 'button' }
      data-testid={ testid }
      onClick={ onClick }
      disabled={ disabled }
      className={ `${getColor()} py-1 px-4 rounded` }
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  testid: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  color: 'primary',
  disabled: false,
  onClick: () => {},
  testid: '',
  type: 'button',
};

export default Button;
