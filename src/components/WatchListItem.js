import React from 'react';
import Button from './Button';

function WatchListItem({ onButtonClick, ...token }) {
  const { name, price } = token;
  return (
    <li onClick={() => {}}>
      name: {name}, price: {price}
      {onButtonClick && <Button onClick={() => onButtonClick(token)} text="Watch" />}
    </li>
  );
}

export default WatchListItem;
