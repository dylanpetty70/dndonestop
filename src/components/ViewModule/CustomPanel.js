import React, { Component } from 'react';
import { connect } from 'react-redux';
import {handleGrabModuleEnv, handleChangeMapScale, handleSetCurrentModuleMap, handleGrabModuleEnvOptions, handleGrabMaps, handleUpdateMaps, handleNewMap, handleUpdateModuleOther, handleSetCurrentModuleEnv, handleUpdateModuleCurrent, handleNewModuleEnvironment, handleChangeModuleEnvScale, handleDeleteModuleEnvironment, handleDeleteModule, handleGrabModulePlayers} from '../../actions/modules';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Typeahead } from 'react-bootstrap-typeahead';
import {editTokens} from '../../actions/editEnv';
import {handleChangeGrid} from '../../actions/draggable';
import {RiCloseLine} from 'react-icons/ri';
import ReactModal from 'react-modal-resizable-draggable';
import {AiFillCloseCircle} from 'react-icons/ai';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import {useMediaQuery} from 'react-responsive';
import Chat from './Chat';
import {withRouter} from 'react-router-dom';

const ref1 = React.createRef();

const ShowAll = ({children}) => {
	const isLarge = useMediaQuery({ minWidth: 1150 });
	return isLarge ? children : null;
}

class CustomPanel extends Component {

	constructor(props){
		super(props);
		this.state = {tempItem: '',
						uid: '',
						tempScale: '',
						scaleError: false,
						tempToken: {creature: '', scene: '', background: '', players: ''},
						tempTokenScale: {creature: 1, scene: 1, background: 1, players: 1},
						tempEnv: this.props.draggable.environment.name,
						tempNewEnv: '',
						tempPlayerEnv: '',
						tempMoveEnv: '',
						showEnvVar: false,
						showPlaceTok: false,
						showEnvChange: false,
						showDelete: false,
						showPlayers: false,
						showChat: false,
						tempShare: '',
						tempBackground: '',
						showEdit: false,
						tempConditions: '',
						tempName: '',
						tempHP: '',
						tempAC: '',
						tempOther: '',
						tempLinkEnv: '',
						tempCoverScale: '',
						showMaps: false,
						tempNewMap: '',
						tempMap: '',
						tempAddMap: '',
						tempMaptoEnv: '',
						tempMapScale: 30,
						}
		this.placeToken = this.placeToken.bind(this);
		this.editPopup = this.editPopup.bind(this);
		this.checkConditions = this.checkConditions.bind(this);
		this.addPlayerToken = this.addPlayerToken.bind(this);
		this.copyToClipboard = this.copyToClipboard.bind(this);
		this.objectItems = this.objectItems.bind(this);
	}

	componentDidMount(){
		this.props.handleGrabMaps(this.props.match.params.key);
    }

	objectItems(tag){
		let temp = [];
		if(this.props.draggableItems){
			for(let i = 0; i < Object.keys(this.props.draggableItems).length; i++){
				if(this.props.draggableItems[Object.keys(this.props.draggableItems)[i]].tag.indexOf(tag) > -1){
					temp.push(Object.keys(this.props.draggableItems)[i])
				}
			}
		}
		return temp;
	}

	addPlayerToken(tag){
		if(this.state.tempToken[tag] !== '' & this.state.tempToken[tag] !== 'Select One' & this.state.tempToken[tag] !== undefined){
			let current = (this.props.module.environment.items) ? this.props.module.environment.items : [];
			current.push({item: this.state.tempToken[tag], pLeft: 80, pTop: 20, scale: this.state.tempTokenScale[tag], rotation: 0, player: true, link: '', cover: false});
			this.props.handleUpdateModuleCurrent(this.props.match.params.key, this.props.module.envKey, current); 
		}
	}

