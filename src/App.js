import React, { useContext, useEffect } from 'react';
import { useFetch } from 'react-hooks-fetch';
import './App.css';
import WatchList from './components/WatchList';
import Button from './components/Button';

function App() {
  useEffect(() => {
    // login
  }, []);
  return (
    <div className="App">
      <header>Watchlist</header>
      <WatchList
        authorized={true}
        items={[{ name: 'btc', price: '100$' }, { name: 'eth', price: '10$' }]}
      />
      <div>
        put login/out in menu menu <Button />
      </div>
    </div>
  );
}

export default App;
