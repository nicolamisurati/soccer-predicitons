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
    const [username, setUsername] = useState(''); // State to store username
    const [message, setMessage] = useState(''); // State to store feedback message

    useEffect(() => {
        // Mock data for matches
        const fetchMatches = async () => {
        const mockData = [
            { id: 1, team1: { name: 'Green Bay Packers', logo: 'teamA.png' }, team2: { name: 'Philadelphia Eagles', logo: 'teamB.png' }, match_date: '2025-10-01T15:00:00Z', winningTeam: 'Team A' },
            { id: 2, team1: { name: 'Atlanta Falcons', logo: 'teamC.png' }, team2: { name: 'Cleveland Browns', logo: 'teamD.png' }, match_date: '2025-10-02T17:00:00Z', winningTeam: 'Team D' },
            { id: 3, team1: { name: 'Carolina Panthers', logo: 'teamE.png' }, team2: { name: 'Jacksonville Jaguars', logo: 'teamF.png' }, match_date: '2025-10-03T19:00:00Z', winningTeam: 'Team E' },
            { id: 4, team1: { name: 'Jacksonville Jaguars', logo: 'teamF.png' }, team2: { name: 'Los Angeles Chargers', logo: 'teamG.png' }, match_date: '2025-10-02T17:00:00Z', winningTeam: 'Team G' },
            { id: 5, team1: { name: 'Cincinnati Bengals', logo: 'teamH.png' }, team2: { name: 'Kansas City Chiefs', logo: 'teamI.png' }, match_date: '2025-10-03T19:00:00Z', winningTeam: 'Team ' },
        ];

            setMatches(mockData);
        };

        // Mock data for users
        const fetchUsers = async () => {
            const mockUsers = [
                { id: 1, username: 'User1', points: 20 },
                { id: 2, username: 'User2', points: 15 },
                { id: 3, username: 'User3', points: 10 },
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
        const predictionEntries = Object.entries(predictions).map(([matchId, team]) => ({
            userId: username.trim(), // Use the entered username
            matchId,
            team,
        }));

        // Validation: Check if username is provided and all matches have predictions
        if (!username.trim()) {
            setMessage('Please enter your username.'); // Prompt error if username is empty
            return;
        }

        if (Object.keys(predictions).length !== matches.length) {
            setMessage('Please select predictions for all matches.'); // Prompt error if not all matches are selected
            return;
        }

        try {
            console.log('Sending predictions:', predictionEntries);
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
                            <input 
                                type="text" 
                                placeholder="Enter your username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                            <div style={{ margin: '10px 0' }} /> {/* Spacer div */}
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
