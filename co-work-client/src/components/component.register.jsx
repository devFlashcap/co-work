import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userRegister } from '../actions/action.auth';
import { regTokenRead } from '../actions/action.regToken';

class Register extends Component
{
    constructor(props){
        super(props);

        this.state = {
            password: "",
            password2: "",
            full_name: "",
            tokenID: null
        };
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/');
        }

        const { match: { params } } = this.props;
        if(params.tokenID){
            this.setState({
                tokenID: params.tokenID
            });
        }

        this.props.regTokenRead({tokenID: params.tokenID});
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const data = {
            tokenID: this.state.tokenID,
            email: this.props.regToken.email,
            password: this.state.password,
            password2: this.state.password2,
            full_name: this.state.full_name
        }

        this.props.userRegister(data, this.props.history);
    }

    render()
    {
        if(this.props.regToken){
            return (
                <div className = "w-50 p-5 mx-auto">
                    <h3>Register</h3>
                    <form onSubmit = {this.onSubmit}>
                        <div className = "form-group">
                            <label htmlFor="email">E-mail address:</label>
                            <div className = "email_field">
                                {this.props.regToken.email || ''}
                            </div>
                        </div>
                        <div className = "form-group">
                            <label htmlFor="full_name">Name:</label>
                            <input
                                required
                                id = "full_name"
                                type = "text" 
                                className = "form-control"
                                value = { this.state.full_name }
                                onChange = { this.onChange }
                            />
                        </div>
                        <div className = "form-group">
                            <label htmlFor="password">Password:</label>
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
                        <div className="form-group">
                            <input type="submit" value="Register" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            );
        }
        return null;
    }
}

Register.propTypes = {
    userRegister: PropTypes.func.isRequired,
    regTokenRead: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    regToken: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    regToken: state.regToken,
});

export default connect(
    mapStateToProps,
    { 
        regTokenRead,
        userRegister
    }
)(Register);