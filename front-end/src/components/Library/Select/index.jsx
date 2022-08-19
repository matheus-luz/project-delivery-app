import PropTypes from 'prop-types';
import React from 'react';

function Select(props) {
  const { children, label, id } = props;
  return (
    <label
      className="text-gray-700 flex flex-col"
      htmlFor={ id }
    >
      {label}
      <select
        className={ `p-2 
        ring-trybe-primary-dark 
        ring-1 
        ring-inset 
        rounded 
        selection:shadow-md` }
        { ...props }
      >
        {children}

      </select>
    </label>
  );
}

Select.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

Select.defaultProps = {
  children: null,
};

export default Select;
