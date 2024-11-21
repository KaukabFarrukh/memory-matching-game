// src/App.js
import React from 'react';
import GameBoard from './components/GameBoard';
import './styles/App.css';  // Import global styles

function App() {
  return (
    <div className="App">
      <h1>Memory Matching Game</h1>
      <GameBoard />
    </div>
  );
}

export default App;
