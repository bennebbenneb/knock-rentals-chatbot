import React from 'react';
import MessageHistory from "./MessageHistory/MessageHistory";

class ChatDisplay extends React.Component {
    render() {
        return (
            <div ref="chatDisplay" className="chat-display">
                <MessageHistory/>
            </div>
        );
    }
}

export default ChatDisplay