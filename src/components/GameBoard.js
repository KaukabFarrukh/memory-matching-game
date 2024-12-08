import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';
import '../styles/GameBoard.css';  // Styles specific to the game board

const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [seconds, setSeconds] = useState(15);  // Timer starts at 15 seconds
  const [gameWon, setGameWon] = useState(false);

  // Create an audio object for the correct match sound from public folder
  const correctMatchAudio = new Audio('/assets/zapsplat_cartoon_swoosh_swipe_whoosh_snatch_003_111076.mp3');

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

  useEffect(() => {
    let interval;
    if (!gameOver && !gameWon) {
      // Start the countdown from 15 seconds
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 1) {
            clearInterval(interval);  // Stop the timer when it hits 0
            setGameOver(true);  // Game over if time is up
          }
          return prevSeconds - 1;
        });
      }, 1000);  // Update every second
    }

    return () => clearInterval(interval);  // Cleanup the interval when component unmounts
  }, [gameOver, gameWon]);

  const handleFlip = (card) => {
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !card.matched) {
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

        // Play the correct match sound
        correctMatchAudio.play();
      }
      setTimeout(() => setFlippedCards([]), 1000); // Reset flipped cards after 1 second
    }
  }, [flippedCards]);

  // Check if game is over (when all cards are matched)
  useEffect(() => {
    if (cards.every(card => card.matched)) {
      setGameWon(true);  // Mark the game as won
      setGameOver(true);  // Stop the game
    }
  }, [cards]);

  const restartGame = () => {
    setScore(0);
    setSeconds(15);  // Reset timer to 15 seconds
    setGameOver(false);
    setGameWon(false);
    setFlippedCards([]);
    // Fetch new cards again and reset the game state
    axios.get('https://jsonplaceholder.typicode.com/photos?_limit=4')
      .then(response => {
        const imageUrls = response.data.map(item => item.url);
        const cardData = imageUrls.map((url) => ({
          img: url,
          matched: false,
        }));

        const shuffledCards = [...cardData, ...cardData].sort(() => Math.random() - 0.5);
        setCards(shuffledCards.map((card, index) => ({ ...card, id: index })));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
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
