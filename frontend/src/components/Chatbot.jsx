import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const chatEndRef = useRef(null);

    // A simple function to generate a response based on keywords
    const getBotResponse = (input) => {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
            return 'Hello! How can I help you today?';
        }
        if (lowerInput.includes('help')) {
            return 'You can ask me about DPR, risk analysis, or the purpose of this portal.';
        }
        if (lowerInput.includes('dpr')) {
            return 'DPR stands for Detailed Project Report. It is essential for project approval and funding.';
        }
        if (lowerInput.includes('risk')) {
            return 'This portal uses AI to analyze DPRs for risks like cost overruns and delays.';
        }
        return "Sorry, I don't understand. You can ask about DPR or risk analysis.";
    };

    // Set the initial greeting when the chat opens
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{ text: 'Hello! How can I help you today?', sender: 'bot' }]);
        }
        // Scroll to the latest message
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [isOpen, messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        const userMessage = { text: inputValue, sender: 'user' };
        const newMessages = [...messages, userMessage];

        setMessages(newMessages);
        setInputValue('');

        // Simulate bot thinking time
        setTimeout(() => {
            const botResponse = { text: getBotResponse(inputValue), sender: 'bot' };
            setMessages([...newMessages, botResponse]);
        }, 1000);
    };

    return (
        <div className="chatbot-container">
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <p>MDoNER Assistant</p>
                        <button onClick={() => setIsOpen(false)}>&times;</button>
                    </div>
                    <div className="chat-body">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.sender}`}>
                                <p>{msg.text}</p>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                    <form className="chat-input" onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}
            <button className="chat-fab" onClick={() => setIsOpen(!isOpen)}>
                <i className={`fas ${isOpen ? 'fa-times' : 'fa-comments'}`}></i>
            </button>
        </div>
    );
};

export default Chatbot;