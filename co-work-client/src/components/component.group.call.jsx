import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Peer from 'simple-peer'
import socket from '../socket';
import { 
    callJoin,
    callLeave
} from '../actions/action.group.call';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { withRouter } from 'react-router';
import "../style/GroupCall.css";
const enableTrickle = true;

class GroupCall extends Component {

    state = {
        peers: {},
        stream: null,
        groupID: null,
        microphoneEnabled: true,
        cameraEnabled: true
    }

    constructor() {
        super()
        this.onMedia = this.onMedia.bind(this);
        this.createPeer = this.createPeer.bind(this);

        this.componentCleanup = this.componentCleanup.bind(this);
    }

    componentCleanup() {
        if(this.state.groupID){
            this.props.callLeave({groupID: this.state.groupID});
        }
    }

    componentDidMount(){
        window.addEventListener('beforeunload', this.componentCleanup);
        setTimeout(() => {
            this.setState({
                groupID: this.props.match.params.groupID
            });
            this.getMedia(this.onMedia, err => {
                this.setState({
                    mediaErr: 'Could not access webcam'
                });
            });
        }, 1000);
    }

    componentWillUnmount(){
        this.componentCleanup();
        window.removeEventListener('beforeunload', this.componentCleanup);
    }

    componentDidUpdate() {
        if (this.stream && this.video && !this.video.srcObject) {
            this.video.srcObject = this.stream;
        }
        this.attachPeerVideos();
    }
    
    attachPeerVideos() {
        Object.entries(this.state.peers).forEach(entry => {
            const [peerId, peer] = entry;
            if (peer.video && !peer.video.srcObject && peer.stream) {
                peer.video.setAttribute('data-peer-id', peerId);
                peer.video.srcObject = peer.stream;
                peer.video.muted = false;
            }
        });
        this.video.muted = true;
    }
    
