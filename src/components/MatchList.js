// src/components/MatchList.js

import React from 'react';
import './MatchList.css'; // Import the CSS for styling

const MatchList = ({ matches, onSelectTeam, predictions }) => {
    return (
        <div className="match-list">
            <h2>Upcoming Matches</h2>
            {matches.length === 0 ? (
                <p>No upcoming matches available.</p>
            ) : (
                <ul>
                    {matches.map(match => (
                        <li key={match.id} className="match-item">
                            <span 
                                className={`match-team ${predictions[match.id] === match.team1 ? 'selected' : ''}`} 
                                onClick={() => onSelectTeam(match.team1, match.id)} // Clickable team 1
                            >
                                <img 
                                    src={`/team_logos/${match.team1.toLowerCase().replace(' ', '')}.png`} 
                                    alt={match.team1} 
                                    className="team-logo" 
                                />
                                {match.team1}
                            </span>
                            <span className="match-vs"> vs </span>
                            <span 
                                className={`match-team ${predictions[match.id] === match.team2 ? 'selected' : ''}`} 
                                onClick={() => onSelectTeam(match.team2, match.id)} // Clickable team 2
                            >
                                <img 
                                    src={`/team_logos/${match.team2.toLowerCase().replace(' ', '')}.png`} 
                                    alt={match.team2} 
                                    className="team-logo" 
                                />
                                {match.team2}
                            </span>
                            <span className="match-date">
                                {new Date(match.match_date).toLocaleString()}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MatchList;
