import React, {
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types'

import './dropdown-list.scss';

const DropdownList = ({ id, items, labelId, onSelect, selected, triggerId }) => {
  const selectedIndex = useRef(-1);
  const outsideClick = useRef(null);
  const outsideClickHandler = useRef(() => {
    onSelect(selected, true, false);
  });
  const ref = useCallback((list) => {
    if (list) {
      outsideClick.current = startOutsideClick(
        list,
        outsideClickHandler.current,
      );
      list.focus();
      positionList(list, triggerId);
    } else {
      stopOutsideClick(outsideClick.current);
    }
  }, [triggerId, outsideClickHandler]);

  useEffect(() => {
    selectedIndex.current = items.findIndex((item) => item.id === selected);
  }, [items, selected]);

  return createPortal(
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
        } else if (key === 'Enter' || key === 'Escape') {
          onSelect(selected);
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
    </ul>,
    document.body,
  );
};

const startOutsideClick = (item, onOutsideClick) => {
  const handler = ({ target }) => {
    if (!item.contains(target)) {
      onOutsideClick();
    }
  };

  document.addEventListener('click', handler);

  return handler;
};

const stopOutsideClick = (handler) => {
  document.removeEventListener('click', handler);
};

/**
 *
 * @param {HTMLElement} list
 * @param {String} triggerId
 */
const positionList = (list, triggerId) => {
  const trigger = document.getElementById(triggerId);
  const {
    bottom,
    left,
  } = trigger.getBoundingClientRect();

  list.style.left = `${left}px`;
  list.style.top = `${bottom}px`;
};

const getIndexChange = (key) => {
  switch (key) {
    case 'ArrowDown':
      return 1;
    case 'ArrowUp':
      return -1;
    default:
      return 0;
  }
};

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
  triggerId: PropTypes.string.isRequired,
}

export default DropdownList
