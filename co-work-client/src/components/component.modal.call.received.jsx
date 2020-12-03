import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { ModalStyles } from '../style/modal';

class ModalCallReceived extends Component
{
    componentDidMount(){
        this.state = {
            
        }
    }

    render(){
        return (
            null
            /*<Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Call received"
            >
                
            </Modal>
            */
        );
    }
}

ModalCallReceived.propTypes = {

}

const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    {
        
    }
)(ModalCallReceived);