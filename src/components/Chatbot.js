import ChatBot from 'react-simple-chatbot';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {ThemeProvider} from 'styled-components';
import BaseInformation from './Information';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Classes from './GameInfo/classes';
import Conditions from './GameInfo/conditions';
import DamageTypes from './GameInfo/damageTypes';
import Equipment from './GameInfo/equipment';
import Features from './GameInfo/features';
import Languages from './GameInfo/languages';
import MagicSchools from './GameInfo/magicSchools';
import Monsters from './GameInfo/monsters';
import Races from './GameInfo/races';
import Spells from './GameInfo/spells';
import Traits from './GameInfo/traits';
import WeaponProperties from './GameInfo/weaponProperties';
var wizard  = '/images/title/wizard.png';
var userAvatar  = '/images/title/userAvatar.png';


class Chatbot extends Component {

	constructor(props){
		super(props);
        this.state = {
					generalKey: '',
					specificKey: '',
					info: [],
					showInfo: false,
					key: 1,
					options: [],
					searched: []
					};
		this.theme = this.theme.bind(this);
		this.steps = this.steps.bind(this);
		this.returnUserInfo = this.returnUserInfo.bind(this);
		this.information = this.information.bind(this);
		this.help = this.help.bind(this);
		this.showModal = this.showModal.bind(this);
		this.handleEnd = this.handleEnd.bind(this);
		this.chatbotRender = this.chatbotRender.bind(this);
		this.rollDice = this.rollDice.bind(this);
	}

	componentDidMount() {
	  this.steps()
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
		this.setState({...this.state, generalKey: '', specificKey: '', info: [], searched: []});

		if(input[0] === '#'){
			return 'roller';
		}

		for(var key in dndInfo){
			let keyString = key.replace(/-/g, '').replace(/ /g, '').toLowerCase();
			if(keyString === input){
				this.setState({...this.state, generalKey: key, searched: []})
				return key;
			}
		}

		for(var key1 in dndInfo){
			for(var key2 in dndInfo[key1]){
				let keyString = key2.replace(/-/g, '').replace(/ /g, '').toLowerCase();
				if(keyString === input){
					this.setState({...this.state, generalKey: key1, specificKey: key2, searched: []});
					return 'specific';
				}
			}
		}

		if(input.includes('help')){
			return 'help';
		} else if(input.includes('roll')){
			return 'roll';
		}

		let potentialOptions = [];
		for(var key3 in dndInfo){
			for(var key4 in dndInfo[key3]){
				let keyString = key4.replace(/-/g, '').replace(/ /g, '').toLowerCase();
				if(keyString.includes(input) && input.length > 3){
					potentialOptions.push(key4)
				}
			}
		}
		if(potentialOptions.length > 0){
			this.setState({...this.state, searched: [...potentialOptions]})
			return 'search';
		} else {
			return 'invalid';
		}
	}

	handleEnd(){
		this.information();
		setTimeout(() => {this.setState({...this.state, key: this.state.key + 1})}, 1000);
	}

