import ChatBot from 'react-simple-chatbot';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {ThemeProvider} from 'styled-components';
import BaseInformation from './Information';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


class Chatbot extends Component {

	constructor(props){
		super(props);
        this.state = {
					generalKey: '',
					specificKey: '',
					info: [],
					showInfo: false,
					key: 1
					};
		this.theme = this.theme.bind(this);
		this.steps = this.steps.bind(this);
		this.returnUserInfo = this.returnUserInfo.bind(this);
		this.information = this.information.bind(this);
		this.help = this.help.bind(this);
		this.showModal = this.showModal.bind(this);
		this.handleEnd = this.handleEnd.bind(this);
		this.chatbotRender = this.chatbotRender.bind(this);
	}

	information() {
		this.setState({...this.state, showInfo: true});
		return 'Anything else?';
	}

	theme(){
		let style={
			background: '#f5f8fb',
			headerBgColor: '#8b3a3a',
			headerFontColor: '#fff',
			headerFontSize: '18px',
			botBubbleColor: '#8b3a3a',
			botFontColor: '#fff',
			userBubbleColor: '#fff',
			userFontColor: '#4a4a4a'
		};
		return style
	};

	help(){
		let string = 'You can type in any offical dnd 5e term to get specific information. Here are a list of high-level terms. Click them to dive deeper.';
		return string;
	}

	returnUserInfo(value, steps){
		let input = value.replace(/ /g, '').replace(/-/g, '').toLowerCase();
		let dndInfo = this.props.dndInfo.generalInfo.specifics;
		this.setState({...this.state, generalKey: '', specificKey: '', info: []});

		if(input === 'help'){
			return 'help';
		}

		for(var key in dndInfo){
			let keyString = key.replace(/-/g, '').replace(/ /g, '').toLowerCase();
			if(keyString === input){
				this.setState({...this.state, generalKey: key})
				return key;
			}
		}

		for(var key1 in dndInfo){
			for(var key2 in dndInfo[key1]){
				let keyString = key2.replace(/-/g, '').replace(/ /g, '').toLowerCase();
				if(keyString === input){
					let temp = BaseInformation(key2, this.props.dndInfo.generalInfo.specifics[key1][key2]);
					this.setState({...this.state, info: temp, generalKey: key1, specificKey: key2});
					return 'specific';
				}
			}
		}

		return 'invalid';
	}

	handleEnd(){
		this.information();
		setTimeout(() => {this.setState({...this.state, key: this.state.key + 1})}, 1000);
	}

	steps(){
		let dndInfo = this.props.dndInfo.generalInfo.specifics;
		let temp = [];
		let tempOptions = [];
		let temp2 = [];
		for(var general in dndInfo){
			temp2.push({value: general, label: general, delay: 1000, trigger: ({value}) => {return this.returnUserInfo(value)}});
			tempOptions = [];
			for(var keys in dndInfo[general]){
				tempOptions.push({value: keys, label: keys, delay: 1000, trigger: ({value}) => {return this.returnUserInfo(value)}})
				temp.push({id: keys, options: [{value: keys, label: keys, delay: 1000, trigger: 'specific'}]})
			}
			temp.push({id: general, options: tempOptions});
		}
		temp.push({id: 'all', options: temp2});

		let steps=[
					{
					  id: 'Intro',
					  message: 'Welcome, intrepid adventurer!',
					  trigger: 'Intro help',
					  delay: 1000
					},
					{
					  id: 'Intro help',
					  message: "If you seek a quest, type help.",
					  trigger: 'userInput',
					  delay: 1000
					},
					{
					  id: 'userInput',
					  user: true,
					  trigger: ({value}) => {return this.returnUserInfo(value)}
					},
					{
					  id: 'specific',
					  message:"Here you go!",
					  end: true,
					},
					{
					  id: 'help',
					  message: () => {return this.help()},
					  trigger: 'all',
					  delay: 1000
					},
					{
					  id: 'invalid',
					  message: "This input is invalid. If you don't know what you're doing, type help.",
					  trigger: 'userInput',
					  delay: 1000
					},
				  ];

		steps = steps.concat(temp);
		return steps
	};

	showModal(){

		return(<Modal
			show={this.state.showInfo}
			onHide={() => {this.setState({...this.state, showInfo: false})}}
			keyboard={false}
			size="lg"
			>
			<Modal.Header>
				<Modal.Title>{this.state.specificKey}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
						{this.state.info}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={() => {this.setState({...this.state, showInfo: false})}}>Close</Button>
			</Modal.Footer>
		</Modal>)
	}

	chatbotRender(){
		return(<ThemeProvider theme={this.theme()} key={this.state.key}>
					<ChatBot 
						handleEnd={this.handleEnd}
						floating={true} 
						botAvatar={'images/title/wizard.png'}
						headerTitle='DnD Help Bot'
						userAvatar={'images/title/userAvatar.png'}
						floatingStyle={{zIndex: 40000}}
						style={{zIndex: 40000}}
						steps={this.steps()}
						/>
				</ThemeProvider>)
	}

	render(){
		return(
			<div>
			{this.chatbotRender()}
			{this.showModal()}
            </div>
		)
	}
}

const mapStateToProps = state => {
	return{
		dndInfo: state.dndInfo,
	}
}

export default connect(mapStateToProps, {})(Chatbot);
