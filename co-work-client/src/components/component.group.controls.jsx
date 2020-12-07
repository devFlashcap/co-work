import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { chatMessageSend } from '../actions/action.chat.message';
import SentimentVerySatisfiedIcon  from 'mdi-react/SentimentVerySatisfiedIcon';
import MicrophoneIcon from 'mdi-react/MicrophoneIcon';
import SendIcon from 'mdi-react/SendIcon';
import '../style/GroupControls.css';

class GroupControls extends Component 
{
    constructor(){
        super();

        this.state = {
            message: ""
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        this.setState({
            message: ''
        })
        const data = {
            groupID: this.props.groups.currentGroup._id,
            sender: this.props.auth.user.id,
            type: "text",
            message: this.state.message
        }
        this.props.chatMessageSend(data);
    }

    render()
    {
        return (
            <form 
                onSubmit = {this.onSubmit}
                ref={ (ref) => { this.form = ref; } }>
                <div className="chat-box-controls">
                    <input 
                        type="text" 
                        placeholder="Type here..."
                        id = "message"
                        className = "form-control custom-control" 
                        value = { this.state.message }
                        onChange = { this.onChange }
                    />
                    <button type = "submit" className = "btn btn-primary">Send</button>
                </div>
            </form>
        );
    }
}

GroupControls.propTypes = {
    auth: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    groups: state.groups,
    messages: state.messages,
});

export default connect(
    mapStateToProps,
    {
        chatMessageSend
    }
)(GroupControls);