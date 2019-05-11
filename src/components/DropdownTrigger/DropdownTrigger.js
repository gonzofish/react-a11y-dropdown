import React from 'react'
import PropTypes from 'prop-types'

import './dropdown-trigger.scss';

const DropdownTrigger = ({ id, label, labelId, onClick }) => {
  return (
    <div className="dropdown-trigger">
      <button
        aria-labelledby={`${labelId} ${id}`}
        aria-haspopup="listbox"
        id={id}
        onClick={onClick}
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
}

export default DropdownTrigger
