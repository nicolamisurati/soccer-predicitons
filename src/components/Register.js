// src/components/Register.js

import React, { useState } from 'react';

const Register = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                setMessage('Registration successful! You can now log in.');
                onRegister(); // Call the onRegister function passed as a prop
            } else {
                setMessage('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error registering user.');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
            <button type="submit">Register</button>
            {message && <p>{message}</p>} {/* Display feedback message */}
        </form>
    );
};

export default Register;
