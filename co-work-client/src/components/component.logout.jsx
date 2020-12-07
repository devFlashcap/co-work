import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogout } from '../actions/action.auth';
import { withRouter } from 'react-router';

class Logout extends Component
{
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.userLogout();
        }
        else{
            this.props.history.push('/');
        }

    }

    render()
    {
        return (
            <div className = "alert alert-info text-center p-5 m-5 w-50 mx-auto" role="alert">
                <h3>You have been logged out!</h3>
            </div>
        );
    }
}

Logout.propTypes = {
    userLogout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default withRouter(connect(
    mapStateToProps,
    { 
        userLogout,
    }
)(Logout));