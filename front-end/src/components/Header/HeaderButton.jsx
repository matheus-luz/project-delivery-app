import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function HeaderButton({ to, label }) {
  return (
    <Link to={ to }>{label}</Link>
  );
}

HeaderButton.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default HeaderButton;