	rollDice(previousValue){
		let input = previousValue.replace(/ /g, '').replace(/#/g, '').toLowerCase();
		
		let temp = input.split(",");
		let tempTotals = [];
		let tempVerified = [];
		let separator = [];
		let eachNumber = 0;
		for(let i = 0; i < temp.length; i++){
			separator = temp[i].split("d");
			if(separator.length === 2 && !isNaN(separator[0]) && !isNaN(separator[1]) && separator[0] !== "" && separator[1] !== ""){
				tempVerified.push(temp[i]);
				eachNumber = 0;
				for(let j = 0; j < Number(separator[0]); j++){
					eachNumber += Math.floor((Math.random() * Number(separator[1])) + 1)
				}
				tempTotals.push(eachNumber);
			}
		}

		let total = 0;
		for(let i = 0; i < tempTotals.length; i++){
			total += Number(tempTotals[i]);
		}

		let string = '';
		for(let i = 0; i < tempVerified.length; i++){
			string += tempVerified[i] + ': ' + tempTotals[i] + '\n';
		}
		
		string += "Total: " + total;
		
		return string;
	}

	steps(){
		let dndInfo = this.props.dndInfo.generalInfo.specifics;
		let temp = [];
		let tempOptions = [];
		let temp2 = [];
		for(var general in dndInfo){
			temp2.push({value: general, label: general, delay: 1000, hideInput: true, trigger: ({value}) => {return this.returnUserInfo(value)}});
			tempOptions = [];
			for(var keys in dndInfo[general]){
				tempOptions.push({value: keys, label: keys, delay: 1000, hideInput: true, trigger: ({value}) => {return this.returnUserInfo(value)}})
				temp.push({id: keys, options: [{value: keys, label: keys, delay: 1000, trigger: 'specific'}]})
			}
			tempOptions.push({value: 'Cancel', label: 'Cancel', delay: 1000, hideInput: true, trigger: 'userInput'})
			temp.push({id: general, options: tempOptions});
		}
		temp2.push({value: 'Cancel', label: 'Cancel', delay: 1000, hideInput: true, trigger: 'userInput'})
		temp.push({id: 'all', options: temp2});
		temp.push({id: 'search', message: "Here are some possible things you meant to search.", end: true})
		

		let steps=[
					{
					  id: 'Intro',
					  message: 'Welcome, intrepid adventurer!',
					  trigger: 'Intro help',
					  delay: 1000
					},
					{
					  id: 'Intro help',
					  message: "If you seek help on your quest, type help. For assistance creating randomness, type roll.",
					  trigger: 'userInput',
					  delay: 1000
					},

					{
					  id: 'userInput',
					  user: true,
					  trigger: ({value}) => {return this.returnUserInfo(value)}
					},
					{
					  id: 'roll',
					  message: "To roll dice, start with # and each set of dice followed by a comma. Example: '#2d20, 2d20, 4d6, 10d10'",
					  trigger: 'userInput',
					},
					{
					  id: 'roller',
					  message: ({previousValue}) => {return this.rollDice(previousValue)},
					  trigger: 'userInput',
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
		this.setState({...this.state, options: steps})
	};

	showModal(){
		
		let temp = [];
		let flag = false;
		if(this.state.searched.length > 0){
			temp = this.state.searched.map((i) => {return(<div style={{paddingBottom: '-10px'}} key={i}><p>{i}</p><br/></div>)})
			flag = true;
		} else if(this.state.specificKey !== ''){
			if(this.state.generalKey === 'classes'){
				temp = <Classes item={this.state.specificKey}/>
			} else if(this.state.generalKey === 'conditions'){
				temp = <Conditions item={this.state.specificKey}/>
			} else if(this.state.generalKey === 'damage-types'){
				temp = <DamageTypes item={this.state.specificKey}/>
			} else if(this.state.generalKey === 'equipment'){
				temp = <Equipment item={this.state.specificKey}/>
			} else if(this.state.generalKey === 'features'){
				temp = <Features item={this.state.specificKey}/>
			} else if(this.state.generalKey === 'languages'){
				temp = <Languages item={this.state.specificKey}/>
			} else if(this.state.generalKey === 'magic-schools'){
				temp = <MagicSchools item={this.state.specificKey}/>
			} else if(this.state.generalKey === 'monsters'){
				temp = <Monsters item={this.state.specificKey}/>
			} else if(this.state.generalKey === 'races'){
				temp = <Races item={this.state.specificKey}/>
			} else if(this.state.generalKey === 'spells'){
				temp = <Spells item={this.state.specificKey}/>
			} else if(this.state.generalKey === 'traits'){
				temp = <Traits item={this.state.specificKey}/>
			} else if(this.state.generalKey === 'weapon-properties'){
				temp = <WeaponProperties item={this.state.specificKey}/>
			} else {
				temp = BaseInformation(this.state.specificKey, this.props.dndInfo.generalInfo.specifics[this.state.generalKey][this.state.specificKey]);
			}
		}
		return(<Modal
			show={this.state.showInfo}
			onHide={() => {this.setState({...this.state, showInfo: false})}}
			keyboard={false}
			size="lg"
			style={{top: '50px', height: '85%'}}
			>
			<Modal.Header>
				<Modal.Title>{(!flag) ? this.state.specificKey : "Possible Items You Meant To Search"}</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{overflowY: 'auto'}}>
						{(temp.length === 1) ? temp[0] : temp}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={() => {this.setState({...this.state, showInfo: false})}}>Close</Button>
			</Modal.Footer>
		</Modal>)
	}

	chatbotRender(options){
		return(<ThemeProvider theme={this.theme()} key={this.state.key}>
					<ChatBot 
						handleEnd={this.handleEnd}
						floating={true} 
						botAvatar={wizard}
						headerTitle='DnD Help Bot'
						userAvatar={userAvatar}
						floatingStyle={{zIndex: 40000}}
						style={{zIndex: 40000}}
						steps={options}
						/>
				</ThemeProvider>)
		
	}

	render(){
		return(
			<div>
			{(this.state.options.length > 0) ? this.chatbotRender(this.state.options) : <></>}
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
