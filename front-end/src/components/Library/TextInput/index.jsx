import PropTypes from 'prop-types';
import React from 'react';

function TextInput(props) {
  const { id, label } = props;
  return (
    <div className="flex flex-col">
      <label htmlFor={ id } className="px-2">
        {label}
      </label>
      <input
        type="text"
        { ...props }
        className={ `p-2 
        ring-trybe-primary-dark 
        ring-1 
        ring-inset 
        rounded` }
      />
    </div>
  );
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TextInput;
