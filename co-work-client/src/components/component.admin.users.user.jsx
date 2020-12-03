import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ADMIN_LEVEL } from '../config/keys';
import { 
    userSelectionLoad,
    userSelectionModify
} from '../actions/action.user.selection';
import Select from 'react-select'
import '../style/AdminDashboard.css';

class AdminUsersUser extends Component 
{
    constructor(props){
        super(props);
        this.state = {
            userID: null,
            user_email: "",
            user_full_name: "",
            user_level: null
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.userSelection){
            const { match: { params } } = this.props;
            if(Object.keys(params).length > 0){
                const user = nextProps.userSelection.users.find(u => u._id === params.userID);
                if(user){
                    this.setState({
                        userID: params.userID,
                        user_email: user.email,
                        user_full_name: user.full_name,
                        user_level: user.level
                    });
                }
            }
        }
    }

    componentDidMount(){
        if(!this.props.auth.isAuthenticated){
            if(this.props.auth.user.level < ADMIN_LEVEL){
                this.props.history.push('/');
            }
            this.props.history.push('/login');
        }
        this.props.userSelectionLoad({
            userID: this.props.auth.user.id,
            condition: "CONDITION_LEVEL_LESS"
        });
    }

    onChangeSelectLevel = select => {
        this.setState({ user_level: select.value || null });
    }

    onSubmit = e => {
        e.preventDefault();

        const data = {
            userID: this.state.userID,
            email: this.state.user_email,
            full_name: this.state.user_full_name,
            level: this.state.user_level
        }
        
        this.props.userSelectionModify(data);
    }

    render()
    {
        let levelOptions = [];
        for (let i = 0; i <= this.props.auth.user.level; i++) {
            levelOptions = [
                ...levelOptions,
                {
                    value: i,
                    label: 'Level ' + i
                }
            ];
        }

        return (
            <div className = "dashboard">
                <div className = "row">
                    <div className = "col-sm-4">
                        <h3>Modify user</h3>
                    </div>
                    <div className = "col-sm-8 text-right">
                        <button className = "btn btn-primary" onClick = {() => this.props.history.goBack()}>Back</button>
                    </div>
                </div>
                <hr />
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>Name: </label>
                        <label>{ this.state.user_full_name }</label>
                    </div>
                    <div className = "form-group">
                        <label>E-mail address: {this.state.user_email }</label>
                        <label></label>
                    </div>
                    <div className = "form-group">
                        <label htmlFor="user_level">Level: </label>
                        <Select
                            id = "user_level"
                            name = "user_level"
                            value = {{value: this.state.user_level, label: 'Level ' + this.state.user_level}}
                            options = {levelOptions}
                            onChange = { this.onChangeSelectLevel }
                            className = "basic-single"
                            classNamePrefix = "select"
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Modify user" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

AdminUsersUser.propTypes = {
    auth: PropTypes.object.isRequired,
    formResults: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    userSelectionLoad: PropTypes.func.isRequired,
    userSelectionModify: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    formResults: state.formResults,
    groups: state.groups,
    userSelection: state.userSelection
});

export default withRouter(connect(
    mapStateToProps,
    {
        userSelectionLoad,
        userSelectionModify
    }
)(AdminUsersUser));