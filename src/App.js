// src/App.js

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MatchList from './components/MatchList';
import Leaderboard from './components/Leaderboard';
import './App.css'; // Import the main CSS file

const App = () => {
    const [matches, setMatches] = useState([]);
    const [users, setUsers] = useState([]);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [predictions, setPredictions] = useState({}); // State to store predictions by match ID
    const [message, setMessage] = useState(''); // State to store feedback message

    useEffect(() => {
        // Mock data for matches
        const fetchMatches = async () => {
            const mockData = [
                { id: 1, team1: 'Team A', team2: 'Team B', match_date: '2023-10-01T15:00:00Z' },
                { id: 2, team1: 'Team C', team2: 'Team D', match_date: '2023-10-02T17:00:00Z' },
                { id: 3, team1: 'Team E', team2: 'Team F', match_date: '2023-10-03T19:00:00Z' },
            ];
            setMatches(mockData);
        };

        // Mock data for users
        const fetchUsers = async () => {
            const mockUsers = [
                { id: 1, username: 'User1', points: 10 },
                { id: 2, username: 'User2', points: 20 },
                { id: 3, username: 'User3', points: 15 },
            ];
            setUsers(mockUsers);
        };

        fetchMatches();
        fetchUsers();
    }, []);

    // Function to handle team selection
    const handleSelectTeam = (team, matchId) => {
        setPredictions(prevPredictions => ({
            ...prevPredictions,
            [matchId]: team // Store the selected team for the specific match ID
        }));
    };

    // Function to send predictions to the database
const handleSendPredictions = async () => {
    const userId = 'user1'; // Hardcoded user ID for simplicity
    const predictionEntries = Object.entries(predictions).map(([matchId, team]) => ({
        userId,
        matchId,
        team,
    }));

    // Validation: Check if all matches have predictions
    if (Object.keys(predictions).length !== matches.length) {
        setMessage('Please select predictions for all matches.'); // Prompt error if not all matches are selected
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/predictions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(predictionEntries),
        });

        if (response.ok) {
            setMessage('Predictions saved successfully!');
        } else {
            setMessage('Failed to save predictions.');
        }
    } catch (error) {
        console.error('Error:', error);
        setMessage('Error saving predictions.');
    }
};


    return (
        <div className="app-container">
            <Header onToggle={setShowLeaderboard} />
            <div className="content-container">
                {showLeaderboard ? (
                    <Leaderboard users={users} />
                ) : (
                    <>
                        <MatchList matches={matches} onSelectTeam={handleSelectTeam} predictions={predictions} />
                        <div className="predictions-container">
                            <h3>Your Predictions</h3>
                            {matches.map((match, index) => (
                                <p key={match.id}>
                                    <strong>Match {index + 1}: </strong> 
                                    <span className={predictions[match.id] ? 'selected-team' : ''}>
                                        {predictions[match.id] ? predictions[match.id] : '(no selections yet)'}
                                    </span>
                                </p>    
                            ))}
                            <button onClick={handleSendPredictions}>Submit Predictions</button>
                            {message && <p className="feedback-message">{message}</p>} {/* Display feedback message */}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default App;
