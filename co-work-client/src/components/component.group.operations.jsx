import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from 'react-avatar';
import { ADMIN_LEVEL } from '../config/keys';
import { userSelectionLoad } from '../actions/action.user.selection';
import { 
    groupMembersAdd,
    groupMembersRemove
} from '../actions/action.group';
import Select from 'react-select'
import '../style/Operations.css';

class GroupOperations extends Component 
{
    constructor(){
        super();
        this.state = {
            addMembers: [],
            removeMembers: [],
        }
    }


    componentDidMount(){
        this.props.userSelectionLoad({
            userID: this.props.auth.user.id,
            condition: "CONDITION_ALL"
        });
    }

    onChangeSelectAddMembers = select => {
        this.setState({ addMembers: select ? select.map(o => o.value) : [] });
    }

    onChangeSelectRemoveMembers = select => {
        this.setState({ removeMembers: select ? select.map(o => o.value) : [] });
    }

    onAddMembers(){
        const data = {
            groupID: this.props.groups.currentGroup._id,
            memberIDs: this.state.addMembers
        };
        this.props.groupMembersAdd(data);
    }

    onRemoveMembers(){
        const data = {
            groupID: this.props.groups.currentGroup._id,
            memberIDs: this.state.removeMembers
        };
        this.props.groupMembersRemove(data);
    }

    renderCallButton(){
        if(this.props.groups && this.props.groups.currentGroup){
            return (
                <ul>
                    <li>
                        <p>
                            <Link className = "btn btn-block btn-primary my-3" target="_blank" to = {"/groupcall/" + this.props.groups.currentGroup._id}>
                                {this.props.callsInProgress.includes(this.props.groups.currentGroup._id) ? "Join call" : "Video call"}
                            </Link>
                        </p>
                    </li>
                </ul>
            );
        }
    }

    render()
    {
        let inviteOptions = [];
        let removeOptions = []
        if(this.props.groups && this.props.groups.currentGroup){
            const renderMemberAddRemove = () => { 
                if(this.props.auth.user.id === this.props.groups.currentGroup.leader){
                    const { userSelection } = this.props;
                    for(const user of userSelection.users){
                        if(!this.props.groups.currentGroup.members.includes(user._id) && user.level < ADMIN_LEVEL){
                            inviteOptions = [
                                ...inviteOptions,
                                {
                                    value: user._id,
                                    label: user.full_name + ' - ' + user.email
                                }
                            ];
                        }
                    }

                    for(const user of userSelection.users){
                        if(this.props.groups.currentGroup.members.includes(user._id)){
                            removeOptions = [
                                ...removeOptions,
                                {
                                    value: user._id,
                                    label: user.full_name + ' - ' + user.email
                                }
                            ];
                        }
                    }

                    return (
                        <ul>
                            <li className = "mb-3">
                                <span>+</span>Add member(s)
                                <Select
                                    isMulti
                                    id = "add_members"
                                    name = "add_members"
                                    options = {inviteOptions}
                                    onChange = { this.onChangeSelectAddMembers }
                                    className = "basic-multi-select"
                                    classNamePrefix = "select"
                                />
                                <button className="btn btn-block btn-primary my-3" onClick = {() => this.onAddMembers()}>+</button>
                            </li>
                            <li className = "mb-3">
                                <span>+</span>Remove member(s)
                                <Select
                                    isMulti
                                    id = "remove_members"
                                    name = "remove_members"
                                    options = {removeOptions}
                                    onChange = { this.onChangeSelectRemoveMembers }
                                    className = "basic-multi-select"
                                    classNamePrefix = "select"
                                />
                                <button className="btn btn-block btn-primary my-3" onClick = {() => this.onRemoveMembers()}>-</button>
                            </li>
                        </ul>
                    );
                }
                return null
            }

            const currentGroup = (this.props.groups && this.props.groups.currentGroup) ? this.props.groups.currentGroup : null;
            if(currentGroup !== null){
                return (
                    <div className = "mt-5 text-center pl-3">
                        <Avatar className = "border border-dark" name = {currentGroup.name} fgColor = {currentGroup.avatar_color} color = {currentGroup.avatar_bgcolor} size = "110"/>
                        <hr />
                        <div className = "operations">
                            {renderMemberAddRemove()}
                            {this.renderCallButton()}
                        </div>
                    </div>
                );
            }
        }
        return null;
    }
}

GroupOperations.propTypes = {
    auth: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
    userSelectionLoad: PropTypes.func.isRequired,
    groupMembersAdd: PropTypes.func.isRequired,
    groupMembersRemove: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    groups: state.groups,
    messages: state.messages,
    userSelection: state.userSelection,
    callsInProgress: state.callsInProgress
});

export default connect(
    mapStateToProps,
    {
        userSelectionLoad,
        groupMembersAdd,
        groupMembersRemove
    }
)(GroupOperations);