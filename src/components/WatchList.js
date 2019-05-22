import React from 'react';
import WatchListItem from './WatchListItem';

function WatchList({ items, onAddClick, onRemoveClick }) {
  const listItems = items.map(({ name, price }) => {
    return <WatchListItem onRemoveClick={onRemoveClick} name={name} price={price} />;
  });
  return (
    <>
      <ul>{listItems}</ul>
      <div>add form here. give it the onAddClick prop</div>
    </>
  );
}

export default WatchList;
