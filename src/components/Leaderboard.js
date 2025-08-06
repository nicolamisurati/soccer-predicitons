// src/components/Leaderboard.js

import React from 'react';
import './Leaderboard.css'; // Import the CSS for styling

const Leaderboard = ({ users }) => {
    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>
            {users.length === 0 ? (
                <p>No users available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Username</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Leaderboard;
