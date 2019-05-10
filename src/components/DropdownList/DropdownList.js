import React from 'react'
import PropTypes from 'prop-types'

import './dropdown-list.scss';

const DropdownList = ({ id, items, labelId, onSelect, selected }) => {
  return (
    <ul
      aria-activedescendant={selected}
      aria-labelledby={labelId}
      className="dropdown-list"
      id={id}
      role="listbox"
      tabIndex="0"
    >
      {items.map((item) => (
        <li
          aria-selected={item.id === selected}
          id={`${id}-${item.id}`}
          key={item.id}
          onClick={() => {
            onSelect(item.id);
          }}
          role="option"
        >
          {item.label}
        </li>
      ))}
    </ul>
  )
}

DropdownList.defaultProps = {
  selected: null,
}

DropdownList.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  labelId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.string,
}

export default DropdownList
