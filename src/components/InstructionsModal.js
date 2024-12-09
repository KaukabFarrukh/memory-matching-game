import React from "react";
import '../styles/InstructionsModal.css'; 

const InstructionsModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>Instructions</h1>
        <p>Find matching pairs and earn points!</p>
        <h3>How to Play:</h3>
        <ul>
          <li>
            When the game starts, you will see cards randomly placed on the
            screen. Each card has a color on its back.
          </li>
          <li>
            Match the cards: If the cards you select match, they will remain
            open, and you earn points.
          </li>
          <li>
            Mismatch: If the cards do not match, they will be closed again.
          </li>
          <li>Time Limit: You have only 15 seconds to complete all the matches!</li>
        </ul>
        <p>Use your memory to remember where you saw the cards. Be quick and careful!</p>
        <p>Ready? Close the instructions and start matching!</p>
        <button className="modal-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default InstructionsModal;
