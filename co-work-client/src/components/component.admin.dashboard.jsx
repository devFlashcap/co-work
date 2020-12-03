import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import '../style/AdminDashboard.css';
import { ADMIN_LEVEL } from '../config/keys';

class AdminDashboard extends Component 
{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        if(!this.props.auth.isAuthenticated){
            if(this.props.auth.user.level < ADMIN_LEVEL){
                this.props.history.push('/');
            }
            this.props.history.push('/login');
        }
    }

    render()
    {
        return (
            <div className = 'dashboard'>
                <div className = "row">
                    <div className = "col-sm-4">
                        <h3>Admin dashboard</h3>
                    </div>
                    <div className = "col-sm-8 text-right">
                        <button className = "btn btn-primary" onClick = {() => this.props.history.goBack()}>Back</button>
                    </div>
                </div>
                <hr />
                <div className = "row">
                    <div className = "col-sm">
                        <Link to= "/admin/users" className = "btn btn-primary btn-block">Manage users</Link>
                    </div>
                    <div className = "col-sm">
                        <Link to= "/admin/regTokens" className = "btn btn-primary btn-block">Manage registration tokens</Link> 
                    </div>
                    <div className = "col-sm">
                        <Link to= "/admin/groups" className = "btn btn-primary btn-block">Manage groups</Link>
                    </div>
                </div>
            </div>
        );
    }
}

AdminDashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default withRouter(connect(
    mapStateToProps,
    {

    }
)(AdminDashboard));