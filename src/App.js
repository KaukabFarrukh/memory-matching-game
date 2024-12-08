import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import './styles/App.css'; // Import global styles
import Login from './Pages/Login';
import InstructionsModal from './components/InstructionsModal';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [showInstructions, setShowInstructions] = useState(false); // Track modal visibility

  const handleLogin = () => {
    setIsLoggedIn(true); // Mark user as logged in
    setShowInstructions(true); // Show instructions after login
  };

  const closeInstructions = () => {
    setShowInstructions(false); // Close the instructions modal
  };

  return (
    <div className="App">
      <h1>Memory Matching Game</h1>

      {!isLoggedIn && <Login onLogin={handleLogin} />} {/* Show login page if not logged in */}

      {isLoggedIn && (
        <>
          {showInstructions && <InstructionsModal onClose={closeInstructions} />} {/* Show modal */}
          <GameBoard /> {/* Game starts after modal */}
        </>
      )}
    </div>
  );
}

export default App;
