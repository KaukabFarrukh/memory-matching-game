// src/components/Card.js
import React from 'react';
import '../styles/Card.css';  // Card-specific styles

const Card = ({ card, handleFlip, isFlipped }) => {
  return (
    <div className="card" onClick={() => handleFlip(card)}>
      {isFlipped ? (
        <div className="card-front">
          <img src={card.img} alt="card" />
        </div>
      ) : (
        <div className="card-back">?</div>
      )}
    </div>
  );
};

export default Card;
