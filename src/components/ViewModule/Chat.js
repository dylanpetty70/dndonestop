import React, { Component } from 'react';
import { connect } from 'react-redux';
import {handleGrabModuleChat, handleNewMessage, handleDeleteMessage, handleGrabCallURL, handleNewCallURL, handleDeleteCallURL} from '../../actions/modules';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {BiSend} from 'react-icons/bi';
import {MdDelete} from 'react-icons/md';
import {withRouter} from 'react-router-dom';
import ReactModal from 'react-modal-resizable-draggable';
import {AiFillCloseCircle} from 'react-icons/ai';
var firebase = require("firebase/app");
require('firebase/auth');

let callFrame = '';


class Chat extends Component {

	constructor(props){
		super(props);
		this.state = { newMessage: '',
						callActive: false,
						}
		this.endFrame = this.endFrame.bind(this);
		this.joinCall = this.joinCall.bind(this);
	}

	componentDidMount(){
		document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight;
		this.props.handleGrabModuleChat(this.props.match.params.key)
		this.props.handleGrabCallURL(this.props.match.params.key);

    }

	endFrame(){
		callFrame.leave();
		this.setState({...this.state, callActive: false});
	}

	joinCall(){
		this.setState({...this.state, callActive: true});
		setTimeout(() => {callFrame = window.DailyIframe.wrap(document.getElementById('call'),
				{showFullscreenButton: true}
			);
			callFrame.join({ url: this.props.module.callURL });
		}, 750);
	}

	render(){
		const userId = firebase.auth().currentUser.uid;	

		return(
		<div>
		
		<ReactModal 
			isOpen={this.state.callActive}>
			<h3 style={{position: 'absolute', zIndex: 5, top: '-6px', right: '2px', cursor: 'pointer'}}><AiFillCloseCircle onClick={() => {this.endFrame()}}/></h3>
			<iframe id='call' allow="camera; microphone; autoplay" style={{height: '100%', width: '100%'}}></iframe>
		</ReactModal>

		<Card style={{marginTop: '5px', marginBottom: '5px', marginLeft: '2px', marginRight: '2px'}}>
			<Card.Header>
				Chat 
				{(this.props.module.callURL.length < 1) ?
				<div style={{float: 'right'}}><p>Video chat needs DM activation</p></div> : 
				(!this.state.callActive) ? 
				<div style={{float: 'right'}}><Button onClick={() =>{this.joinCall();}}>Join Call</Button></div> :
				<div style={{float: 'right'}}><Button onClick={() => {this.endFrame();}}>Leave Call</Button></div>
				}
			</Card.Header>
			<Card.Body>
			<div id="scroll" className="chatWindow" style={{overflowY: 'scroll', maxHeight: '500px'}}>
					{(this.props.module.chat) ? Object.keys(this.props.module.chat).map(key => (
					<div key={key} style={{width: '100%'}}>
						{(this.props.module.chat[key].creator === userId) ? 
						<div className="speech-bubble-ds" style={{float: 'right'}}>
							<p style={{marginBottom: '3px'}}><strong>{this.props.userNames[this.props.module.chat[key].creator]}
						<MdDelete style={{float: 'right', position: 'relative', margin: '0', padding: '0', top:'0', right:'0'}} onClick={() => {this.props.handleDeleteMessage(this.props.match.params.key, key)}} />
							</strong></p>
							<p style={{marginBottom: '3px'}}>{this.props.module.chat[key].text}</p>
						</div>
						: 
						<div className="speech-bubble-ds" style={{float: 'left'}}>
							<p style={{marginBottom: '3px'}}><strong>{this.props.userNames[this.props.module.chat[key].creator]}</strong></p>
							<p style={{marginBottom: '3px'}}>{this.props.module.chat[key].text}</p>
						</div>
						}
					</div>
					)) : <></>}
			</div>
				<Form inline style={{width: '100%', border: '1px solid', borderColor: 'lightGrey', borderRadius: '.25em'}}>
				<Form.Control style={{width:'85%'}} className="textarea input" value={this.state.newMessage} as='textarea' onKeyPress={(event) => {if(event.charCode===13){event.preventDefault(); if(this.state.newMessage !== ''){this.props.handleNewMessage(this.props.match.params.key, this.state.newMessage); setTimeout(() => {document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight}, 500); this.setState({...this.state, newMessage: ''})}}}} onChange={(text) => {this.setState({...this.state, newMessage: text.target.value})}} placeholder="Enter your message..." />
				<BiSend size={30} color='#55cdfc' onClick={() => {if(this.state.newMessage !== ''){this.props.handleNewMessage(this.props.match.params.key, this.state.newMessage); setTimeout(() => {document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight}, 500); this.setState({...this.state, newMessage: ''})}}}/>
				</Form>
			</Card.Body>
		</Card>
		</div>
		)
	}
}

const mapStateToProps = state => {
	return{
        module: state.module,
		userNames: state.userNames,
	}
}

export default withRouter(connect(mapStateToProps, 
	{handleNewMessage, handleDeleteMessage, handleGrabModuleChat, handleGrabCallURL, handleNewCallURL, handleDeleteCallURL}
	)(Chat));
