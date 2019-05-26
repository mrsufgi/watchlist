import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import WatchListItem from './WatchListItem';

const noop = () => {};
function useFetch(request) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState();
  const handler = useCallback(
    async (...args) => {
      if (isLoading) return;
      setIsLoading(true);
      const response = await request(...args);
      setResult(response);
      setIsLoading(false);
      return response;
    },
    [isLoading, request],
  );
  return [handler, result, isLoading];
}

function useUserList() {
  const [userItems, setUserItems] = useState([]);
  const getUserWatchList = () => {
    return Promise.resolve({ data: [] });
  };

  const setUserWatchList = list => {
    return Promise.resolve({ data: list });
  };

  const [getUserItemsListRequest] = useFetch(getUserWatchList);
  const [updateUserListRequest] = useFetch(setUserWatchList);
  // TODO: clarify if we want optimistic ui updates.
  // TODO: show error if

  const getUserItems = useCallback(async () => {
    const { data } = await getUserItemsListRequest(); // await axios('http://localhost:8888/blox-user/tokens');
    setUserItems(data);
  }, [getUserItemsListRequest]);

  const updateUserList = list => {
    return updateUserListRequest(list);
  };

  const addUserItem = item => {
    // TODO: enforce - don't add watched items.
    const updatedItems = [...userItems, item];
    setUserItems(updatedItems);
    updateUserList(updatedItems);
  };

  const removeUserItem = ({ tokenId }) => {
    const updatedItems = userItems.filter(item => item.tokenId !== tokenId);
    setUserItems(updatedItems);
    updateUserList(updatedItems);
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await getUserWatchList();
      setUserItems(data);
    }
    fetchData();
  }, []);

  return {
    userItems,
    getUserItems,
    addUserItem,
    removeUserItem,
  };
}

function useTokenList() {
  const [tokens, setTokens] = useState([]);
  const getTokensListApi = () => {
    return Promise.resolve({
      data: [
        { tokenId: '0', name: 'btc', price: '100$' },
        { tokenId: '1', name: 'eth', price: '10$' },
      ],
    });
  };

  const [getTokensListRequest] = useFetch(getTokensListApi);

  const getTokens = useCallback(async () => {
    const { data } = await getTokensListRequest(); // await axios('http://localhost:8888/blox-user/tokens');
    setTokens(data);
  }, [getTokensListRequest]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getTokensListApi();
      setTokens(data);
    }
    fetchData();
  }, []);

  return {
    tokens,
    getTokens,
  };
}

function WatchList({}) {
  const { tokens /* getTokens */ } = useTokenList();
  const { userItems, getUserItems, addUserItem, removeUserItem } = useUserList();
  // TODO: create custom list hook
  const [selectedToken, setSelectedToken] = useState();
  const tokenOptions = tokens.map(token => {
    return <option key={token.tokenId} value={token.tokenId} label={token.name} />;
  });

  const userListItems = userItems.map(item => {
    return <WatchListItem key={item.name} onButtonClick={removeUserItem} {...item} />;
  });

  return (
    <>
      all tokens:
      <select
        value={selectedToken}
        onChange={event => {
          const newSelectedToken = event.target.value;
          setSelectedToken(newSelectedToken);
        }}
      >
        {tokenOptions}
      </select>
      <button
        onClick={() => {
          addUserItem(tokens.find(token => token.tokenId === selectedToken));
        }}
      >
        add user item
      </button>
      user tokens:
      <ul>{userListItems}</ul>
    </>
  );
}

export default WatchList;
