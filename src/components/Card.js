// src/components/Card.js
import React from 'react';
import '../styles/Card.css';  // Card-specific styles

const Card = ({ card, handleFlip, isFlipped }) => {
  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      onClick={() => handleFlip(card)}
    >
      {isFlipped && <img src={card.img} alt="card" />}
    </div>
  );
};

export default Card;
