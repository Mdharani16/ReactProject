import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import UserDashboard from './components/UserDashboard';
import AddStock from './components/AddStock';
import EditStock from './components/EditStock'; 
import StockChart from './components/StockChart';
import './styles.css';
import { ThemeProvider } from './components/ThemeContext';

const App = () => {
    return (
        <ThemeProvider>
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                
                <Route path="/user-dashboard" element={<UserDashboard />} />
              
                <Route path="/add-stock" element={<AddStock />} />
                <Route path="/edit-stock" element={<EditStock />} /> 
                <Route path="/chart" element={<StockChart />} />
            </Routes>
        </Router>
        </ThemeProvider>
    );
};

export default App;

