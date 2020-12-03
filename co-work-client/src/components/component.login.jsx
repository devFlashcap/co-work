import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../style/App.css';
import { withRouter } from 'react-router';
import { userLogin } from '../actions/action.auth';

class Login extends Component
{
    constructor(){
        super();

        this.state = {
            email: "",
            password: "",
        };
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/');
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/');
        }
    } 

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const data = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.userLogin(data);
    }

    render()
    {
        return (
            <div className = "w-50 p-5 mx-auto fill">
                <h3>Login</h3>
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label htmlFor="email">E-mail address:</label>
                        <input
                            required
                            id = "email"
                            type = "email" 
                            className = "form-control"
                            value = { this.state.email }
                            onChange = { this.onChange }
                        />
                    </div>
                    <div className = "form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            required
                            id = "password"
                            type = "password" 
                            className = "form-control"
                            value = { this.state.password }
                            onChange = { this.onChange }
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    userLogin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    formResults: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    formResults: state.formResults,
});

export default withRouter(connect(
    mapStateToProps,
    { 
        userLogin
    }
)(Login));