import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import '../style/AdminDashboard.css';
import { ADMIN_LEVEL } from '../config/keys';
import { groupRemove } from '../actions/action.group';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class AdminGroups extends Component 
{
    componentDidMount(){
        if(!this.props.auth.isAuthenticated){
            if(this.props.auth.user.level < ADMIN_LEVEL){
                this.props.history.push('/');
            }
            this.props.history.push('/login');
        }
    }

    onRemoveClick(group){
        confirmAlert({
            title: 'Confirm delete',
            message: group.name + ' - ' + group._id,
            buttons: [
            {
                label: 'Yes',
                onClick: () => this.props.groupRemove({groupID: group._id})
            },
            {
                label: 'No'
            }]
        });
    }

    render()
    {
        let groupList = null;
        if(this.props.groups.groups){
            groupList = this.props.groups.groups.map(group => {
                const memberList = group.members.map(member => {
                    return (
                        <span className = "d-block">
                            {member.full_name + ' - ' + member.email}
                        </span>
                    );
                })
                return (
                    <tr>
                        <th scope = "row">{group.name}</th>
                        <td>{group.leader.full_name + ' - ' + group.leader.email}</td>
                        <td>{memberList}</td>
                        <td>
                            <Link to = {"/admin/groups/group/" + group._id } className = "btn btn-primary mx-1">Modify</Link>
                            <button onClick = {() => this.onRemoveClick(group) } className = "btn btn-primary mx-1">Remove</button>
                        </td>
                    </tr>
                )
            });
        }

        return (
            <div className = "dashboard">
                <div className = "row">
                    <div className = "col-sm-4">
                        <h3>Groups dashboard</h3>
                    </div>
                    <div className = "col-sm-8 text-right">
                        <button className = "btn btn-primary" onClick = {() => this.props.history.goBack()}>Back</button>
                    </div>
                </div>
                <hr />
                <table className = "table table-dark">
                    <thead>
                        <tr>
                            <th scope = "col">Name</th>
                            <th scope = "col">Leader</th>
                            <th scope = "col">Members</th>
                            <th scope = "col">Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupList.length !== 0 ? groupList : <tr><td colSpan = "3">There are no groups to show.</td></tr>}
                    </tbody>
                </table>
                <Link to = "/admin/groups/group/" className = "btn btn-primary mx-1">Create new group</Link>
            </div>
        );
    }
}

AdminGroups.propTypes = {
    auth: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    groupRemove: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    groups: state.groups,
});

export default withRouter(connect(
    mapStateToProps,
    {
        groupRemove
    }
)(AdminGroups));