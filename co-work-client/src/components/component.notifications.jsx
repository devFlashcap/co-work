import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { groupJoin } from '../actions/action.group';
import { withRouter } from 'react-router';

class Notifications extends Component
{
    handleNotification(notification){
        switch(notification.type){
            case 'chat':
                this.props.groupJoin({type: notification.type, groupID: notification.reference});
                this.props.history.push('/groupview');
                break;
            case 'groupadd':
                this.props.groupJoin({type: 'chat', groupID: notification.reference});
                this.props.history.push('/groupview');
                break;
            default:
                break;
        }
    }

    render() {

        const notifications = this.props.notifications.notifications.map((notification) => {
            return (
                <Dropdown.Item key = {notification._id} onClick  = {() => this.handleNotification(notification)}>
                    <div>
                        <p>{notification.message}({notification.count})</p>
                    </div>
                </Dropdown.Item>
            );
        });

        const title = "Notifications (" + this.props.notifications.notifications.length + ")";
        return (           
            <DropdownButton title={title} className = "mx-1">
                {notifications}
            </DropdownButton>
        );
    }
}

Notifications.propTypes = {
    auth: PropTypes.object.isRequired,
    notifications: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    notifications: state.notifications
});

export default withRouter(connect(
    mapStateToProps,
    {
        groupJoin,
    }
)(Notifications));