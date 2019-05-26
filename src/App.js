import React, { useReducer, useContext, useEffect } from 'react';
import './App.css';
import WatchList from './components/WatchList';
import Button from './components/Button';

function App() {
  return (
    <div className="App">
      <header>Watchlist</header>

      <WatchList />

      <div>
        put login/out in menu menu <Button />
      </div>
    </div>
  );
}

export default App;
