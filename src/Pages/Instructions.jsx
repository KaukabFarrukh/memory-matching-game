import React from 'react';
import './Instructions.css';

const Instructions = () => {
  return (
    <div className="instructions-container">
      <h3>Instructions</h3>
      <h3>Find matching pairs and earn points!</h3>
      <ul>
        <li><strong>Find matching pairs and earn points!</strong></li>
        <li><strong>How to Play:</strong> When the game starts, you will see cards randomly placed on the screen. Each card has a color on its back.</li>
        <li><strong>Match the cards:</strong> If the cards you select match, they will remain open, and you earn points.</li>
        <li><strong>Mismatch:</strong> If the cards do not match, they will be closed again.</li>
        <li><strong>Time Limit:</strong> You have only 15 seconds to complete all the matches!</li>
        <li><strong>Tips:</strong> Use your memory to remember where you saw the cards. Be quick and careful!</li>
        <li><strong>Ready?</strong> After entering your details, click the Login button to start matching.</li>
      </ul>
    </div>
  );
};

export default Instructions;
