import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ADMIN_LEVEL } from '../config/keys';
import { regTokenCreate } from '../actions/action.regToken';
import '../style/AdminDashboard.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class AdminRegTokensRegToken extends Component 
{
    constructor(props){
        super(props);
        const startDate = new Date(Date.now());
        startDate.setDate(startDate.getDate() + 7);
        this.state = {
            token_email: "",
            token_expires_at: startDate
        };
    }

    componentDidMount(){
        if(!this.props.auth.isAuthenticated){
            if(this.props.auth.user.level < ADMIN_LEVEL){
                this.props.history.push('/');
            }
            this.props.history.push('/login');
        }
    }

    onSubmit = e => {
        e.preventDefault();

        const data = {
            email: this.state.token_email,
            expiresAt: this.state.token_expires_at
        }
        
        this.props.regTokenCreate(data);
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onChangeDate = date => {
        this.setState({
            token_expires_at: date
        });
    }

    render()
    {
        return (
            <div className = "dashboard">
                <div className = "row">
                    <div className = "col-sm-4">
                        <h3>Create registration token</h3>
                    </div>
                    <div className = "col-sm-8 text-right">
                        <button className = "btn btn-primary" onClick = {() => this.props.history.goBack()}>Back</button>
                    </div>
                </div>
                <hr />
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label htmlFor="token_email">E-mail address:</label>
                        <input
                            required
                            id = "token_email"
                            type = "text" 
                            className = "form-control"
                            value = { this.state.token_email }
                            onChange = { this.onChange }
                        />
                    </div>
                    <div className = "form-group">
                        <label htmlFor="token_expires_at">Expires at: </label>
                        <DatePicker 
                            selected={ this.state.token_expires_at }
                            onChange={ this.onChangeDate } />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Modify user" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

AdminRegTokensRegToken.propTypes = {
    auth: PropTypes.object.isRequired,
    formResults: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    regTokenCreate: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    formResults: state.formResults,
    groups: state.groups,
});

export default withRouter(connect(
    mapStateToProps,
    {
        regTokenCreate
    }
)(AdminRegTokensRegToken));