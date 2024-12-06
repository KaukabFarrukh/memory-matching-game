// src/App.js
import React from 'react';
import GameBoard from './components/GameBoard';
import './styles/App.css';  // Import global styles
import Login from './Pages/Login';

function App() {
  return (
    <div className="App">
      <h1>Memory Matching Game</h1>
      
      <Login/>
    </div>
  );
}

export default App;
