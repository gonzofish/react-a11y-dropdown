import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import PropTypes from 'prop-types'

import DropdownTrigger from '../DropdownTrigger/DropdownTrigger';
import DropdownList from '../DropdownList/DropdownList';

const Dropdown = ({ id, items, label, onSelect, selected }) => {
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
          id={`${id}-list`}
          items={items}
          labelId={labelId}
          onSelect={(id, close = true) => {
            selectCallback(id);

            if (close) {
              setOpen(false);
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
  selected: null,
};

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  label: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.string,
}

export default Dropdown;