	placeToken(){
		return(<Card style={{marginTop: '5px', marginBottom: '5px', marginLeft: '2px', marginRight: '2px'}}>
			<Card.Header>Place Tokens</Card.Header>
			<Card.Body>
			<Card.Title style={{fontSize: '16px'}}>Player Tokens</Card.Title>
				<Form>
				<Form.Label>Name</Form.Label>
				<Form.Group>
				<Typeahead
						id="playerTokens"
						labelKey="players"
						onChange={(text) => {this.setState({...this.state, tempToken: {...this.state.tempToken, players: text[0]}})}}
						options={this.objectItems('players')}
						placeholder="Choose a player token..."
						ref={ref1}
						> 
						<RiCloseLine color='black' size={22} style={{position: 'absolute', right: '3px', top: '10px'}} onClick={() => {ref1.current.clear()}}/>
						</Typeahead>
				</Form.Group>
				<Form.Label style={{float: 'left', paddingRight: '5px'}}>Scale</Form.Label>
				<Form.Group>
				<Form.Control placeholder={this.state.tempTokenScale.players} style={{float: 'left', width: '50px'}} custom onChange={(text) => {(text.target.value !== '0' & text.target.value !== '' & Number(text.target.value) < 6 & (!isNaN(Number(text.target.value)))) ? this.setState({...this.state, tempTokenScale: {...this.state.tempTokenScale, players: text.target.value}}) : this.setState({...this.state, tempTokenScale: {...this.state.tempTokenScale, players: '1'}})}}/>
				<Form.Label style={{color: 'grey', paddingLeft: '10px'}}>Max of 5</Form.Label>
				</Form.Group>
				<Button variant="outline-primary" style={{float: 'right', width: '100px'}} onClick={() => {this.addPlayerToken('players')}}>Add Item</Button>
				</Form>
			</Card.Body>
		</Card>)
	}

	checkConditions(id){
		let temp = this.props.module.environment.items;
		if(!temp[id].conditions){
			temp[id].conditions = {};
		}
		return temp;
	}
	
