import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from 'react-avatar';
import '../style/Operations.css';

class GroupOperations extends Component 
{
    render()
    {
        const currentGroup = (this.props.groups && this.props.groups.currentGroup) ? this.props.groups.currentGroup : null;
        if(currentGroup !== null){
            return (
                <div className = "mt-5 text-center pl-3">
                    <Avatar className = "border border-dark" name = {currentGroup.name} fgColor = {currentGroup.avatar_color} color = {currentGroup.avatar_bgcolor} size = "110"/>
                    <hr />
                    <div className = "operations">
                        <ul>
                            <li>
                                <p>
                                    <span>+</span>Add member(s)
                                </p>
                            </li>
                            <li>
                                <p>
                                    <span>-</span>Remove member(s)
                                </p>
                            </li>
                            <li>
                                <p>
                                    <Link className = "btn btn-block btn-primary my-3" to = "/">Voice call</Link>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <Link className = "btn btn-block btn-primary my-3" target="_blank" to = {"/groupcall/"+currentGroup._id}>Video call</Link>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <Link className = "btn btn-block btn-primary my-3" to = "/">Join call</Link>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        }
        return null;
    }
}

GroupOperations.propTypes = {
    auth: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    groups: state.groups,
    messages: state.messages,
});

export default connect(
    mapStateToProps
)(GroupOperations);