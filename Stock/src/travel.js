import React, { Component } from 'react';
import './make.css'; // Assuming you have an external CSS file for styles

class Apps extends Component {
    state = {
        currentPage: 'login', // Start with the login page
        users: [], // To store registered users
        bookings: [],
        loggedInUser: null, // To track the logged-in user
    };

    navigateTo = (page) => {
        this.setState({ currentPage: page });
    };

    handleLogin = (email, password) => {
        const user = this.state.users.find((user) => user.email === email && user.password === password);
        if (user) {
            this.setState({ loggedInUser: user, currentPage: 'home' });
        } else {
            alert('Invalid email or password');
        }
    };

    handleSignup = (email, password, name) => {
        const existingUser = this.state.users.find((user) => user.email === email);
        if (existingUser) {
            alert('User already exists! Please log in.');
        } else {
            this.setState((prevState) => ({
                users: [...prevState.users, { email, password, name }],
                currentPage: 'login',
            }));
        }
    };

    render() {
        const { currentPage, bookings, loggedInUser } = this.state;

        return (
            <div>
                {currentPage === 'login' && <Login onLogin={this.handleLogin} onNavigateToSignup={() => this.navigateTo('signup')} />}
                {currentPage === 'signup' && <Signup onSignup={this.handleSignup} />}
                {currentPage === 'home' && loggedInUser && <Home userProfile={loggedInUser} onNavigateToBookTicket={() => this.navigateTo('book')} />}
                {currentPage === 'book' && loggedInUser && (
                    <BookTicket userProfile={loggedInUser} onBookingSubmit={this.handleBookingSubmit} onNavigateToMyBookings={() => this.navigateTo('myBookings')} />
                )}
                {currentPage === 'myBookings' && loggedInUser && <MyBookings bookings={bookings} />}
            </div>
        );
    }
}

// Login Component
class Login extends Component {
    state = {
        email: '',
        password: '',
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onLogin(this.state.email, this.state.password);
    };

    render() {
        const { email, password } = this.state;

        return (
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                        required
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <span className="link" onClick={this.props.onNavigateToSignup}>Sign up</span></p>
            </div>
        );
    }
}

// Signup Component
class Signup extends Component {
    state = {
        email: '',
        password: '',
        name: '',
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSignup(this.state.email, this.state.password, this.state.name);
    };

    render() {
        const { email, password, name } = this.state;

        return (
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                        required
                    />
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                        required
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        );
    }
}

// Other components (Home, BookTicket, MyBookings, etc.) remain the same as in your previous code.

export default Apps;
