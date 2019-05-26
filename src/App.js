import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import WatchList from './components/WatchList';
import useFetch from './useFetch';
import api from './api';

export const LoggedInContext = React.createContext();

function useAuth() {
  const [accessToken, setAccessToken] = useState(false);
  const loginApi = () => {
    return api.login();
  };

  const [loginRequest] = useFetch(loginApi);

  const login = useCallback(async () => {
    const { data } = await loginRequest();
    setAccessToken(data.token);
  }, [loginRequest]);

  const logout = useCallback(() => {
    setAccessToken(undefined);
  }, []);

  useEffect(() => {
    api.accessToken = accessToken;
  }, [accessToken]);

  return [!!accessToken, login, logout];
}
function App() {
  const [loggedIn, login, logout] = useAuth();
  return (
    <div className="App">
      <header>Watchlist</header>
      <LoggedInContext.Provider value={{ loggedIn }}>
        <WatchList />
        {!loggedIn && <button onClick={login}>login</button>}
        {loggedIn && <button onClick={logout}>logout</button>}
      </LoggedInContext.Provider>
    </div>
  );
}

export default App;
