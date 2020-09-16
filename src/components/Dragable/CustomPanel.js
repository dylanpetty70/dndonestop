import React, { Component } from 'react';
import { connect } from 'react-redux';
import {handleChangeBackground, handleGrabDraggable, handleUpdateCurrent, handleNewEnvironment, handleGrabOptions, handleChangeGrid, handleChangeScale, handleDeleteEnvironment, handleShareEnvironment} from '../../actions/draggable';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { Typeahead } from 'react-bootstrap-typeahead';
import {editTokens} from '../../actions/editEnv';
import Chat from './Chat';
import {RiCloseLine} from 'react-icons/ri';
import ReactModal from 'react-modal-resizable-draggable';
import {AiFillCloseCircle} from 'react-icons/ai';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const ref = React.createRef();
const ref1 = React.createRef();
const ref2 = React.createRef();
const ref3 = React.createRef();
const ref4 = React.createRef();

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
						showEnvVar: false,
						showPlaceTok: false,
						showEnvChange: false,
						showDelete: false,
						showChat: false,
						tempShare: '',
						tempBackground: '',
						showEdit: false,
						tempConditions: '',
						tempName: '',
						tempHP: '',
						tempAC: '',
						tempOther: ''
						}
		this.addToken = this.addToken.bind(this)
		this.objectItems = this.objectItems.bind(this);
		this.envOptions = this.envOptions.bind(this);
		this.changeEnv = this.changeEnv.bind(this);
		this.envVariables = this.envVariables.bind(this);
		this.placeToken = this.placeToken.bind(this);
		this.envChange = this.envChange.bind(this);
		this.deleteEnv = this.deleteEnv.bind(this);
		this.coverBack = this.coverBack.bind(this);
		this.editPopup = this.editPopup.bind(this);
		this.checkConditions = this.checkConditions.bind(this);
	}

	componentDidMount(){
    }

	addToken(tag){
		if(this.state.tempToken[tag] !== '' & this.state.tempToken[tag] !== 'Select One' & this.state.tempToken[tag] !== undefined){
			let current = (this.props.draggable.environment.items) ? this.props.draggable.environment.items : [];
			current.push({item: this.state.tempToken[tag], pLeft: 80, pTop: 20, scale: this.state.tempTokenScale[tag], rotation: 0});
			this.props.handleUpdateCurrent(this.props.draggable.key, current); 
		}
	}

	coverBack(){
		if(this.state.tempToken['scene'] !== '' & this.state.tempToken['scene'] !== 'Select One' & this.state.tempToken['scene'] !== undefined){
			let current = (this.props.draggable.environment.items) ? this.props.draggable.environment.items : [];
			let temp = [];
			for(let i = 0; i < current.length; i++){
				if(!current[i].back){
					temp.push(current[i]);
				}
			}
			let temp1 = [];

			let totalWidth = .98 * document.documentElement.clientWidth;
			let totalHeight = .8 * document.documentElement.clientHeight;

			for(let i = (Number(this.props.draggable.environment.scale) * this.state.tempTokenScale['scene']); i < totalWidth + (Number(this.props.draggable.environment.scale) * this.state.tempTokenScale['scene']); i += (Number(this.props.draggable.environment.scale) * this.state.tempTokenScale['scene'])){
				for(let j = (Number(this.props.draggable.environment.scale) * this.state.tempTokenScale['scene']); j < totalHeight + (Number(this.props.draggable.environment.scale) * this.state.tempTokenScale['scene']); j += (Number(this.props.draggable.environment.scale) * this.state.tempTokenScale['scene'])){
					temp1.push(
						{item: this.state.tempToken['scene'], 
						pLeft: i - (Number(this.props.draggable.environment.scale) * this.state.tempTokenScale['scene']), 
						pTop: j - (Number(this.props.draggable.environment.scale) * this.state.tempTokenScale['scene']) -1, 
						scale: this.state.tempTokenScale['scene'], 
						rotation: 0,
						back: true
						}
					)
				}
			}
			let temp3 = [...temp1, ...temp]
			console.log(temp3)
			this.props.handleUpdateCurrent(this.props.draggable.key, temp3); 
		}
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

	envOptions(){
		let temp = [];
			for(let i = 0; i < Object.values(this.props.draggable.options).length; i++){
				temp.push(<option key={i} value={Object.keys(this.props.draggable.options)[i]}>{Object.values(this.props.draggable.options)[i]}</option>)
			}
		return temp;
	}

	changeEnv(){
		if(this.state.tempEnv!== '' & this.state.tempEnv !== 'Select One'){
			this.props.handleGrabDraggable(this.state.tempEnv);
		}
	}

	envVariables(){
		return(<Card style={{marginTop: '5px', marginBottom: '5px', marginLeft: '2px', marginRight: '2px'}}>
			<Card.Header>
				Grid Options
			</Card.Header>
			<Card.Body>
			<Card.Title style={{fontSize: '16px'}}>Grid Scale</Card.Title>
				<Form inline='true' style={{marginLeft: '10px'}}>
					<Form.Group>
						<Form.Control placeholder={this.props.draggable.environment.scale} style={{width: '70px'}} onKeyPress={(event) => {if(event.charCode===13){event.preventDefault(); (this.state.tempScale !== '' & !isNaN(Number(this.state.tempScale))) ? this.props.handleChangeScale(this.props.draggable.key, this.state.tempScale) : this.setState({...this.state, scaleError: true})}}} onChange={(text) => {(text.target.value !== '0' & text.target.value !== '' & (!isNaN(Number(text.target.value)))) ? this.setState({...this.state, tempScale: text.target.value}) : this.setState({...this.state, tempScale: this.props.draggable.scale})}} />
					</Form.Group>
					<Button variant="outline-primary" style={{marginLeft: '30px'}} onClick={() => {(this.state.tempScale !== '' & !isNaN(Number(this.state.tempScale))) ? this.props.handleChangeScale(this.props.draggable.key, this.state.tempScale) : this.setState({...this.state, scaleError: true})}}>Change Scale</Button>
				</Form>
				<Form>
				<Card.Title  style={{fontSize: '16px', marginTop: '30px'}}>Grid Color</Card.Title>
					<Form.Group>
					<Typeahead
							id="gridColor"
							labelKey="gridColor"
							onChange={(text) => {this.props.handleChangeGrid(text[0]);}}
							options={['black', 'white', 'none']}
							placeholder={this.props.envOptions.color}
							ref={ref}
						> 
						<RiCloseLine color='black' size={22} style={{position: 'absolute', right: '3px', top: '10px'}} onClick={() => {ref.current.clear()}}/>
						</Typeahead>
					</Form.Group>
				</Form>
				<Form>
				<Card.Title  style={{fontSize: '16px', marginTop: '30px'}}>Background Hex Color</Card.Title>
					<Form.Group>
						<Form.Control value={this.state.tempBackground} placeholder={'Example: #63c900'} style={{width: '170px', float: 'left'}} onKeyPress={(event) => {if(event.charCode===13){event.preventDefault(); (this.state.tempBackground[0] === '#') ? this.props.handleChangeBackground({background: this.state.tempBackground}) : this.setState({...this.state, tempBackground: ''})}}} onChange={(text) => {if(text.target.value !== '' && text.target.value[0] === '#' && text.target.value.length < 8){this.setState({...this.state, tempBackground: text.target.value})}}}/>
					</Form.Group>
					<Button variant="outline-primary" style={{marginLeft: '30px', float: 'left'}} onClick={() => {(this.state.tempBackground[0] === '#') ? this.props.handleChangeBackground(this.state.tempBackground) : this.setState({...this.state, tempBackground: ''})}}>Change Background</Button>
				</Form>
			</Card.Body>
		</Card>)
	}

	placeToken(){
		return(<Card style={{marginTop: '5px', marginBottom: '5px', marginLeft: '2px', marginRight: '2px'}}>
			<Card.Header>Edit Tokens</Card.Header>
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
				<Form.Control placeholder={this.state.tempTokenScale.players} style={{float: 'left', width: '50px'}} custom onChange={(text) => {(text.target.value !== '0' & text.target.value !== '' & (!isNaN(Number(text.target.value)))) ? this.setState({...this.state, tempTokenScale: {...this.state.tempTokenScale, players: text.target.value}}) : this.setState({...this.state, tempTokenScale: {...this.state.tempTokenScale, players: '1'}})}}/>
				</Form.Group>
				<Button variant="outline-primary" style={{float: 'right', width: '100px'}} onClick={() => {this.addToken('players')}}>Add Item</Button>
				</Form>

				<br/>
			<Card.Title style={{fontSize: '16px', marginTop: '30px'}}>Creatures/Humanoids</Card.Title>
				<Form>
				<Form.Label>Name</Form.Label>
				<Form.Group>
				<Typeahead
						id="creatureTokens"
						labelKey="creature"
						onChange={(text) => {this.setState({...this.state, tempToken: {...this.state.tempToken, creature: text[0]}})}}
						options={this.objectItems('creature')}
						placeholder="Choose a creature token..."
						ref={ref2}
						> 
						<RiCloseLine color='black' size={22} style={{position: 'absolute', right: '3px', top: '10px'}} onClick={() => {ref2.current.clear()}}/>
						</Typeahead>
				</Form.Group>
				<Form.Label style={{float: 'left', paddingRight: '5px'}}>Scale</Form.Label>
				<Form.Group>
				<Form.Control placeholder={this.state.tempTokenScale.creature} style={{float: 'left', width: '50px'}} custom onChange={(text) => {(text.target.value !== '0' & text.target.value !== '' & (!isNaN(Number(text.target.value)))) ? this.setState({...this.state, tempTokenScale: {...this.state.tempTokenScale, creature: text.target.value}}) : this.setState({...this.state, tempTokenScale: {...this.state.tempTokenScale, creature: '1'}})}}/>
				</Form.Group>
				<Button variant="outline-primary" style={{float: 'right', width: '100px'}} onClick={() => {this.addToken('creature')}}>Add Item</Button>
				</Form>

				<br/>
				<Card.Title style={{fontSize: '16px', marginTop: '30px'}}>Scene</Card.Title>
				<Form>
				<Form.Label>Name</Form.Label>
				<Form.Group style={{paddingRight: '20px'}}>
				<Typeahead
						id="sceneTokens"
						labelKey="scene"
						onChange={(text) => {this.setState({...this.state, tempToken: {...this.state.tempToken, scene: text[0]}})}}
						options={this.objectItems('scene')}
						placeholder="Choose a scene token..."
						ref={ref3}
						> 
						<RiCloseLine color='black' size={22} style={{position: 'absolute', right: '3px', top: '10px'}} onClick={() => {ref3.current.clear()}}/>
						</Typeahead>
				</Form.Group>
				<Form.Label style={{float: 'left', paddingRight: '5px'}}>Scale</Form.Label>
				<Form.Group>
				<Form.Control placeholder={this.state.tempTokenScale.scene} style={{float: 'left', width: '50px'}} custom onChange={(text) => {(text.target.value !== '0' & text.target.value !== '' & (!isNaN(Number(text.target.value)))) ? this.setState({...this.state, tempTokenScale: {...this.state.tempTokenScale, scene: text.target.value}}) : this.setState({...this.state, tempTokenScale: {...this.state.tempTokenScale, scene: '1'}})}}/>
				<Button variant="outline-primary" style={{float: 'right', width: '100px'}} onClick={() => {this.addToken('scene')}}>Add Item</Button>
				</Form.Group>
				<div style={{display: 'inline-block', width: '100%'}}>
				<Button variant="outline-primary" style={{float: 'right', width: '200px', marginTop: '10px'}} onClick={() => {this.coverBack('scene')}}>Cover Background</Button>
				</div>
				<div style={{display: 'inline-block'}}>
					<p style={{color: 'red', fontSize: '12px'}}>Covering the background with too many tokens may slow performance.</p>
				</div>
				</Form>
			</Card.Body>
		</Card>)
	}

	envChange(){
		return(<Card style={{marginTop: '5px', marginBottom: '5px', marginLeft: '2px', marginRight: '2px'}}>
			<Card.Header>
				Environment 
			</Card.Header>
			<Card.Body>
			<Card.Title style={{fontSize: '16px'}}>Change Environment</Card.Title>
				<Form style={{margin: '5px'}}>
					<Form.Control value={this.state.tempEnv} as="select" style={{float: 'left', width: '250px'}} onChange={(text) => {this.setState({...this.state, tempEnv: text.target.value})}}>
						<option value='Select One'>Select One</option>
						{this.envOptions()}
					</Form.Control>
					<Button variant="outline-primary" style={{ float: 'right', marginTop: '10px'}} onClick={() => {this.changeEnv()}}>Change Environment</Button>
				</Form>
				<br/>
				<Card.Title style={{fontSize: '16px', marginTop: '75px'}}>New Environment</Card.Title>
				<Form style={{margin: '5px'}}>
					<Form.Group>
						<Form.Control placeholder='Name' style={{width: '250px'}} onKeyPress={(event) => {if(event.charCode===13 & event.target.value !== ''){event.preventDefault(); this.props.handleNewEnvironment(this.state.tempNewEnv); this.setState({...this.state, tempEnv: this.state.tempNewEnv});}}} onChange={(text) => {if(text.target.value !== ''){this.setState({...this.state, tempNewEnv: text.target.value})}}} />
					</Form.Group>
					<Button variant="outline-primary" style={{ float: 'right'}} onClick={() => {this.props.handleNewEnvironment(this.state.tempNewEnv); this.setState({...this.state, tempEnv: this.state.tempNewEnv});}}>Create new Environment</Button>
				</Form>
				{(this.props.draggable.key.length > 0) ?
				<>
				<Card.Title style={{fontSize: '16px', marginTop: '75px'}}>Share Environment</Card.Title>
				<Form style={{margin: '5px'}}>
				<Form.Group  style={{float: 'left', width: '250px'}}>
					<Typeahead
						id="searchshare"
						labelKey="share"
						onChange={(value) => {this.setState({...this.state, tempShare: Object.keys(this.props.userNames)[Object.values(this.props.userNames).indexOf(value[0])]})}}
						options={Object.values(this.props.userNames)}
						placeholder={"Share with..."}
						ref={ref4}
						> 
						<RiCloseLine color='black' size={22} style={{position: 'absolute', right: '3px', top: '10px'}} onClick={() => {ref4.current.clear()}}/>
						</Typeahead>
				</Form.Group>
                <Button variant="outline-primary" style={{ float: 'right', marginTop: '10px'}} onClick={() => {this.props.handleShareEnvironment(this.props.draggable.key, this.state.tempShare)}}>
                    Share Environment 
                </Button>
			</Form>
			<br/>
				<Button variant="danger" style={{float: 'right', marginTop: '25px', marginRight: '10px'}} onClick={() => {this.props.editTokens(false); this.setState({...this.state, showDelete: !this.state.showDelete, showEnvChange: false, showEnvVar: false, showPlaceTok: false})}}>Delete Current Environment</Button>
			</>:
			<></>}
			
			</Card.Body>
		</Card>)
	}

	deleteEnv(){
		if(this.props.draggable.key.length > 0){
			return(
				  <Modal
					show={this.state.showDelete}
					onHide={() => {this.setState({showDelete: false})}}
					backdrop="static"
					keyboard={false}
					>
					<Modal.Header>
						<Modal.Title>Delete Enivronment</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Label>Are you sure you want to delete {this.props.draggable.environment.name}?</Form.Label>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="danger" onClick={() => {this.setState({showDelete: false}); this.props.handleDeleteEnvironment(this.props.draggable.key); setTimeout(() => {this.props.handleGrabOptions()}, 1000)}}>
							Delete
						</Button>
						<Button variant="secondary" onClick={() => {this.setState({showDelete: false})}}>
						Cancel
						</Button>
					</Modal.Footer>
					</Modal>     
			);
		} else {
			if(this.state.showDelete) {this.setState({...this.state, showDelete: false})}
			return (<></>);
		}

	}

	checkConditions(id){
		let temp = this.props.draggable.environment.items;
		if(!temp[id].conditions){
			temp[id].conditions = {};
		}
		return temp;
	}
	
	editPopup(){


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
					  <InputGroup.Text id="inputGroup-sizing-sm">{(this.props.draggable.environment.items[this.props.box.id].conditions) ? this.props.draggable.environment.items[this.props.box.id].conditions[`Player Name`] : 'Player Name'}</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
					  placeholder={(this.props.draggable.environment.items[this.props.box.id].conditions) ? this.props.draggable.environment.items[this.props.box.id].conditions[`Player Name`] : 'Enter player name...'}
					  onChange={(text) => {this.setState({...this.state, tempName: text.target.value})}}
					/>
					<InputGroup.Append>
					  <Button variant="outline-secondary" onClick={() => {let temp = this.checkConditions(this.props.box.id); temp[this.props.box.id].conditions[`Player Name`] = this.state.tempName; this.props.handleUpdateCurrent(this.props.draggable.key, temp)}}>Save Player Name</Button>
					</InputGroup.Append>
				  </InputGroup>

				  <InputGroup className="mb-3">
					<InputGroup.Prepend>
					  <InputGroup.Text id="inputGroup-sizing-sm">{(this.props.draggable.environment.items[this.props.box.id].conditions) ? this.props.draggable.environment.items[this.props.box.id].conditions[`HP`] : 'HP'}</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
					  placeholder={(this.props.draggable.environment.items[this.props.box.id].conditions) ? this.props.draggable.environment.items[this.props.box.id].conditions[`HP`] : 'Enter HP...'}
					  onChange={(text) => {this.setState({...this.state, tempHP: text.target.value})}}
					/>
					<InputGroup.Append>
					  <Button variant="outline-secondary" onClick={() => {let temp = this.checkConditions(this.props.box.id); temp[this.props.box.id].conditions[`HP`] = this.state.tempHP; this.props.handleUpdateCurrent(this.props.draggable.key, temp)}}>Save HP</Button>
					</InputGroup.Append>
				  </InputGroup>

				  <InputGroup className="mb-3">
					<InputGroup.Prepend>
					  <InputGroup.Text id="inputGroup-sizing-sm">{(this.props.draggable.environment.items[this.props.box.id].conditions) ? this.props.draggable.environment.items[this.props.box.id].conditions[`Armor Class`] : 'Armor Class'}</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
					  placeholder={(this.props.draggable.environment.items[this.props.box.id].conditions) ? this.props.draggable.environment.items[this.props.box.id].conditions[`Armor Class`] : 'Enter armor class..'}
					  onChange={(text) => {this.setState({...this.state, tempAC: text.target.value})}}
					/>
					<InputGroup.Append>
					  <Button variant="outline-secondary" onClick={() => {let temp = this.checkConditions(this.props.box.id); temp[this.props.box.id].conditions[`Armor Class`] = this.state.tempAC; this.props.handleUpdateCurrent(this.props.draggable.key, temp)}}>Save Armor Class</Button>
					</InputGroup.Append>
				  </InputGroup>

				  <InputGroup className="mb-3">
					<InputGroup.Prepend>
					  <InputGroup.Text id="inputGroup-sizing-sm">{(this.props.draggable.environment.items[this.props.box.id].conditions) ? this.props.draggable.environment.items[this.props.box.id].conditions[`Conditions`] : 'Conditions'}</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
					  placeholder={(this.props.draggable.environment.items[this.props.box.id].conditions) ? this.props.draggable.environment.items[this.props.box.id].conditions[`Conditions`] : 'Enter conditions...'}
					  onChange={(text) => {this.setState({...this.state, tempConditions: text.target.value})}}
					/>
					<InputGroup.Append>
					  <Button variant="outline-secondary" onClick={() => {let temp = this.checkConditions(this.props.box.id); temp[this.props.box.id].conditions[`Conditions`] = this.state.tempConditions; this.props.handleUpdateCurrent(this.props.draggable.key, temp)}}>Save Conditions</Button>
					</InputGroup.Append>
				  </InputGroup>

				  <InputGroup className="mb-3">
					<InputGroup.Prepend>
					  <InputGroup.Text id="inputGroup-sizing-sm">{(this.props.draggable.environment.items[this.props.box.id].conditions) ? this.props.draggable.environment.items[this.props.box.id].conditions[`Notes`] : "Other Notes"}</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
					  placeholder={(this.props.draggable.environment.items[this.props.box.id].conditions) ? this.props.draggable.environment.items[this.props.box.id].conditions[`Notes`] : "Enter other notes..."}
					  onChange={(text) => {this.setState({...this.state, tempOther: text.target.value})}}
					/>
					<InputGroup.Append>
					  <Button variant="outline-secondary" onClick={() => {let temp = this.checkConditions(this.props.box.id); temp[this.props.box.id].conditions[`Notes`] = this.state.tempOther; this.props.handleUpdateCurrent(this.props.draggable.key, temp)}}>Save Notes</Button>
					</InputGroup.Append>
				  </InputGroup>
			</Card>
		</div>)
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
				{(this.props.draggable.environment.items && Object.keys(this.props.box).length > 0) ? this.editPopup() : 
				
				<div style={{marginTop: '25px', width: '100%', height: '100%', paddingBottom: '25px'}}>
					<Card style={{height: '100%',padding: '20px'}}>
						<Card.Title style={{textAlign: 'center'}}>Select Token to Edit Tooltip</Card.Title>
					</Card>
				</div>
				
				}
			</ReactModal>

		{this.deleteEnv()}
		<div className="p-3 bg-secondary text-white" style={{position: 'absolute', left: '0', top: '75px', minWidth: '100%', margin: '0'}}>
			<h2 style={{paddingLeft: '25px', paddingRight: '25px', float: 'left'}}>{this.props.draggable.environment.name}</h2>
			{(!this.props.draggable.key.length < 1) ? <Button variant="secondary" style={{marginLeft: '15px', border: '1px solid', borderColor: 'white'}} onClick={() => {this.setState({...this.state, showEnvChange: !this.state.showEnvChange})}}>Change Environment</Button> : <></>}
			{(!this.props.draggable.key.length < 1) ? <Button variant="secondary" style={{marginLeft: '15px', border: '1px solid', borderColor: 'white'}} onClick={() => {this.setState({...this.state, showEnvVar: !this.state.showEnvVar})}}>Environment Variables</Button> : <></>}
			{(!this.props.draggable.key.length < 1) ? <Button variant="secondary" style={{marginLeft: '15px', border: '1px solid', borderColor: 'white'}} onClick={() => {this.setState({...this.state, showPlaceTok: !this.state.showPlaceTok})}}>Place Tokens</Button> : <></>}
			{(!this.props.draggable.key.length < 1) ? <Button variant="secondary" style={{marginLeft: '15px', border: '1px solid', borderColor: 'white'}} onClick={() => {this.setState({...this.state, showChat: !this.state.showChat})}}>Chat</Button> : <></>}
			{(this.props.draggable.environment.items) ? <Button variant="secondary" style={{marginLeft: '15px', border: '1px solid', borderColor: 'white'}} onClick={() => {this.props.editTokens(!this.props.editEnv.tokens); this.setState({...this.state, showEdit: !this.state.showEdit})}}>Edit Tokens</Button> : <></>}
			
		</div>
			{(this.state.showEnvChange || this.state.showEnvVar || this.state.showPlaceTok || this.state.showChat || this.props.draggable.key.length < 1) ?
			<div style={{width: '23vw', position: 'absolute', right: '10px', top: '155px', zIndex: '20000', maxHeight: '80%', overflowY: 'auto', minHeight: '80%', opacity: '.9'}}>
				{(this.state.showChat) ? <Chat /> : <></>}
				{(this.state.showEnvChange || this.props.draggable.key.length < 1) ? this.envChange() : <></>}
				{(this.state.showEnvVar) ? this.envVariables() : <></>}
				{(this.state.showPlaceTok) ? this.placeToken() : <></>}
			</div>
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
		box: state.box
	}
}

export default connect(mapStateToProps, 
	{handleGrabDraggable, handleUpdateCurrent, handleNewEnvironment, handleGrabOptions, 
	handleChangeGrid, handleChangeScale, handleDeleteEnvironment, handleShareEnvironment,
	editTokens, handleChangeBackground}
	)(CustomPanel);