import React from 'react';
import Button from './Button';

function WatchListItem({ onButtonClick, ...token }) {
  const { name, price } = token;
  return (
    <li>
      name: {name}, price: {price}
      {onButtonClick && <Button onClick={() => onButtonClick(token)} text="Unwatch" />}
    </li>
  );
}

export default WatchListItem;
