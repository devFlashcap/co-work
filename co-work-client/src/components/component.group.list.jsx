import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { groupJoin } from '../actions/action.group';
import Avatar from 'react-avatar';
import { withRouter } from 'react-router';

class GroupList extends Component 
{
    constructor(){
        super();
        this.state = {
            groupFilter: ""
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
    }

    render()
    {
        const filter = (this.state.groupFilter && this.state.groupFilter.length > 0 ? this.state.groupFilter : null)
        let groupList = null;
        if(this.props.groups.groups){
            groupList = this.props.groups.groups.map((group) => {
                if((filter !== null && group.name.includes(filter)) || filter === null){
                    return (
                        <div className = "d-flex flex-row p-0 mb-3 border border-primary bg-dark" 
                            onClick = {() => {
                                this.props.groupJoin({type: "chat", groupID: group._id});
                                this.props.history.push('/groupview');
                            }}
                            key = {group._id}>
                            <Avatar name = {group.name} fgColor = {group.avatar_color} color = {group.avatar_bgcolor} size = "110"/>
                            <div className = "p-4 ">
                                <div className = "text-light text-capitalize"><h4><u>{group.name}</u></h4></div>
                                <div className = "text-light pl-4">Short description</div>
                            </div>
                        </div>
                    );
                }
                return null;
            });
        }

        return (
            <div>
                <form onSubmit = {this.onSubmit}>
                    <div className = "w-50 mx-auto form-group m-4">
                        <input
                            id = "groupFilter"
                            value = { this.state.groupFilter }
                            onChange = { this.onChange }
                            className = "form-control" 
                            type="text" 
                            placeholder = "Search for group"/>
                    </div>
                </form>
                <div className = "w-50 mx-auto">
                    {groupList}
                </div>
            </div>
            
        );
    }
}

GroupList.propTypes = {
    auth: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    groups: state.groups,
    messages: state.messages,
});

export default withRouter(connect(
    mapStateToProps,
    {
        groupJoin,
    }
)(GroupList));