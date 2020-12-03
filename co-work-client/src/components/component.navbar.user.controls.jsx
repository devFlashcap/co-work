import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Notifications from './component.notifications';
import { ADMIN_LEVEL } from '../config/keys';

class NavbarUserControls extends Component
{
    renderAdminButton(){
        if(this.props.auth.user.level === ADMIN_LEVEL){
            return (
                <li>
                    <Link to = "/admin" className = "btn btn-primary">Admin</Link>
                </li>
            );
        }
        return null;
    }

    render() {
        return (
            <ul className = "nav navbar-nav navbar-right">
                {this.renderAdminButton()}
                <li>
                    <Notifications/>
                </li>
                <li>
                    <Link to = "/logout" className = "btn btn-primary">Logout</Link>
                </li>
            </ul>
        );
    }
}

NavbarUserControls.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(NavbarUserControls);