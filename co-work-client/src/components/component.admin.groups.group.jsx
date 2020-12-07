import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ADMIN_LEVEL } from '../config/keys';
import { userSelectionLoad } from '../actions/action.user.selection';
import { 
    groupCreate,
    groupModify,
} from '../actions/action.group';
import Select from 'react-select'
import Avatar from 'react-avatar';
import { ChromePicker } from 'react-color';
import '../style/AdminDashboard.css';

class AdminGroupsGroup extends Component 
{
    constructor(props){
        super(props);
        this.state = {
            groupID: null,
            group_name: "",
            group_leader: "",
            group_members: [],
            group_avatar_bgcolor: "#ffffff",
            group_avatar_color: "#000000",
            mode: "create"
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.groups){
            const { match: { params } } = this.props;
            if(Object.keys(params).length > 0){
                const group = nextProps.groups.groups.find(g => g._id === params.groupID);
                if(group){
                    this.setState({
                        mode: "modify",
                        groupID: params.groupID,
                        group_name: group.name,
                        group_leader: group.leader._id,
                        group_members: group.members.map(member => member._id),
                        group_avatar_bgcolor: group.avatar_bgcolor,
                        group_avatar_color: group.avatar_color,
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

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleChangeColorBackground = color => {
        this.setState({ group_avatar_bgcolor: color.hex });
    };

    handleChangeColorForeground = color => {
        this.setState({ group_avatar_color: color.hex });
    }

    onChangeSelectLeader = select => {
        this.setState({ group_leader: select.value || null });
        
    }

    onChangeSelectMembers = select => {
        this.setState({ group_members: select ? select.map(o => o.value) : [] });
    }

    onSubmit = e => {
        e.preventDefault();

        const data = {
            groupID: this.state.groupID,
            name: this.state.group_name,
            leader: this.state.group_leader,
            avatar_color: this.state.group_avatar_color,
            avatar_bgcolor: this.state.group_avatar_bgcolor,
            members: this.state.group_members
        }
        
        if(this.state.mode === "create"){
            this.props.groupCreate(data);
        }
        else if(this.state.mode === "modify"){
            this.props.groupModify(data);
        }
    }

    render()
    {
        const { userSelection } = this.props;

        var leaderOptions = [];
        for(const user of userSelection.users){
            if(user.level > 0){
                leaderOptions = [
                    ...leaderOptions,
                    {
                        value: user._id,
                        label: user.full_name + ' - ' + user.email
                    }
                ];
            }
        }

        var memberOptions = [];
        for(const user of userSelection.users){
            if(user._id !== this.state.group_leader){
                memberOptions = [
                    ...memberOptions,
                    {
                        value: user._id,
                        label: user.full_name + ' - ' + user.email
                    }
                ];
            }
        }

        let defaultValueLeader = leaderOptions.find(lo => lo.value === this.state.group_leader);
        let defaultValueMembers = memberOptions.filter(mo => this.state.group_members.includes(mo.value));

        return (
            <div className = "dashboard">
                <div className = "row">
                    <div className = "col-sm-4">
                        <h3>{this.state.mode === "create" ? "Create new group" : "Modify group"}</h3>
                    </div>
                    <div className = "col-sm-8 text-right">
                        <button className = "btn btn-primary" onClick = {() => this.props.history.goBack()}>Back</button>
                    </div>
                </div>
                <hr />
                <form onSubmit = {this.onSubmit}>
                    <div className = "row">
                        <div className = "col-sm-2">
                            <label>Avatar preview</label>
                            <Avatar className = "border border-dark" name = { this.state.group_name } fgColor = {this.state.group_avatar_color} color = {this.state.group_avatar_bgcolor} size = "200"/>
                        </div>
                        <div className = "col-sm-2">
                            <label>Background</label>
                            <ChromePicker
                                color = { this.state.group_avatar_bgcolor }
                                onChange = { this.handleChangeColorBackground }
                            />
                        </div>
                        <div className = "col-sm-2">
                            <label>Text color</label>
                            <ChromePicker
                                color = { this.state.group_avatar_color } 
                                onChange = { this.handleChangeColorForeground }
                            />
                        </div>
                    </div>
                    <div className = "form-group">
                        <label htmlFor="group_name">Name:</label>
                        <input
                            required
                            id = "group_name"
                            type = "text" 
                            className = "form-control"
                            value = { this.state.group_name }
                            onChange = { this.onChange }
                        />
                    </div>
                    <div className = "form-group">
                        <label htmlFor="group_leader">Leader</label>
                        <Select
                            id = "group_leader"
                            name = "group_leader"
                            value = {defaultValueLeader || this.state.group_leader}
                            options = {leaderOptions}
                            onChange = { this.onChangeSelectLeader }
                            className = "basic-single"
                            classNamePrefix = "select"
                        />
                    </div>
                    <div className = "form-group">
                        <label htmlFor="group_members">Members</label>
                        <Select
                            isMulti
                            id = "group_members"
                            name = "group_members"
                            value = {defaultValueMembers || this.state.group_members}
                            options = {memberOptions}
                            onChange = { this.onChangeSelectMembers }
                            className = "basic-multi-select"
                            classNamePrefix = "select"
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value={this.state.mode === "create" ? "Create group" : "Modify group"} className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

AdminGroupsGroup.propTypes = {
    auth: PropTypes.object.isRequired,
    formResults: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    userSelectionLoad: PropTypes.func.isRequired,
    groupCreate: PropTypes.func.isRequired,
    groupModify: PropTypes.func.isRequired
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
        groupCreate,
        groupModify
    }
)(AdminGroupsGroup));