	editPopup(){

		if(this.props.module.environment.items[this.props.box.id] && this.props.box.player){
		return(<div style={{marginTop: '25px', paddingBottom: '25px', height: '100%', opacity: '.9'}}>
			<Card style={{padding: '20px', height: '100%', overflowY: 'scroll'}}>
				<Card.Title style={{textAlign: 'center'}}>Select Token to Edit Tooltip</Card.Title>
				  <InputGroup size="sm" className="mb-3">
					<InputGroup.Prepend>
					  <InputGroup.Text id="inputGroup-sizing-sm">Object</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl disabled value={this.props.box.object} />
				  </InputGroup>

				  <InputGroup className="mb-3">
					<InputGroup.Prepend>
					  <InputGroup.Text id="inputGroup-sizing-sm">{(this.props.module.environment.items[this.props.box.id].conditions) ? this.props.module.environment.items[this.props.box.id].conditions[`Player Name`] : 'Player Name'}</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
					  placeholder={(this.props.module.environment.items[this.props.box.id].conditions) ? this.props.module.environment.items[this.props.box.id].conditions[`Player Name`] : 'Enter player name...'}
					  onChange={(text) => {this.setState({...this.state, tempName: text.target.value})}}
					/>
					<InputGroup.Append>
					  <Button variant="outline-secondary" onClick={() => {let temp = this.checkConditions(this.props.box.id); temp[this.props.box.id].conditions[`Player Name`] = this.state.tempName; this.props.handleUpdateModuleCurrent(this.props.match.params.key, this.props.module.envKey, temp)}}>Save Player Name</Button>
					</InputGroup.Append>
				  </InputGroup>

				  <InputGroup className="mb-3">
					<InputGroup.Prepend>
					  <InputGroup.Text id="inputGroup-sizing-sm">{(this.props.module.environment.items[this.props.box.id].conditions) ? this.props.module.environment.items[this.props.box.id].conditions[`HP`] : 'HP'}</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
					  placeholder={(this.props.module.environment.items[this.props.box.id].conditions) ? this.props.module.environment.items[this.props.box.id].conditions[`HP`] : 'Enter HP...'}
					  onChange={(text) => {this.setState({...this.state, tempHP: text.target.value})}}
					/>
					<InputGroup.Append>
					  <Button variant="outline-secondary" onClick={() => {let temp = this.checkConditions(this.props.box.id); temp[this.props.box.id].conditions[`HP`] = this.state.tempHP; this.props.handleUpdateModuleCurrent(this.props.match.params.key, this.props.module.envKey, temp)}}>Save HP</Button>
					</InputGroup.Append>
				  </InputGroup>

				  <InputGroup className="mb-3">
					<InputGroup.Prepend>
					  <InputGroup.Text id="inputGroup-sizing-sm">{(this.props.module.environment.items[this.props.box.id].conditions) ? this.props.module.environment.items[this.props.box.id].conditions[`Armor Class`] : 'Armor Class'}</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
					  placeholder={(this.props.module.environment.items[this.props.box.id].conditions) ? this.props.module.environment.items[this.props.box.id].conditions[`Armor Class`] : 'Enter armor class..'}
					  onChange={(text) => {this.setState({...this.state, tempAC: text.target.value})}}
					/>
					<InputGroup.Append>
					  <Button variant="outline-secondary" onClick={() => {let temp = this.checkConditions(this.props.box.id); temp[this.props.box.id].conditions[`Armor Class`] = this.state.tempAC; this.props.handleUpdateModuleCurrent(this.props.match.params.key, this.props.module.envKey, temp)}}>Save Armor Class</Button>
					</InputGroup.Append>
				  </InputGroup>

				  <InputGroup className="mb-3">
					<InputGroup.Prepend>
					  <InputGroup.Text id="inputGroup-sizing-sm">{(this.props.module.environment.items[this.props.box.id].conditions) ? this.props.module.environment.items[this.props.box.id].conditions[`Conditions`] : 'Conditions'}</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
					  placeholder={(this.props.module.environment.items[this.props.box.id].conditions) ? this.props.module.environment.items[this.props.box.id].conditions[`Conditions`] : 'Enter conditions...'}
					  onChange={(text) => {this.setState({...this.state, tempConditions: text.target.value})}}
					/>
					<InputGroup.Append>
					  <Button variant="outline-secondary" onClick={() => {let temp = this.checkConditions(this.props.box.id); temp[this.props.box.id].conditions[`Conditions`] = this.state.tempConditions; this.props.handleUpdateModuleCurrent(this.props.match.params.key, this.props.module.envKey, temp)}}>Save Conditions</Button>
					</InputGroup.Append>
				  </InputGroup>

				  <InputGroup className="mb-3">
					<InputGroup.Prepend>
					  <InputGroup.Text id="inputGroup-sizing-sm">{(this.props.module.environment.items[this.props.box.id].conditions) ? this.props.module.environment.items[this.props.box.id].conditions[`Notes`] : "Other Notes"}</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
					  placeholder={(this.props.module.environment.items[this.props.box.id].conditions) ? this.props.module.environment.items[this.props.box.id].conditions[`Notes`] : "Enter other notes..."}
					  onChange={(text) => {this.setState({...this.state, tempOther: text.target.value})}}
					/>
					<InputGroup.Append>
					  <Button variant="outline-secondary" onClick={() => {let temp = this.checkConditions(this.props.box.id); temp[this.props.box.id].conditions[`Notes`] = this.state.tempOther; this.props.handleUpdateModuleCurrent(this.props.match.params.key, this.props.module.envKey, temp)}}>Save Notes</Button>
					</InputGroup.Append>
				  </InputGroup>
			</Card>
		</div>)
		} else {
			return (
				<div style={{marginTop: '25px', width: '100%', height: '100%', paddingBottom: '25px'}}>
					<Card style={{height: '100%',padding: '20px'}}>
						<Card.Title style={{textAlign: 'center'}}>Select Player Token to Edit Tooltip</Card.Title>
					</Card>
				</div>
			)
		}
	}

	copyToClipboard(){
		const el = document.createElement('textarea');
		el.value = 'http://www.dndonestop.com/viewmodules/' + this.props.match.params.key;
		el.setAttribute('readonly', '');
		el.style.position = 'absolute';
		el.style.left = '-9999px';
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
		alert('Copied: http://www.dndonestop.com/viewmodules/' + this.props.match.params.key);
	}

