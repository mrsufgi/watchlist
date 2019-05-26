import React, { useEffect, useContext, useCallback, useState } from 'react';
// import axios from 'axios';
import WatchListItem from './WatchListItem';
import useFetch from '../useFetch';
import { LoggedInContext } from '../App';
import api from '../api';

const refereshInterval = 300000;

function useUserList() {
  const [userItems, setUserItems] = useState([]);
  const [getUserItemsListRequest] = useFetch(api.getUserTokens);
  const [updateUserListRequest] = useFetch(api.setUserTokens);
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
      const { data } = await api.getUserTokens();
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
  const [getTokensListRequest] = useFetch(api.getTokens);
  const getTokens = useCallback(async () => {
    const { data } = await getTokensListRequest(); // await axios('http://localhost:8888/blox-user/tokens');
    setTokens(data);
  }, [getTokensListRequest]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.getTokens();
      setTokens(data);
    }
    fetchData();
  }, []);

  return {
    tokens,
    getTokens,
  };
}
// TODO:// create Auth Component
function WatchList() {
  const { tokens, getTokens } = useTokenList();
  const { userItems, addUserItem, removeUserItem } = useUserList();
  const [selectedToken, setSelectedToken] = useState();
  const { loggedIn } = useContext(LoggedInContext);
  useEffect(() => {
    const availableTokens = tokens.filter(token => {
      return !userItems.find(item => token.tokenId === item.tokenId);
    });
    if (availableTokens[0]) {
      setSelectedToken(availableTokens[0].tokenId);
    } else {
      // TODO: find more elegant way
      setSelectedToken(undefined);
    }
  }, [tokens, userItems]);
  useEffect(() => {
    const interval = setInterval(() => {
      // TODO: perferrably refetch only user  only user watched tokens
      getTokens();
    }, refereshInterval);
    return function cleanup() {
      clearInterval(interval);
    };
  }, [getTokens]);

  const tokenOptions = tokens.reduce((acc, token) => {
    const shouldShow = !userItems.find(item => token.tokenId === item.tokenId) || !loggedIn;
    if (shouldShow) {
      acc.push(<option key={token.tokenId} value={token.tokenId} label={token.name} />);
    }
    return acc;
  }, []);

  const userListItems = userItems.map(item => {
    const token = tokens.find(token => item.tokenId === token.tokenId);
    return <WatchListItem key={token.name} onButtonClick={removeUserItem} {...token} />;
  });

  return (
    <>
      {loggedIn && (
        <>
          {tokenOptions.length > 0 && (
            <div>
              All tokens:
              <select
                onChange={event => {
                  const newSelectedToken = event.target.value;
                  setSelectedToken(newSelectedToken);
                }}
              >
                {tokenOptions}
              </select>
              <button
                onClick={() =>
                  selectedToken &&
                  addUserItem(tokens.find(token => token.tokenId === selectedToken))
                }
              >
                Watch
              </button>
            </div>
          )}
          User tokens:
          <ul>{userListItems}</ul>
        </>
      )}
    </>
  );
}

export default WatchList;
