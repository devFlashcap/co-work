import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Peer from 'simple-peer'
import socket from '../socket';
import { 
    callJoin,
    callLeave
} from '../actions/action.group.call';
const enableTrickle = true;

class GroupCall extends Component {

    state = {
        peers: {},
        stream: null,
        groupID: null
    }

    constructor() {
        super()
        this.onMedia = this.onMedia.bind(this)
        this.createPeer = this.createPeer.bind(this)
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({
                groupID: this.props.match.params.groupID
            });
            this.getMedia(this.onMedia, err => {
                this.setState({
                    mediaErr: 'Could not access webcam'
                });
                console.log('getMedia error', err);
            });
        }, 1000);
    }

    componentWillUnmount(){
        if(this.state.groupID){
            this.props.callLeave({groupID: this.state.groupID});
        }
    }

    componentDidUpdate() {
        if (this.stream && this.video && !this.video.srcObject) {
          console.log('set video stream', this.video, this.stream)
          this.video.srcObject = this.stream
        }
        this.attachPeerVideos()
      }
    
      attachPeerVideos() {
        Object.entries(this.state.peers).forEach(entry => {
          const [peerId, peer] = entry
          if (peer.video && !peer.video.srcObject && peer.stream) {
            console.log('setting peer video stream', peerId, peer.stream)
            peer.video.setAttribute('data-peer-id', peerId)
            peer.video.srcObject = peer.stream
          }
        })
      }
    
      getMedia(callback, err) {
        const options = { video: true, audio: true }
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          return navigator.mediaDevices.getUserMedia(options)
            .then(stream => callback(stream))
            .catch(e => err(e))
        }
        return navigator.getUserMedia(options, callback,  err)
      }
    
      onMedia(stream) {
        this.stream = stream
        this.forceUpdate() // we have stream
        this.props.callJoin({groupID: this.state.groupID});
        socket.on('peer', msg => {
          const peerId = msg.peerId
          console.log('new peer poof!', peerId)
          if (peerId === socket.id) {
            return console.log('Peer is me :D', peerId)
          }
          this.createPeer(peerId, true, stream)
        })
        socket.on('signal', data => {
          const peerId = data.from
          const peer = this.state.peers[peerId]
          if (!peer) {
            this.createPeer(peerId, false, stream)
          }
          console.log('Setting signal', peerId, data)
          this.signalPeer(this.state.peers[peerId], data.signal)
        })
        socket.on('unpeer', msg => {
          console.log('Unpeer', msg)
          this.destroyPeer(msg.peerId)
        })
      }
    
      createPeer(peerId, initiator, stream) {
        console.log('creating new peer', peerId, initiator)
    
        const peer = new Peer({initiator: initiator, trickle: enableTrickle, stream});
    
        peer.on('signal', (signal) => {
          const msgId = (new Date().getTime())
          const msg = { msgId, signal, to: peerId }
          console.log('peer signal sent', msg)
          socket.emit('signal', msg)
        });
      
        peer.on('stream', (stream) => {
          console.log('Got peer stream!!!', peerId, stream)
          peer.stream = stream
          this.setPeerState(peerId, peer)
        });
    
        peer.on('connect', () => {
          console.log('Connected to peer', peerId)
          this.setPeerState(peerId, peer)
          peer.send(this.serialize({
            msg: 'hey man!'
          }));
        });
    
        peer.on('data', data => {
          console.log('Data from peer', peerId, this.unserialize(data))
        });
    
        peer.on('error', (e) => {
          console.log('Peer error %s:', peerId, e);
        });
    
        this.setPeerState(peerId, peer);
    
        return peer;
      }
    
      destroyPeer(peerId) {
        const peers = {...this.state.peers}
        delete peers[peerId]
        this.setState({
          peers
        })
      }
    
      serialize(data) {
        return JSON.stringify(data)
      }
    
      unserialize(data) {
        try {
          return JSON.parse(data.toString())
        } catch(e) {
          return undefined
        }
      }
    
      setPeerState(peerId, peer) {
        const peers = {...this.state.peers}
        peers[peerId] = peer
        this.setState({
          peers
        })
      }
    
      signalPeer(peer, data) {
        try {
          peer.signal(data)
        } catch(e) {
          console.log('sigal error', e)
        }
      }
    
      renderPeers() {
        return Object.entries(this.state.peers).map(entry => {
          const [peerId, peer] = entry
          console.log('render peer', peerId, peer, entry)
          return <div key={peerId}>
            <video ref={video => peer.video = video} controls autoPlay playsInline muted></video>
          </div>
        })
      }

    render() {
        return (
            <div>
                {this.state.mediaErr && (
                    <p className="error">{this.state.mediaErr}</p>
                )}
                <div id="me">
                    <video id="myVideo" ref={video => this.video = video} controls autoPlay playsInline muted></video>
                </div>
                <div id="peers">{this.renderPeers()}</div>
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

export default connect(
    mapStateToProps,
    {
        callJoin,
        callLeave
    }
)(GroupCall);