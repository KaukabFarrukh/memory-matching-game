import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';
import '../styles/GameBoard.css'; // Styles specific to the game board

const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [seconds, setSeconds] = useState(15); // Timer starts at 15 seconds
  const [gameWon, setGameWon] = useState(false);

  // Audio object for the correct match sound
  const correctMatchAudio = new Audio('/assets/zapsplat_cartoon_swoosh_swipe_whoosh_snatch_003_111076.mp3');

  // Fetch cards from API and initialize game
  const fetchCards = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=4');
      const imageUrls = response.data.map(item => item.url);
      const cardData = imageUrls.map((url) => ({
        img: url,
        matched: false,
      }));

      const shuffledCards = [...cardData, ...cardData].sort(() => Math.random() - 0.5);
      setCards(shuffledCards.map((card, index) => ({ ...card, id: index })));
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // Timer logic
  useEffect(() => {
    let interval;
    if (!gameOver && !gameWon) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 1) {
            clearInterval(interval);
            setGameOver(true);
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameOver, gameWon]);

  // Handle card flip
  const handleFlip = (card) => {
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !card.matched) {
      setFlippedCards((prev) => [...prev, card]);
    }
  };

  // Check for match
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

        // Play correct match sound
        correctMatchAudio.play();
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards]);

  // Check if game is won
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setGameWon(true);
      setGameOver(true);
    }
  }, [cards]);

  // Restart the game
  const restartGame = () => {
    setScore(0);
    setSeconds(15);
    setGameOver(false);
    setGameWon(false);
    setFlippedCards([]);
    fetchCards();
  };

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
      <p>Time: {seconds} seconds</p>

      {gameOver && (
        <div>
          {gameWon ? (
            <h2>You Win! 🎉</h2>
          ) : (
            <h2>Game Over! Time's Up!</h2>
          )}
          <button onClick={restartGame}>Start Again</button>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
