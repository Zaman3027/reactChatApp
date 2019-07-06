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
                <div className="controlBar form-inline">
                    <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" type='text' style={{width:500,marginLeft:20}} />
                    <button style={{marginLeft:10}} type="button" class="btn btn-success" onClick={() => console.log("Send")}>Send</button>
                </div>
            </div>
        );
    }
}

export default ChatScreen;