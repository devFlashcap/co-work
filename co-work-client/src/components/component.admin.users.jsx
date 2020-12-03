import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import '../style/AdminDashboard.css';
import { ADMIN_LEVEL } from '../config/keys';
import { userSelectionLoad } from '../actions/action.user.selection';

class AdminGroups extends Component 
{
    componentDidMount(){
        if(!this.props.auth.isAuthenticated){
            if(this.props.auth.user.level < ADMIN_LEVEL){
                this.props.history.push('/');
            }
            this.props.history.push('/login');
        }

        this.props.userSelectionLoad({
            userID: this.props.auth.user.id,
            condition: "CONDITION_LEVEL_LESS"
        });
    }

    render()
    {
        const { userSelection } = this.props;

        let userList = null;
        if(userSelection.users){
            userList = this.props.userSelection.users.map(user => {
                return (
                    <tr>
                        <th scope = "row">{user.email}</th>
                        <td>{user.full_name}</td>
                        <td>{user.level}</td>
                        <td>
                            <Link to = {"/admin/users/user/" + user._id } className = "btn btn-primary mx-1">Modify</Link>
                        </td>
                    </tr>
                )
            });
        }

        return (
            <div className = "dashboard">
                <div className = "row">
                    <div className = "col-sm-4">
                        <h3>Users dashboard</h3>
                    </div>
                    <div className = "col-sm-8 text-right">
                        <button className = "btn btn-primary" onClick = {() => this.props.history.goBack()}>Back</button>
                    </div>
                </div>
                <hr />
                <table className = "table table-dark">
                    <thead>
                        <tr>
                            <th scope = "col">E-mail address</th>
                            <th scope = "col">Name</th>
                            <th scope = "col">Level</th>
                            <th scope = "col">Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.length !== 0 ? userList : <tr><td colSpan = "3">There are no users to show.</td></tr>}
                    </tbody>
                </table>
            </div>
        );
    }
}

AdminGroups.propTypes = {
    auth: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    userSelectionLoad: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    groups: state.groups,
    userSelection: state.userSelection
});

export default withRouter(connect(
    mapStateToProps,
    {
        userSelectionLoad,
    }
)(AdminGroups));