import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from "./component.navbar";
import Dashboard from "./component.dashboard";
import Login from "./component.login";
import Logout from './component.logout';
import Register from './component.register';
import GroupView from './component.group.view';
import GroupCall from './component.group.call';
import AdminDashboard from './component.admin.dashboard';
import AdminUsers from './component.admin.users';
import AdminUsersUser from './component.admin.users.user';
import AdminGroups from './component.admin.groups';
import AdminGroupsGroup from './component.admin.groups.group';
import AdminRegTokens from './component.admin.regTokens';
import AdminRegTokensRegToken from './component.admin.regTokens.regToken';
import CallReceived from './component.modal.call.received';

import "bootstrap/dist/css/bootstrap.min.css";
import '../style/App.css';

class App extends Component
{
    componentDidMount(){
        
    }

    render(){
        return (
            <Router>
                <Navbar />
                <Switch className = "container-fluid">
                    <Route exact path = "/" component = {Dashboard} />
                    <Route exact path = "/login" component = {Login} />
                    <Route exact path = "/logout" component = {Logout} />
                    <Route exact path = "/register/:tokenID" component = {Register} />
                    <Route exact path = "/groupview" component = {GroupView} />
                    <Route exact path = "/groupcall/:groupID" component = {GroupCall} />
                    <Route exact path = "/admin" component = {AdminDashboard} />
                    <Route exact path = "/admin/users" component = {AdminUsers} />
                    <Route exact path = "/admin/users/user/:userID" component = {AdminUsersUser} />
                    <Route exact path = "/admin/groups" component = {AdminGroups} />
                    <Route exact path = "/admin/groups/group/" component = {AdminGroupsGroup} />
                    <Route exact path = "/admin/groups/group/:groupID" component = {AdminGroupsGroup} />
                    <Route exact path = "/admin/regTokens" component = {AdminRegTokens} />
                    <Route exact path = "/admin/regTokens/regToken/" component = {AdminRegTokensRegToken} />
                </Switch>
                <CallReceived />
            </Router>
        );
    }
}

App.propTypes = {
}

const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    {
        //setModalGroupMemberRemoveIsOpen
    }
)(App);