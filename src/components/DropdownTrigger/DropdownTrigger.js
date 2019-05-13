import React from 'react'
import PropTypes from 'prop-types'

import './dropdown-trigger.scss';

const DropdownTrigger = ({ id, label, labelId, onClick, open }) => {
  return (
    <div className="dropdown-trigger">
      <button
        aria-expanded={open}
        aria-labelledby={`${labelId} ${id}`}
        aria-haspopup="listbox"
        id={id}
        onClick={(event) => {
          console.info('...button click...');
          onClick(event);
        }}
        onFocus={(event) => {
          console.info('...button focus...');
          event.preventDefault();
        }}
        title={label}
        type="button"
      >
        <span className="dropdown-trigger--label">
          {label}
        </span>

        <span className="dropdown-trigger--arrow" />
      </button>
    </div>
  )
}

DropdownTrigger.defaultProps = {
  active: null
};

DropdownTrigger.propTypes = {
  label: PropTypes.string.isRequired,
  labelId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default DropdownTrigger
