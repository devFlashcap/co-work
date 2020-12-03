import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GroupList from './component.group.list';
import { withRouter } from 'react-router';

class Dashboard extends Component 
{
    componentDidMount(){
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/login');
        }
    }

    render()
    {
        return (
            <GroupList/>
        );
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default withRouter(connect(
    mapStateToProps
)(Dashboard));