import React, { useState } from 'react';
import './UsernameScreen.css';

function UsernameScreen({ onUsernameSubmit }) {
    const [username, setUsername] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        onUsernameSubmit(username);
    };

    return (
        <div className="username-screen">
            <div className="username-container">
                <h2 className="username-title">Enter Username</h2>
                <input
                    type="text"
                    className="username-input"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button className="username-button" onClick={onSubmit}>
                    Join Chat
                </button>
            </div>
        </div>
    );
}

export default UsernameScreen;
