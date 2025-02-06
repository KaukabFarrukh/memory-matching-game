import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import "../styles/GameBoard.css";
import Confetti from 'react-confetti';

const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [gameWon, setGameWon] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dimensions, setDimensions] = useState({ 
    width: window.innerWidth, 
    height: document.documentElement.scrollHeight 
  });
   
  const username = localStorage.getItem("username") || "Player";

  const correctMatchAudio = new Audio("/assets/zapsplat_cartoon_swoosh_swipe_whoosh_snatch_003_111076.mp3");
  const gameOverAudio = new Audio("/assets/gameover (2).mp3");
  const clappingAudio = new Audio("/assets/clapping.mp3");

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: document.documentElement.scrollHeight
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://picsum.photos/v2/list?page=1&limit=8");
      const imageUrls = response.data.map(item => ({ img: item.download_url, matched: false }));
      const shuffledCards = [...imageUrls, ...imageUrls].sort(() => Math.random() - 0.5);
      setCards(shuffledCards.map((card, index) => ({ ...card, id: index })));
    } catch (error) {
      setError("Failed to load cards. Please try again.");
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (!gameOver && !gameWon && seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(interval);
        if (seconds === 0) {
          setGameOver(true);
          gameOverAudio.play();
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, gameOver, gameWon]);

  const handleFlip = card => {
    if (flippedCards.length < 2 && !flippedCards.some(c => c.id === card.id) && !card.matched) {
      setFlippedCards(prev => [...prev, card]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (first.img === second.img) {
        setCards(prevCards =>
          prevCards.map(card =>
            card.img === first.img ? { ...card, matched: true } : card
          )
        );
        setScore(prev => prev + 1);
        correctMatchAudio.play();
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (cards.every(card => card.matched) && cards.length > 0) {
      setGameWon(true);
      setGameOver(true);
      clappingAudio.play();
      // Update dimensions to cover full height when game is won
      setDimensions({
        width: window.innerWidth,
        height: document.documentElement.scrollHeight
      });
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
      {gameWon && <Confetti width={dimensions.width} height={dimensions.height} />}
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
          {gameWon ? <h2>You Win! 🎉</h2> : <h2>Game Over! Time's Up!</h2>}
          <button className="restart-btn" onClick={restartGame}>
            Start Again
          </button>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
