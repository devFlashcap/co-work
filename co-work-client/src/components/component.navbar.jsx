import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavbarUserControls from './component.navbar.user.controls';
import '../style/Navbar.css';

class Navbar extends Component 
{
    render()
    {
        return (
            <nav className = "navbar navbar-dark bg-dark navbar-expand-lg navbarSupportedContent">
                <Link to= "/" className = "navbar-brand">Co-Work</Link>
                <div className = "collapse navbar-collapse">
                    <ul className = "navbar-nav mr-auto">
                        <li className = "navbar-item">
                            <Link to = "/" className = "nav-link">{this.props.auth.isAuthenticated ? 'Home' : 'Login'}</Link>
                        </li>
                    </ul>
                    {this.props.auth.isAuthenticated ? <NavbarUserControls /> : null}
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Navbar);