	render(){
		return(
		<div>
		
			<ReactModal 
				onRequestClose={() => this.setState({...this.state, showEdit: false})}
				isOpen={this.state.showEdit}
				initHeight='400px'
				top='200px'>
				<h3 style={{position: 'absolute', zIndex: 3, top: '-6px', right: '2px', cursor: 'pointer'}}><AiFillCloseCircle onClick={() => {this.props.editTokens(!this.props.editEnv.tokens); this.setState({...this.state, showEdit: false})}}/></h3>
				{(this.props.module.environment.items && Object.keys(this.props.box).length > 0) ? this.editPopup() : 
				
				<div style={{marginTop: '25px', width: '100%', height: '100%', paddingBottom: '25px'}}>
					<Card style={{height: '100%',padding: '20px'}}>
						<Card.Title style={{textAlign: 'center'}}>Select Token to Edit Tooltip</Card.Title>
					</Card>
				</div>
				
				}
			</ReactModal>

		<div className="p-3 bg-secondary text-white" style={{position: 'absolute', left: '0', top: '75px', width: '1895px', margin: '0'}}>
			<h2 style={{paddingLeft: '25px', paddingRight: '25px', float: 'left'}}>{(this.props.module.environment.name.length > 0) ? this.props.module.environment.name : "DM has not selected the environment"}</h2>
			<ShowAll>
				{(this.props.userStatus) ? <>
					{(!this.props.module.envKey.length < 1) ? <Button variant="secondary" style={{marginLeft: '15px', border: '1px solid', borderColor: 'white'}} onClick={() => {this.setState({...this.state, showPlaceTok: !this.state.showPlaceTok})}}>Player Tokens</Button> : <></>}
					{(this.props.module.environment.items) ? <Button variant="secondary" style={{marginLeft: '15px', border: '1px solid', borderColor: 'white'}} onClick={() => {this.props.editTokens(!this.props.editEnv.tokens); this.setState({...this.state, showEdit: !this.state.showEdit})}}>Token Tooltips</Button> : <></>}
					{(!this.props.module.envKey.length < 1) ? <Button variant="secondary" style={{marginLeft: '15px', border: '1px solid', borderColor: 'white'}} onClick={() => {(this.props.envOptions.color === 'white') ? this.props.handleChangeGrid('black') : (this.props.envOptions.color === 'black') ? this.props.handleChangeGrid('none') : this.props.handleChangeGrid('white')}}>Grid Color</Button> : <></>}
					{(!this.props.module.envKey.length < 1) ? <Button variant="secondary" style={{marginLeft: '15px', border: '1px solid', borderColor: 'white'}} onClick={() => {this.setState({...this.state, showChat: !this.state.showChat})}}>Chat</Button> : <></>}
				</>
				:
				<h4 style={{paddingLeft: '50px', paddingTop: '5px', color: 'blue'}}>Login to access more functionality</h4>
				}
			</ShowAll>
		</div>
			{(this.state.showPlaceTok || this.state.showChat || this.props.module.envKey.length < 1) ?
			<>
				<ShowAll>
			{(this.state.showPlaceTok || this.state.showMaps || this.state.showChat) ? <div style={{width: '450px', position: 'absolute', right: '10px', top: '155px', zIndex: '20000', maxHeight: '80%', overflowY: 'auto', opacity: '.9'}}>
				{(this.state.showChat) ? <Chat /> : <></>}
				{(this.state.showPlaceTok) ? this.placeToken() : <></>}
			</div> : <></>}
			</ShowAll>
			</>
			:
			<></>
			}
		</div>
		)
	}
}

const mapStateToProps = state => {
	return{
        draggable: state.draggable,
		envOptions: state.envOptions,
		userNames: state.userNames,
		editEnv: state.editEnv,
		draggableItems: state.draggableItems,
		box: state.box,
		module: state.module,
		userStatus: state.userStatus
	}
}

export default withRouter(connect(mapStateToProps, 
	{handleGrabMaps, handleUpdateMaps, editTokens, handleChangeGrid, handleNewMap, handleSetCurrentModuleMap, handleChangeMapScale,
	handleGrabModuleEnv, handleGrabModuleEnvOptions, handleUpdateModuleOther, handleSetCurrentModuleEnv, handleUpdateModuleCurrent, handleNewModuleEnvironment, handleChangeModuleEnvScale, handleDeleteModuleEnvironment, handleDeleteModule, handleGrabModulePlayers}
	)(CustomPanel));