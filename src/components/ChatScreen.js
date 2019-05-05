import React, { Component } from 'react';
import '../Css/ChatScreen.css'

class ChatScreen extends Component {
    
    render() {
        var {name} = this.props;
        return (
            <div className="mainChatScreen">
                <div className = "chatNavBar">
                    <h1>{name}</h1>
                </div>
                <div className="message">
                    chat message
                </div>
                <div className="controlBar">
                    <input type='text' />
                    <button onClick={() => console.log("Send")}>Send</button>
                </div>
            </div>
        );
    }
}

export default ChatScreen;