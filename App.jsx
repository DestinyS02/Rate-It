import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }

    // Check if the user is already logged in
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/check-session', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok && data.loggedIn) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    checkSession();
  }, []);

  const GoogleLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.33-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.67 28.18c-.72-2.16-1.17-4.46-1.17-6.88s.45-4.72 1.17-6.88V8.72H4.34A23.95 23.95 0 0 0 0 24c0 3.88.93 7.54 2.56 10.78l7.11-5.6z" />
      <path fill="#EA4335" d="M24 9.5c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 2.91 29.93 0 24 0 15.4 0 7.96 4.93 4.34 12.22l7.33 5.7C13.42 13.37 18.27 9.5 24 9.5z" />
    </svg>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setLoginError('Please enter both email and password');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLoginError('Please enter a valid email address');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        //alert('Login Successful!');
        setIsLoggedIn(true);
      } else {
        setLoginError(data.error || 'Login failed');
      }
    } catch (error) {
      setLoginError('An error occurred while logging in');
    }
  };

  const handleGoogleLogin = () => {
    alert('Google Login Clicked');
  };

  const handleAppleLogin = () => {
    alert('Apple Login Clicked');
  };

  const handleEmailLinkLogin = () => {
    alert('Email Link Login Clicked');
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
       // alert('Logged out successfully');
        setEmail('');
        setPassword('');
        setRememberMe(false);
        setIsLoggedIn(false);
        localStorage.removeItem('rememberedEmail');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="welcome-container">
        <h1>Hello, {email}!</h1>
        <button onClick={handleLogout} className="logout-btn">
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className="login-container">
      <header className="header">
        <div className="header-branding">
          <img src="/assets/logo4.png" alt="Rateit Logo" className="logo" />
        </div>
      </header>

      <div className="login-box">
        <div className="login-header">
          <img src="/assets/logo4.png" alt="Rateit Logo" className="logo" />
          <h2>Log in to Rateit</h2>
          <p>
            By continuing, you agree to Rateit's <a href="#">Terms of Service</a> and
            acknowledge Rateit's <a href="#">Privacy Policy</a>.
          </p>
        </div>

        <div className="login-options">
          <form className="login-form" onSubmit={handleSubmit}>
            {loginError && <div className="input-error">{loginError}</div>}

            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setLoginError('');
              }}
            />

            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setLoginError('');
              }}
            />

            <div className="remember-me-container">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <button type="submit" className="login-btn primary">
              Log In
            </button>
          </form>

          <div className="separator">OR</div>

          <button className="login-btn google" onClick={handleGoogleLogin}>
            <GoogleLogo />
            <span style={{ marginLeft: '10px' }}>Continue with Google</span>
          </button>

          <button className="login-btn apple" onClick={handleAppleLogin}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="Apple logo"
              style={{ height: '20px', marginRight: '10px', filter: 'invert(1)' }}
            />
            Continue with Apple
          </button>

          <a
            href="#"
            className="email-link"
            onClick={(e) => {
              e.preventDefault();
              handleEmailLinkLogin();
            }}
          >
            Login via email link
          </a>

          <p className="signup-text">
            New to Rateit? <a href="#">Sign up</a>
          </p>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-links">
          <div>
            <h4>About</h4>
            <ul>
              <li><a href="#">About Rateit</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Investor Relations</a></li>
            </ul>
          </div>
          <div>
            <h4>Discover</h4>
            <ul>
              <li><a href="#">Rateit Project Cost Guides</a></li>
              <li><a href="#">Collections</a></li>
              <li><a href="#">Talk</a></li>
              <li><a href="#">Events</a></li>
            </ul>
          </div>
          <div>
            <h4>Rateit for Business</h4>
            <ul>
              <li><a href="#">Rateit for Business</a></li>
              <li><a href="#">Business Owner Login</a></li>
              <li><a href="#">Claim your Business Page</a></li>
              <li><a href="#">Advertise on Rateit</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
