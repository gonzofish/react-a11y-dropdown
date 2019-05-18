import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import PropTypes from 'prop-types'

import DropdownTrigger from '../DropdownTrigger/DropdownTrigger';
import DropdownList from '../DropdownList/DropdownList';

const Dropdown = ({ containers, id, items, label, maxHeight, onSelect, selected }) => {
  const [open, setOpen] = useState(false);
  const [triggerLabel, setTriggerLabel] = useState('');
  const labelId = `${id}-label`;
  const triggerId = `${id}-trigger`;
  const selectCallback = useCallback(onSelect);

  useEffect(() => {
    const selectedItem = getSelectedItem(items, selected);
    const selectedLabel = selectedItem.label;

    if (selectedLabel !== triggerLabel) {
      setTriggerLabel(selectedLabel);
    }

    if (selectedItem.id !== selected) {
      selectCallback(selectedItem.id);
    }
  }, [items, label, selected, selectCallback, triggerLabel]);

  return (
    <div className="a11y-dropdown">
      <label
        htmlFor={triggerId}
        id={labelId}
      >
        {label}:
      </label>

      <DropdownTrigger
        active={selected}
        id={triggerId}
        label={triggerLabel}
        labelId={labelId}
        onClick={() => {
          setOpen(!open);
        }}
        open={open}
      />
      {open && (
        <DropdownList
          containers={containers}
          id={`${id}-list`}
          items={items}
          labelId={labelId}
          maxHeight={maxHeight}
          onSelect={(id, close = true, focusButton = true) => {
            selectCallback(id);

            if (close) {
              setOpen(false);
              focusButton && setTimeout(() => (
                document.getElementById(triggerId).focus()
              ));
            }
          }}
          selected={selected}
          triggerId={triggerId}
        />
      )}
    </div>
  )
};

const getSelectedItem = (items, selected) => {
  let selectedItem;

  if (selected) {
    selectedItem = items.find(({ id }) => id === selected);
  } else {
    [selectedItem] = items;
  }

  return selectedItem;
};

Dropdown.defaultProps = {
  containers: null,
  maxHeight: null,
  selected: null,
};

Dropdown.propTypes = {
  containers: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  label: PropTypes.string.isRequired,
  maxHeight: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.string,
}

export default Dropdown;
