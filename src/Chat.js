import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import UsernameScreen from './UsernameScreen';

const socket = io.connect('https://chat-backend-j17gzk3w7-freddies-projects-5375213d.vercel.app');

function Chat() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const onChatMessage = (data) => {
            // Use a functional update for chat
            setChat((prevChat) => [...prevChat, data]);
        };

        socket.on('chat message', onChatMessage);

        // Cleanup to remove the event listener
        return () => {
            socket.off('chat message', onChatMessage);
        };
    }, []);

    const onTextChange = (e) => {
        setMessage(e.target.value);
    };

    const onMessageSubmit = (e) => {
        e.preventDefault();
        const timestamp = new Date().toLocaleTimeString();
        socket.emit('chat message', { user: username, msg: message, timestamp: timestamp });
        setMessage('');
    };

    if (!username) {
        return <UsernameScreen onUsernameSubmit={setUsername} />;
    }

    return (
        <div className="chat-container">
            <h2>Chat App</h2>
            <div className="chat-messages">
                {chat.map((data, idx) => (
                    <div key={idx} className={`message-bubble ${data.user === username ? 'outgoing' : 'incoming'}`}>
                        <p><strong>{data.user}</strong>: {data.msg}</p>
                        <span className="timestamp">{data.timestamp}</span>
                    </div>
                ))}
            </div>
            <form onSubmit={onMessageSubmit} className="chat-input-form">
                <input
                    value={message}
                    onChange={onTextChange}
                    placeholder="Enter your message..."
                />
                <button>Send</button>
            </form>
        </div>
    );
}

export default Chat;
