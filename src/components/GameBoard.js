// src/components/GameBoard.js
import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';
import '../styles/GameBoard.css';  // Styles specific to the game board

const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Fetch image data from an API
    axios.get('https://jsonplaceholder.typicode.com/photos?_limit=4')
      .then(response => {
        const imageUrls = response.data.map(item => item.url);  // Extract image URLs from API response
        const cardData = imageUrls.map((url) => ({
          img: url,  // Use the URL as the image source for the card
          matched: false,
        }));

        const shuffledCards = [...cardData, ...cardData].sort(() => Math.random() - 0.5); // Shuffle cards
        setCards(shuffledCards.map((card, index) => ({ ...card, id: index })));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleFlip = (card) => {
    if (flippedCards.length < 2 && !flippedCards.includes(card)) {
      setFlippedCards((prev) => [...prev, card]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (first.img === second.img) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.img === first.img ? { ...card, matched: true } : card
          )
        );
        setScore((prev) => prev + 1);
      }
      setTimeout(() => setFlippedCards([]), 1000); // Reset flipped cards after 1 second
    }
  }, [flippedCards]);

  return (
    <div>
      <div className="game-board">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleFlip={handleFlip}
            isFlipped={flippedCards.includes(card) || card.matched}
          />
        ))}
      </div>
      <p>Score: {score}</p>
    </div>
  );
};

export default GameBoard;
