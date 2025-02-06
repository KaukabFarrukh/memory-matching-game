import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import "../styles/GameBoard.css";

const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [seconds, setSeconds] = useState(60); // Timer starts at 60 seconds
  const [gameWon, setGameWon] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Audio object for the correct match sound
  const correctMatchAudio = new Audio(
    "/assets/zapsplat_cartoon_swoosh_swipe_whoosh_snatch_003_111076.mp3"
  );
  const gameOverAudio = new Audio("/assets/gameover (2).mp3");
  const clappingAudio = new Audio("/assets/clapping.mp3"); // Clapping sound for game win

  // Retrieve username from localStorage
  const username = localStorage.getItem("username") || "Player";

  // Fetch cards from API and initialize game
  const fetchCards = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://picsum.photos/v2/list?page=1&limit=8");
      const imageUrls = response.data.map((item) => item.download_url);
      const cardData = imageUrls.map((url) => ({
        img: url,
        matched: false,
      }));

      // Duplicate and shuffle the cards
      const shuffledCards = [...cardData, ...cardData].sort(() => Math.random() - 0.5);
      setCards(shuffledCards.map((card, index) => ({ ...card, id: index })));
    } catch (error) {
      console.error("Error fetching cards:", error);
      setError("Failed to load cards. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    let interval;
    if (!gameOver && !gameWon) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 1) {
            clearInterval(interval);
            setGameOver(true);
            gameOverAudio.play();
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
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
        correctMatchAudio.play();
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setGameWon(true);
      setGameOver(true);
      clappingAudio.play(); // Play clapping sound when game is won
    }
  }, [cards]);

  const restartGame = () => {
    setScore(0);
    setSeconds(60);
    setGameOver(false);
    setGameWon(false);
    setFlippedCards([]);
    fetchCards();
  };

  return (
    <div className="game-container">
      <header className="game-header">
        <h1>Welcome, {username}!</h1>
        <div className="game-info">
          <p>Score: <span>{score}</span></p>
          <p>Time: <span>{seconds} seconds</span></p>
        </div>
      </header>
      <main className="game-board">
        {loading ? (
          <p>Loading cards...</p>
        ) : error ? (
          <div className="error">
            <p>{error}</p>
            <button onClick={fetchCards}>Retry</button>
          </div>
        ) : (
          cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              handleFlip={handleFlip}
              isFlipped={flippedCards.includes(card) || card.matched}
            />
          ))
        )}
      </main>
      {gameOver && (
        <div className="game-over">
          {gameWon ? (
            <h2>You Win! 🎉</h2>
          ) : (
            <h2>Game Over! Time's Up!</h2>
          )}
          <button className="restart-btn" onClick={restartGame}>
            Start Again
          </button>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
