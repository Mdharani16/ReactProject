import React, { useState } from 'react';
import '../styles.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/users?username=${username}`);
            const data = await response.json();

            if (data.length > 0) {
                const user = data[0];
                if (user.password === password) {
                    onLogin();
                } else {
                    setError('Incorrect password');
                }
            } else {
                setError('User does not exist');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to log in. Please check your connection.');
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
