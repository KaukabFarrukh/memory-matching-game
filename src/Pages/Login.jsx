import React, { useState, useEffect } from 'react';
import './Login.css';

function Login(){

    const [username , setUsername]= useState("");
    const [email , setEmail]= useState("");
    const [Password , setPassword]= useState("");
    const [isSignedIn , setisSignedIn]= useState("");
    const [countdown, setcountdown]= useState("3");

   
    return (
        <div className="container">
          <header className="header">
            <h2> Matching Game Login</h2>
          </header>
    
          <main className="login-section">
            <form onSubmit={handleSubmit}>
              <div className="input-form">
                <label userInput="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Enter your username"
                />
              </div>

              <div className="input-form">
              <label userInpu="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
              />
            </div>
    
              <div className="input-form">
                <label userInpu="password">Password</label>
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
            <p>Welcome, {username}! You are now logged in.</p>
          </main>
          </div>
  );
}
export default Login;
