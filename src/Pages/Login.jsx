import React, { useState , useEffect  } from 'react';
import './Login.css';
import GameBoard from '../components/GameBoard';

function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(3); 


  
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('All fields are required!');
      return;
    }
 
    setError('');
    setIsSignedIn(true);
  };
  useEffect(() => {
    let timer;
    if (isSignedIn && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    }

    return () => clearTimeout(timer); 
  }, [isSignedIn, countdown]);


  return (
    <div className="container">
      <header className="header">
        <h2>Matching Game Login</h2>
      </header>

      <main className="login-section">
        {/* Instructions Section */}
        {!isSignedIn && (
          <section className="instructions">
            <h2>Instructions</h2>
            <h3>Find matching pairs and earn points!</h3>
            <ul>
              <li><strong>How to Play:</strong> When the game starts, you will see cards randomly placed on the screen. Each card has a color on its back.</li>
              <li><strong>Match the cards:</strong> If the cards you select match, they will remain open, and you earn points.</li>
              <li><strong>Mismatch:</strong> If the cards do not match, they will be closed again.</li>
              <li><strong>Time Limit:</strong> You have only 15 seconds to complete all the matches!</li>
              <li><strong>Tips:</strong> Use your memory to remember where you saw the cards. Be quick and careful!</li>
              <li><strong>Ready?</strong> After entering your details, click the Login button to start matching.</li>
            </ul>
          </section>
        )}
         {/* Login Form */}
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
