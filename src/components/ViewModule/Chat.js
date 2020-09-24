import React, { Component } from 'react';
import { connect } from 'react-redux';
import {handleGrabModuleChat, handleNewMessage, handleDeleteMessage} from '../../actions/modules';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {BiSend} from 'react-icons/bi';
import {MdDelete} from 'react-icons/md';
import {withRouter} from 'react-router-dom';
var firebase = require("firebase/app");
require('firebase/auth');

class Chat extends Component {

	constructor(props){
		super(props);
		this.state = { newMessage: '',
						}
	}

	componentDidMount(){
		document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight;
		this.props.handleGrabModuleChat(this.props.match.params.key)
    }

	render(){
		const userId = firebase.auth().currentUser.uid;	

		return(
		<Card style={{marginTop: '5px', marginBottom: '5px', marginLeft: '2px', marginRight: '2px'}}>
			<Card.Header>
				Chat
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
	{handleNewMessage, handleDeleteMessage, handleGrabModuleChat}
	)(Chat));
