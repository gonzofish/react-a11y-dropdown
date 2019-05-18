import React from 'react'
import PropTypes from 'prop-types'

import './dropdown-trigger.scss';

const DropdownTrigger = ({ id, label, labelId, onClick, open }) => {
  return (
    <button
      aria-expanded={open}
      aria-labelledby={`${labelId} ${id}`}
      aria-haspopup="listbox"
      className="dropdown-trigger"
      id={id}
      onClick={(event) => {
        onClick(event);
      }}
      title={label}
      type="button"
    >
      <span className="dropdown-trigger--label">
        {label}
      </span>

      <span className="dropdown-trigger--arrow" />
    </button>
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
