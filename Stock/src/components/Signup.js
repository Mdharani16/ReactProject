import React, { useState } from 'react';
import '../styles.css';

const Signup = ({ onSignup }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/; // At least 6 characters, one letter, one number, one special character
        return passwordRegex.test(password);
    };

    const validateUsername = (username) => {
        const usernameRegex = /^[A-Za-z0-9]+$/; // Only letters and numbers
        return usernameRegex.test(username);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        
        if (!validateUsername(username)) {
            setError('Username can only contain letters and numbers.');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must be at least 6 characters long and include at least one letter, one number, and one special character.');
            return;
        }

        const userData = { username, password };
        
        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                onSignup();
            } else {
                setError('Failed to sign up. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to sign up. Please check your connection.');
        }
    };

    return (
        <div className="form-container">
            <h2>Sign Up</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSignup}>
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
