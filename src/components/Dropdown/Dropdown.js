import React, {
  useState
} from 'react';
import PropTypes from 'prop-types'

import DropdownTrigger from '../DropdownTrigger/DropdownTrigger';
import DropdownList from '../DropdownList/DropdownList';

const Dropdown = ({ id, items, label, onSelect, selected }) => {
  const [open, setOpen] = useState(false);
  const labelId = `${id}-label`;
  const triggerId = `${id}-trigger`;

  return (
    <div className="a11y-dropdown">
      <label
        htmlFor={triggerId}
        id={labelId}
      >
      </label>

      <DropdownTrigger
        active={selected}
        id={triggerId}
        label={label}
        labelId={labelId}
        onClick={() => {
          setOpen(!open);
        }}
      />
      {open && (
        <DropdownList
          id={`${id}-list`}
          items={items}
          labelId={labelId}
          onSelect={onSelect}
          selected={selected}
        />
      )}
    </div>
  )
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
