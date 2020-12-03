import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import '../style/AdminDashboard.css';
import { ADMIN_LEVEL } from '../config/keys';
import { regTokenSelectionLoad } from '../actions/action.regToken.selection';
import { regTokenRemove } from '../actions/action.regToken';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class AdminRegTokens extends Component 
{
    componentDidMount(){
        if(!this.props.auth.isAuthenticated){
            if(this.props.auth.user.level < ADMIN_LEVEL){
                this.props.history.push('/');
            }
            this.props.history.push('/login');
        }

        this.props.regTokenSelectionLoad();
    }

    onRemoveClick(token){
        confirmAlert({
            title: 'Confirm delete',
            message: token.email + ' - ' + token._id,
            buttons: [
            {
                label: 'Yes',
                onClick: () => this.props.regTokenRemove({tokenID: token._id})
            },
            {
                label: 'No'
            }]
        });
    }

    render()
    {
        const { regTokenSelection } = this.props;

        let regTokenList = null;
        if(regTokenSelection.tokens){
            regTokenList = this.props.regTokenSelection.tokens.map(token => {
                const expiresAt = new Date(token.expiresAt);
                const date = expiresAt.toDateString();
                const time = expiresAt.toTimeString();
                return (
                    <tr>
                        <th scope = "row">{token.email}</th>
                        <td>{date + ' ' + time}</td>
                        <td>{token._id}</td>
                        <td>
                            <button onClick = {() => this.onRemoveClick(token) } className = "btn btn-primary mx-1">Remove</button>
                        </td>
                    </tr>
                )
            });
        }

        return (
            <div className = "dashboard">
                <div className = "row">
                    <div className = "col-sm-4">
                        <h3>Registration tokens dashboard</h3>
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
                            <th scope = "col">Expires at</th>
                            <th scope = "col">Token</th>
                            <th scope = "col">Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {regTokenList.length !== 0 ? regTokenList : <tr><td colSpan = "3">There are no valid registration tokens.</td></tr>}
                    </tbody>
                </table>
                <Link to = "/admin/regTokens/regToken/" className = "btn btn-primary mx-1">Create new registration token</Link>
            </div>
        );
    }
}

AdminRegTokens.propTypes = {
    auth: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    regTokenSelectionLoad: PropTypes.func.isRequired,
    regTokenRemove: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    groups: state.groups,
    regTokenSelection: state.regTokenSelection
});

export default withRouter(connect(
    mapStateToProps,
    {
        regTokenSelectionLoad,
        regTokenRemove
    }
)(AdminRegTokens));