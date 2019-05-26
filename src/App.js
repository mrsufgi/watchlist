import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import WatchList from './components/WatchList';
import useFetch from './useFetch';

export const LoggedInContext = React.createContext();

function useAuth() {
  const [accessToken, setAccessToken] = useState(false);
  const loginApi = () => {
    return Promise.resolve({ data: { token: 'test' } });
  };

  const [loginRequest] = useFetch(loginApi);

  const login = useCallback(async () => {
    const { data } = await loginRequest(); // await axios('http://localhost:8888/blox-user/tokens');
    setAccessToken(data.token);
  }, [loginRequest]);

  const logout = useCallback(() => {
    setAccessToken(undefined);
  }, []);

  return [!!accessToken, login, logout];
}
function App() {
  const [loggedIn, login, logout] = useAuth();
  useEffect(() => {}, [loggedIn]);
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
