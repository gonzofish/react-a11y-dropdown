import React, {
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types'

import './dropdown-list.scss';

const DropdownList = ({ containers, id, items, labelId, maxHeight, onSelect, selected, triggerId }) => {
  const selectedIndex = useRef(-1);
  const outsideClick = useRef(null);
  const outsideClickHandler = useRef(() => {
    onSelect(selected, true, false);
  });
  const scroll = useRef(null);
  const ref = useCallback((list) => {
    if (list) {
      outsideClick.current = startOutsideClick(
        list,
        outsideClickHandler.current,
      );
      scroll.current = startWindowChange(
        list,
        triggerId,
        containers,
      );
      focusList(list, triggerId);
      scrollToItem(list, selected);
    } else {
      stopOutsideClick(outsideClick.current);
      stopWindowChange(scroll.current, containers);
    }
  }, [triggerId, containers, selected]);

  useEffect(() => {
    selectedIndex.current = items.findIndex((item) => item.id === selected);
  }, [items, selected]);

  return createPortal(
    <ul
      aria-activedescendant={selected}
      aria-labelledby={labelId}
      className="dropdown-list"
      id={id}
      onKeyDown={(event) => {
        const { key, target } = event;
        const index = selectedIndex.current;
        const lastIndex = items.length - 1;
        let newIndex = index + getIndexChange(key);

        if (newIndex < 0) {
          newIndex = lastIndex;
        } else if (newIndex > lastIndex) {
          newIndex = 0;
        }

        if (newIndex !== index) {
          const nextId = items[newIndex].id;

          event.stopPropagation();
          event.preventDefault();

          scrollToItem(target, nextId)
          onSelect(nextId, false);
        } else if (key === 'Enter' || key === 'Escape') {
          onSelect(selected);
        }
      }}
      ref={ref}
      role="listbox"
      style={maxHeight && maxHeight > 0
        ? { maxHeight: `${maxHeight}px`, overflow: 'auto' }
        : null
      }
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

const startWindowChange = (list, triggerId, containers) => {
  const handler = () => {
    positionList(list, triggerId);
  };
  const addListeners = (element) => {
    element.addEventListener('resize', handler)
    element.addEventListener('scroll', handler)

  }

  addListeners(window);
  setContainerListeners(containers, addListeners);

  return handler;
}

const stopWindowChange = (handler, containers) => {
  const removeListeners = (element) => {
    element.removeEventListener('resize', handler)
    element.removeEventListener('scroll', handler)
  }

  removeListeners(window);
  setContainerListeners(containers, removeListeners);
};

const setContainerListeners = (containers, fn) => {
  if (containers) {
    containers.forEach((containerId) => {
      const container = document.getElementById(containerId);

      if (container) {
        fn(container);
      }
    });
  }
};

const focusList = (list, triggerId) => {
  const {
    scrollX,
    scrollY,
  } = window;

  list.focus();
  positionList(list, triggerId);
  window.scrollTo(scrollX, scrollY);
}

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
  const { scrollX, scrollY } = window;

  list.style.left = `${left + scrollX}px`;
  list.style.top = `${bottom + scrollY}px`;
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

/**
 *
 * @param {HTMLElement} list - List holding items
 * @param {string} itemId - ID of item to focus to
 */
const scrollToItem = (list, itemId) => {
  const element = document.getElementById(`${list.id}-${itemId}`);

  if (list.scrollHeight > list.clientHeight) {
    const scrollBottom = list.clientHeight + list.scrollTop;
    const elementBottom = element.offsetTop + list.offsetHeight;

    if (elementBottom > scrollBottom) {
      list.scrollTop = elementBottom - list.clientHeight;
    } else if (element.offsetTop < list.scrollTop) {
      list.scrollTop = element.offsetTop;
    }
  }
}

DropdownList.defaultProps = {
  containers: null,
  maxHeight: null,
  selected: null,
}

DropdownList.propTypes = {
  containers: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  labelId: PropTypes.string.isRequired,
  maxHeight: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.string,
  triggerId: PropTypes.string.isRequired,
}

export default DropdownList
