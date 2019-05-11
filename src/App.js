import React, { useState } from 'react';
import './App.css';

import Dropdown from './components/Dropdown/Dropdown';

const MY_ITEMS = [
  {
    id: 'pizza',
    label: 'Pizza'
  },
  {
    id: 'hamburger',
    label: 'Burger',
  },
  {
    id: 'ice-cream',
    label: 'Ice Cream'
  },
  {
    id: 'taco',
    label: 'Taco',
  }
]

function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="App">
      <Dropdown
        id="my-dropdown"
        items={MY_ITEMS}
        label="My Dropdown"
        onSelect={(id) => {
          setSelected(id);
        }}
        selected={selected}
      />

      <p>Here's some content after the dropdown</p>
    </div>

  );
}

export default App;
