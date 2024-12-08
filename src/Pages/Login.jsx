import React, { useState, useEffect } from 'react';
import './Login.css';
import GameBoard from '../components/GameBoard';
import InstructionsModal from '../components/InstructionsModal';

function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(3); 
  const [showInstructions, setShowInstructions] = useState(false);
  const [startCountdown, setStartCountdown] = useState(false); // New state to trigger countdown

  // Input change handlers
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('All fields are required!');
      return;
    }

    setError('');
    setIsSignedIn(true);
    setShowInstructions(true); // Show the instructions modal after successful login
  };

  // Countdown effect
  useEffect(() => {
    let timer;
    if (startCountdown && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    }

    return () => clearTimeout(timer); 
  }, [startCountdown, countdown]);

  // Close instructions and start countdown
  const closeInstructions = () => {
    setShowInstructions(false); // Hide the instructions modal
    setStartCountdown(true);    // Start the countdown
  };

  return (
    <div className="container">
      

      <main className="login-section">
        {!isSignedIn ? (
          <form onSubmit={handleSubmit}>
            <div className="input-form">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Enter your username"
              />
            </div>

            <div className="input-form">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="input-form">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="submit-button">Login</button>
          </form>
        ) : showInstructions ? (
          <InstructionsModal onClose={closeInstructions} />
        ) : countdown > 0 ? (
          <p className="countdown-message">Starting game in {countdown}...</p>
        ) : (
          <GameBoard />
        )}
      </main>
    </div>
  );
}

export default Login;
