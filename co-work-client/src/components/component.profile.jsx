import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userPasswordChange } from '../actions/action.auth';
import '../style/AdminDashboard.css';

class Profile extends Component
{
    constructor(props){
        super(props);
        this.state = {
            password: "",
            password2: "",
            password3: ""
        }
    }

    componentDidMount(){
        
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/');
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const data = {
            email: this.props.auth.user.email,
            password: this.state.password,
            password2: this.state.password2,
            password3: this.state.password3
        }

        this.props.userPasswordChange(data);
    }

    render()
    {
        return (
            <div className = "dashboard">
                <h1 className = "mb-5">User Profile</h1>
                <label>E-mail address: </label>{this.props.auth.user.email}<br/>
                <label>Name: </label>{this.props.auth.user.full_name}<br/>
                <label>Level: </label>{this.props.auth.user.level}
                <hr/>
                <h3>Change password</h3>
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label htmlFor="password">Current password:</label>
                        <input
                            required
                            id = "password"
                            type = "password" 
                            className = "form-control"
                            value = { this.state.password }
                            onChange = { this.onChange }
                        />
                    </div>
                    <div className = "form-group">
                        <label htmlFor="password2">Password again:</label>
                        <input
                            required
                            id = "password2"
                            type = "password" 
                            className = "form-control"
                            value = { this.state.password2 }
                            onChange = { this.onChange }
                        />
                    </div>
                    <div className = "form-group">
                        <label htmlFor="password3">Password again:</label>
                        <input
                            required
                            id = "password3"
                            type = "password" 
                            className = "form-control"
                            value = { this.state.password3 }
                            onChange = { this.onChange }
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Change password" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    { 
        userPasswordChange
    }
)(Profile);