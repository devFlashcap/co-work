import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { callReceivedSet } from '../actions/action.group.call';
import { modalStyles } from '../style/modal';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class ModalCallReceived extends Component
{
    onAnswer(){
        const groupID = this.props.callReceived;
        this.props.callReceivedSet({groupID: null});
        this.props.history.push("/groupcall/" + groupID);
        this.onClose();
    }

    onDecline(){
        this.props.callReceivedSet({groupID: null});
        this.onClose();
    }

    onClose(){
        
    }

    renderMessage(){
        if(this.props.callReceived !== null){
            console.log('not null');
            const groupIndex = this.props.groups.groups.findIndex(g => g._id == this.props.callReceived);
            if(groupIndex >= 0){
                console.log('found');
                console.log(this.props.groups.groups);
                return (
                    <p>{"Incoming call from group " + this.props.groups.groups[groupIndex].name}</p>
                );
            }
        }
    }

    render(){
        return (
            <Modal
                isOpen={this.props.callReceived !== null}
                onRequestClose={() => this.onClose()}
                style={modalStyles}
                contentLabel="Call received"
            >
                {this.renderMessage()}
                <button className = "btn btn-success mx-1" onClick = {() => this.onAnswer()}>Answer</button>
                <button className = "btn btn-danger mx-1" onClick = {() => this.onDecline()}>Decline</button>
            </Modal>
        );
    }
}

ModalCallReceived.propTypes = {
    callReceivedSet: PropTypes.func.isRequired,
    groups: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    callReceived: state.callReceived,
    groups: state.groups
});

export default withRouter(connect(
    mapStateToProps,
    {
        callReceivedSet
    }
)(ModalCallReceived));