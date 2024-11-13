import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import Signup from './Signup';
import Login from './Login';

const LandingPage = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        setShowLogin(false);
        navigate('/user-dashboard');
    };

    const handleSignup = () => {
        setShowSignup(false);
        setShowLogin(true);
    };

    return (
        <div>
            <header className="navbar">
                <div className="logo">Stock Management</div>
                <div className="nav-buttons">
                    <button 
                        className="login-btn" 
                        onClick={() => { 
                            setShowLogin(true); 
                            setShowSignup(false); 
                        }}
                    >
                        Login
                    </button>
                    <button 
                        className="signup-btn" 
                        onClick={() => { 
                            setShowSignup(true); 
                            setShowLogin(false); 
                        }}
                    >
                        Sign Up
                    </button>
                </div>
            </header>

            <main className="dashboard-content">
                {showSignup && <Signup onSignup={handleSignup} />}
                {showLogin && <Login onLogin={handleLogin} />}
                
                {!showSignup && !showLogin && (
                    <>
                        <section className="dashboard-overview">
                            <h1>Welcome to Your Stock Management</h1>
                            <p>
                                Streamline your inventory control with real-time monitoring, 
                                insights, and powerful management tools.
                            </p>
                            
                            <div className="feature-list">
                                <div className="feature-item">
                                    <span className="feature-icon">📊</span>
                                    <h3>Real-Time Stock Monitoring</h3>
                                    <p>
                                        Get instant visibility into your inventory levels 
                                        with our real-time monitoring system.
                                    </p>
                                </div>

                                <div className="feature-item">
                                    <span className="feature-icon">🔔</span>
                                    <h3>Smart Alerts</h3>
                                    <p>
                                        Never run out of stock with intelligent alerts 
                                        and predictive inventory notifications.
                                    </p>
                                </div>

                                <div className="feature-item">
                                    <span className="feature-icon">📈</span>
                                    <h3>Advanced Analytics</h3>
                                    <p>
                                        Make data-driven decisions with comprehensive 
                                        reports and actionable insights.
                                    </p>
                                </div>

                                <div className="feature-item">
                                    <span className="feature-icon">➕</span>
                                    <h3>Seamless Management</h3>
                                    <p>
                                        Effortlessly manage your inventory with our 
                                        intuitive stock management tools.
                                    </p>
                                </div>

                                <div className="feature-item">
                                    <span className="feature-icon">🔄</span>
                                    <h3>Automated Reordering</h3>
                                    <p>
                                        Set up automatic reorder points and let our system 
                                        handle inventory replenishment for you.
                                    </p>
                                </div>

                                <div className="feature-item">
                                    <span className="feature-icon">📱</span>
                                    <h3>Mobile Access</h3>
                                    <p>
                                        Manage your inventory on the go with our 
                                        mobile-responsive platform and real-time updates.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="stats-section">
                            <div className="stats-grid">
                                <div className="stat-item">
                                    <div className="stat-number">10,000+</div>
                                    <div className="stat-label">Active Users</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">1M+</div>
                                    <div className="stat-label">Items Tracked</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">99.9%</div>
                                    <div className="stat-label">Uptime</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">24/7</div>
                                    <div className="stat-label">Support</div>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </main>

            <footer className="footer">
                <p>&copy; 2024 Stock Management. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
