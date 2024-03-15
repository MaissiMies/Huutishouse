import React from 'react';
import './Chat.css';

function ChatComponent() {




    
    return (
        <main className="chat-main"> 
            <form className="form-join">
                <input type="text" id="name" maxLength="8" placeholder="Käyttäjä nimi" size="5" required />
                <input type="text" id="room" placeholder="Chat huone" size="5" required />
                <button id="join" type="submit">Liity</button>
            </form>
            <ul className="chat-display"></ul>
            <p className="user-list"></p>
            <p className="room-list"></p>
            <p className="activity"></p>
            <form className="form-msg">
                <input type="text" id="message" placeholder="Viesti" required />
                <button type="submit">Lähetä</button>
            </form>
        </main>
    );      
}

export default ChatComponent;