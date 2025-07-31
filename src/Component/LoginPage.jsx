import React, { useState, useEffect } from 'react';

export default function LoginPage({ onLogin = () => {} }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = { email, password };
      const response = await fetch('https://hook.us2.make.com/a3j75nc4ieo5p9b3m35ntsm3eifvuyet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to login');
      onLogin();
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const sheet = document.styleSheets[0];
    if (sheet) {
      sheet.insertRule(`
        @keyframes fadeSlide {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `, sheet.cssRules.length);
    }
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.innerContainer}>
        <div style={styles.leftColumn}>
          <img
            src="Image/MainLogo1.jpg" 
            alt="Logo"
            style={styles.logo}
          />
        </div>
        <div style={styles.card}>
          <h2 style={styles.title}>Login</h2>
          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
              <div style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p style={styles.error}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="gray" viewBox="0 0 24 24">
      <path d="M12 4.5C7.5 4.5 3.46 7.36 1.5 12c1.96 4.64 6 7.5 10.5 7.5s8.54-2.86 10.5-7.5C20.54 7.36 16.5 4.5 12 4.5Zm0 12a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0-7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"/>
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="gray" viewBox="0 0 24 24">
      <path d="M2.1 3.51 0.69 4.92 3.17 7.4C1.63 9.13.5 10.97.5 12c0 .62 1.26 2.79 3.5 4.6C6.5 18.79 9.26 20 12 20c2.01 0 3.98-.68 5.72-1.96l2.36 2.36 1.41-1.41-19.39-19.48ZM12 6c1.03 0 2.03.25 2.91.71L12.7 9.28a2 2 0 0 0-2.42 2.42l-2.56 2.56C6.25 13.23 5 11.77 5 12c0-1.03 2.27-5 7-5Zm0 10c-1.17 0-2.26-.34-3.17-.9l1.53-1.53A2 2 0 0 0 12 14a2 2 0 0 0 2-2c0-.34-.08-.65-.2-.93l1.55-1.55c.62.79 1.09 1.66 1.37 2.48.17.52.28 1.07.28 1.64 0 .23-1.25 1.69-3.28 2.56A7.96 7.96 0 0 1 12 16Z"/>
    </svg>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    padding: '1rem',
  },
  innerContainer: {
    display: 'flex',
    width: '90%',
    maxWidth: '900px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
    animation: 'fadeSlide 0.6s ease forwards',
    backgroundColor: '#ffffff20',
    backdropFilter: 'blur(12px)',
  },
  leftColumn: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  logo: {
    width: '100%',
    maxWidth: '100%',
    height: 'auto',
  },
  card: {
    flex: 1,
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#fff',
  },
  title: {
    fontSize: '26px',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '12px 14px',
    borderRadius: '8px',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#fff',
    backdropFilter: 'blur(4px)',
    transition: '0.3s',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    top: '50%',
    right: '14px',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    fontSize: '18px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#4c51bf',
    border: 'none',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    borderRadius: '8px',
    transition: 'background-color 0.3s',
  },
  error: {
    color: 'salmon',
    fontSize: '14px',
    marginTop: '0.5rem',
    textAlign: 'center',
  },
};
