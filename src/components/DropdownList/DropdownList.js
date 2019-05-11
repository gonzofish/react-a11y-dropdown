import React, {
  useCallback,
  useEffect,
  useRef,
} from 'react'
import PropTypes from 'prop-types'

import './dropdown-list.scss';

const DropdownList = ({ id, items, labelId, onSelect, selected }) => {
  const selectedIndex = useRef(-1);
  const ref = useCallback((list) => {
    if (list) {
      list.focus();
    }
  }, []);

  useEffect(() => {
    selectedIndex.current = items.findIndex((item) => item.id === selected);
  }, [items, selected]);

  return (
    <ul
      aria-activedescendant={selected}
      aria-labelledby={labelId}
      className="dropdown-list"
      id={id}
      onKeyDown={({ key }) => {
        const index = selectedIndex.current;
        const lastIndex = items.length - 1;
        let newIndex = index + getIndexChange(key);

        if (newIndex < 0) {
          newIndex = lastIndex;
        } else if (newIndex > lastIndex) {
          newIndex = 0;
        }

        if (newIndex !== index) {
          onSelect(items[newIndex].id, false);
        }
      }}
      ref={ref}
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

const getIndexChange = (key) => {
  switch (key) {
    case 'ArrowDown':
      return 1;
    case 'ArrowUp':
      return -1;
    default:
      return 0;
  }
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
