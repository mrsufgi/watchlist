import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WatchListItem from './WatchListItem';

const createUseList = data =>
  function useList() {
    const [items, setItems] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const result = await Promise.resolve({
          data,
        }); // await axios('http://localhost:8888/blox-user/tokens');
        setItems(result.data);
      };

      fetchData();
    }, []);

    const addItem = item => {
      setItems([...items, item]);
    };

    const removeItem = ({ tokenId }) => {
      setItems(items.filter(item => item.tokenId !== tokenId));
    };

    return { addItem, removeItem, items };
  };
function WatchList({}) {
  const { items, addItem, removeItem } = createUseList([
    { tokenId: 0, name: 'btc', price: '100$' },
    { tokenId: 1, name: 'eth', price: '10$' },
  ])();
  const { items: userItems, addItem: addUserItem, removeItem: removeUserItem } = createUseList(
    [],
  )();

  const watch = item => {
    removeItem(item);
    addUserItem(item);
  };

  const unwatch = item => {
    removeUserItem(item);
    addItem(item);
  };

  // TODO: create custom list hook

  const listItems = items.map(item => {
    return <WatchListItem key={item.name} onButtonClick={watch} {...item} />;
  });

  const userListItems = userItems.map(item => {
    return <WatchListItem key={item.name} onButtonClick={unwatch} {...item} />;
  });

  return (
    <>
      all tokens:
      <ul>{listItems}</ul>
      user tokens:
      <ul>{userListItems}</ul>
    </>
  );
}

export default WatchList;
