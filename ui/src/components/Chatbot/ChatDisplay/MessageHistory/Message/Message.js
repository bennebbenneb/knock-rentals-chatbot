import React from 'react';
import smoothScroll from 'smoothscroll';

class Message extends React.Component {
    componentDidMount(){
        if (this.refs[this.props.id]) {
            smoothScroll(this.refs[this.props.id])
        }
    }
    render() {
       return (
            <div ref={this.props.id} className={this.props.isBot ? "bot-message" : "user-message"}>
                <p>{this.props.text}</p>
            </div>

        );
    }
}

export default Message