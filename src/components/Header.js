// src/components/Header.js

import React from 'react';
import './Header.css'; // Optional: for styling

const Header = ({ onToggle }) => {
    return (
        <header className="header">
            <img src="bmw_logo.png" alt="Logo" className="header-logo" /> {/* Add your logo here */}
            <h1 className="header-title">TX-841 Match Predictor</h1>
            <nav className="header-nav">
                <ul>
                    <li>
                        <button onClick={() => onToggle(false)}>Show Matches</button>
                    </li>
                    <li>
                        <button onClick={() => onToggle(true)}>Show Leaderboard</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
