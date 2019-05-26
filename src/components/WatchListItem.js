import React from 'react';

function WatchListItem({ onButtonClick, ...token }) {
  const { name, price } = token;
  return (
    <li>
      name: {name}, price: {price}
      {onButtonClick && <button onClick={() => onButtonClick(token)}>Unwatch</button>}
    </li>
  );
}

export default WatchListItem;
