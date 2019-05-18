import React, { useState } from 'react';
import './App.scss';

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
];
const SCROLLER_ITEMS = (() => {
  const items = [];

  for (let i = 0; i < 500; i++) {
    const id = `${i}`;

    items.push({
      id,
      label: id,
    })
  }

  console.info(items);

  return items;
})()

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);

  return (
    <div className="App">
      <div
        className="scroller"
        id="scroller"
      >
        <Dropdown
          containers={['scroller']}
          id="scroller-dropdown"
          items={SCROLLER_ITEMS}
          label="Scroller"
          maxHeight={400}
          onSelect={(id) => {
            setSelectedId(id);
          }}
          selected={selectedId}
        />
      </div>
      <Dropdown
        id="my-dropdown"
        items={MY_ITEMS}
        label="My Dropdown"
        onSelect={(id) => {
          setSelectedFood(id);
        }}
        selected={selectedFood}
      />

      <p>Here's some content after the dropdown</p>
    </div>

  );
}

export default App;
