import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function HeaderButton({ to, label, testid }) {
  return (
    <Link to={ to } data-testid={ testid }>{label}</Link>
  );
}

HeaderButton.propTypes = {
  label: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default HeaderButton;
