// src/components/MatchList.js

import React from 'react';
import './MatchList.css'; // Optional: for styling

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
                                className={`match-team ${predictions[match.id] === match.team1.name ? 'selected' : ''}`} 
                                onClick={() => onSelectTeam(match.team1.name, match.id)} // Clickable team 1
                            >
                                <img 
                                    src={`/team_logos/${match.team1.logo}`} 
                                    alt={match.team1.name} 
                                    className="team-logo" 
                                />
                                {match.team1.name}
                            </span>
                            <span className="match-vs"> vs </span>
                            <span 
                                className={`match-team ${predictions[match.id] === match.team2.name ? 'selected' : ''}`} 
                                onClick={() => onSelectTeam(match.team2.name, match.id)} // Clickable team 2
                            >
                                <img 
                                    src={`/team_logos/${match.team2.logo}`} 
                                    alt={match.team2.name} 
                                    className="team-logo" 
                                />
                                {match.team2.name}
                            </span>
                            <span className="match-date">
                                {new Date(match.match_date).toLocaleString([], { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric', 
                                    hour: 'numeric', 
                                    minute: 'numeric', 
                                    hour12: true 
                                })}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MatchList;
