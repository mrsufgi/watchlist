import React from 'react';
import Button from './Button';

function WatchListItem({ name, price, onRemoveClick }) {
  return (
    <li onClick={() => {}}>
      name: {name}, price: {price}
      <Button onClick={onRemoveClick} text="Unwatch" />
    </li>
  );
}

export default WatchListItem;
