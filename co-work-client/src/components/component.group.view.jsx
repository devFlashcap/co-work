import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GroupControls from './component.group.controls';
import GroupOperations from './component.group.operations';
import { groupLeave } from '../actions/action.group';
import { animateScroll } from "react-scroll";
import '../style/GroupView.css';

class GroupView extends Component 
{
    constructor(props){
        super(props);
        this.state = {
            currentGroup: {},
            messages: []
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.messages !== prevProps.messages){
            this.scrollToBottom();
        }
    }

    scrollToBottom() {
        animateScroll.scrollToBottom({
            containerId: "messages"
        });
    }


    componentWillUnmount(){
        this.props.groupLeave({type: "chat", groupID: this.props.groups.currentGroup._id});
    }

    render()
    {
        const messages = this.props.messages.messages ? this.props.messages.messages.map((message) => {
        const clsBubble = message.sender._id === this.props.auth.user.id ? 'chat-bubble-left' : 'chat-bubble-right';

        return (
            <div className = "row p-0" key = {message._id}>
                <div className = 'col'>
                    <div className = {clsBubble}>
                        <p className = "send_info">{message.sender.full_name}</p>
                        <p className = "message">{message.message}</p>
                    </div>
                </div>
            </div>
            );
        }) : null;

        const groupName = (this.props.groups && this.props.groups.currentGroup && this.props.groups.currentGroup.name) ? this.props.groups.currentGroup.name : "Group name";
        return (
            <div className="chat-container p-0">
                <div className="row p-0 m-0">
                    <div className="col-md-3">
                        <GroupOperations />
                    </div>
                    <div className="col-md-9 chat-panel">
                        <div className="group-header">
                            <div className="group-name">
                                <h3>{groupName}</h3>
                            </div>
                        </div>
                        <div id = "messages" className="messages" onClick = {() => this.scrollToBottom()}>
                            {messages}
                        </div>
                        <GroupControls />
                    </div>
                </div>
            </div>
        );
    }
}

GroupView.propTypes = {
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
        groupLeave,
    }
)(GroupView);