    getMedia(callback, err) {
        const options = { video: true, audio: true };
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            return navigator.mediaDevices.getUserMedia(options)
                .then(stream => callback(stream))
                .catch(e => err(e));
        }
        return navigator.getUserMedia(options, callback,  err);
      }
    
    onMedia(stream) {
        this.stream = stream;
        this.forceUpdate();
        this.props.callJoin({groupID: this.state.groupID});
        socket.on('peer', msg => {
            const peerId = msg.peerId;
            if (peerId === socket.id) {
                return;
            }
            this.createPeer(peerId, true, stream);
        });

        socket.on('signal', data => {
            const peerId = data.from;
            const peer = this.state.peers[peerId];
            if (!peer) {
                this.createPeer(peerId, false, stream);
            }
            this.signalPeer(this.state.peers[peerId], data.signal);
        });
        
        socket.on('unpeer', msg => {
            this.destroyPeer(msg.peerId);
        });
    }
    
    createPeer(peerId, initiator, stream) {
        const peer = new Peer({initiator: initiator, trickle: enableTrickle, stream});
    
        peer.on('signal', (signal) => {
            const msgId = (new Date().getTime());
            const msg = { msgId, signal, to: peerId };
            socket.emit('signal', msg);
        });
      
        peer.on('stream', (stream) => {
            peer.stream = stream;
            this.setPeerState(peerId, peer);
        });
    
        peer.on('connect', () => {
            this.setPeerState(peerId, peer);
            peer.send(this.serialize({
                msg: 'hey man!'
            }));
        });
    
        this.setPeerState(peerId, peer);
    
        return peer;
    }
    
    destroyPeer(peerId) {
        const peers = {...this.state.peers};
        delete peers[peerId];
        this.setState({
            peers
        });
    }
    
    serialize(data) {
        return JSON.stringify(data);
    }
    
    unserialize(data) {
        try {
            return JSON.parse(data.toString());
        }
        catch(e) {
            return undefined;
        }
    }
    
    setPeerState(peerId, peer) {
        const peers = {...this.state.peers};
        peers[peerId] = peer;
        this.setState({
            peers
        });
    }
    
    signalPeer(peer, data) {
        try {
            peer.signal(data);
        } 
        catch(e){
        }
    }

    toggleMicrophone(peerId){
        if(peerId){
            const peer = this.state.peers[peerId];
            const audioTrack = peer.stream.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled;
        }
        else{
            const audioTrack = this.stream.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled;
            this.setState({
                microphoneEnabled: audioTrack.enabled
            });
        }
    }

    toggleCamera(peerId){
        if(peerId){
            const peer = this.state.peers[peerId];
            const videoTrack = peer.stream.getVideoTracks()[0];
            videoTrack.enabled = !videoTrack.enabled;
        }
        else{
            const videoTrack = this.stream.getVideoTracks()[0];
            videoTrack.enabled = !videoTrack.enabled;
            this.setState({
                cameraEnabled: videoTrack.enabled
            });
        }
    }

    renderGroupName(){
        if(this.props.groups && this.props.groups.groups){
            const groupIndex = this.props.groups.groups.findIndex(g => g._id == this.state.groupID);
            if(groupIndex >= 0){
                return (
                    <h3>{this.props.groups.groups[groupIndex].name}</h3>
                )
            }
        }
        return null;
    }
    
    renderPeers() {
        const rows = [...Array( Math.ceil(Object.entries(this.state.peers).length-2 / 3) )];
        const peerRows = rows.map((row, idx) => Object.entries(this.state.peers).slice(2).slice(idx * 3, idx * 3 + 3));
        const elements = peerRows.map((row, idx) => (
            <div className = "row" key={idx}>    
                {
                    row.map(entry => {
                        const [peerId, peer] = entry;
                        return (
                            <div className = "col-sm-4">
                                <video key = {peerId} ref={video => peer.video = video} autoPlay playsInline muted></video>
                                <DropdownButton>
                                    <Dropdown.Item onClick  = {() => this.toggleMicrophone(peerId)}>
                                        <div>
                                            Toggle Microphone
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick  = {() => this.toggleCamera(peerId)}>
                                        <div>
                                            Toggle Camera
                                        </div>
                                    </Dropdown.Item>
                                </DropdownButton>
                            </div>
                        );
                    })
                }
            </div> )
        );

        return (
            <div className = "participants">
                <div className = "row">
                    <div className = "col-sm-4">
                        {this.renderGroupName()}
                    </div>
                    <div className = "col-sm-8 text-right">
                        <button className = "btn btn-danger" onClick = {() => this.props.history.push('/')}>Leave</button>
                    </div>
                </div>
                <div className = "row">
                    <div className = "col-sm-4">
                        <video id="myVideo" ref={video => this.video = video} autoPlay playsInline muted></video>
                        <DropdownButton title = "">
                            <Dropdown.Item onClick  = {() => this.toggleMicrophone()}>
                                <div>
                                    <p>{this.state.microphoneEnabled ? 'Mute Microphone' : 'Unmute Microphone'}</p>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item onClick  = {() => this.toggleCamera()}>
                                <div>
                                    <p>{this.state.cameraEnabled ? 'Disable Camera' : 'Enable Camera'}</p>
                                </div>
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                    {
                        Object.entries(this.state.peers).slice(0,1).map(entry => {
                            const [peerId, peer] = entry;
                            return (
                                <div className = "col-sm-4">
                                    <video key = {peerId} ref={video => peer.video = video} autoPlay playsInline muted></video>
                                    <DropdownButton>
                                        <Dropdown.Item onClick  = {() => this.toggleMicrophone(peerId)}>
                                            <div>
                                                Toggle Microphone
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick  = {() => this.toggleCamera(peerId)}>
                                            <div>
                                                Toggle Camera
                                            </div>
                                        </Dropdown.Item>
                                    </DropdownButton>
                                </div>
                            );
                        })
                    }
                </div>
                {elements}
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.state.mediaErr && (
                    <p className="error">{this.state.mediaErr}</p>
                )}
                {this.renderPeers()}
            </div>
        );
    }
}

GroupCall.propTypes = {
    auth: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
    callJoin: PropTypes.func.isRequired,
    callLeave: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    groups: state.groups,
});

export default withRouter(connect(
    mapStateToProps,
    {
        callJoin,
        callLeave
    }
)(GroupCall));