import React, { Component } from 'react';
import { connect } from 'react-redux';
import {handleGrabModuleEnv, handleChangeMapScale, handleSetCurrentModuleMap, handleGrabModuleEnvOptions, handleGrabMaps, handleUpdateMaps, handleNewMap, handleUpdateModuleOther, handleSetCurrentModuleEnv, handleUpdateModuleCurrent, handleNewModuleEnvironment, handleChangeModuleEnvScale, handleDeleteModuleEnvironment, handleDeleteModule, handleGrabModulePlayers} from '../../actions/modules';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { Typeahead } from 'react-bootstrap-typeahead';
import {editTokens} from '../../actions/editEnv';
import {handleChangeGrid} from '../../actions/draggable';
import {RiCloseLine} from 'react-icons/ri';
import ReactModal from 'react-modal-resizable-draggable';
import {AiFillCloseCircle} from 'react-icons/ai';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import {useMediaQuery} from 'react-responsive';
import Map from './Map';
import {MdDelete} from 'react-icons/md';

const ref = React.createRef();
const ref1 = React.createRef();
const ref2 = React.createRef();
const ref3 = React.createRef();

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
		this.playerPanel = this.playerPanel.bind(this);
		this.addPlayerToken = this.addPlayerToken.bind(this);
		this.movePlayerTokens = this.movePlayerTokens.bind(this);
		this.envMoveOptions = this.envMoveOptions.bind(this);
		this.addCoverToken = this.addCoverToken.bind(this);
		this.addLinkToken = this.addLinkToken.bind(this);
		this.maps = this.maps.bind(this);
		this.newMap = this.newMap.bind(this);
		this.addEnvtoMap = this.addEnvtoMap.bind(this);
		this.deleteEnvtoMap = this.deleteEnvtoMap.bind(this);
	}

	componentDidMount(){
		this.props.handleGrabMaps(this.props.module.key);
    }

	addToken(tag){
		if(this.state.tempToken[tag] !== '' & this.state.tempToken[tag] !== 'Select One' & this.state.tempToken[tag] !== undefined){
			let current = (this.props.module.environment.items) ? this.props.module.environment.items : [];
			current.push({item: this.state.tempToken[tag], pLeft: 80, pTop: 20, scale: this.state.tempTokenScale[tag], rotation: 0, player: false, link: '', cover: false});
			this.props.handleUpdateModuleCurrent(this.props.module.key, this.props.module.envKey, current); 
		}
	}

	addPlayerToken(tag){
		if(this.state.tempToken[tag] !== '' & this.state.tempToken[tag] !== 'Select One' & this.state.tempToken[tag] !== undefined){
			let current = (this.props.module.environment.items) ? this.props.module.environment.items : [];
			current.push({item: this.state.tempToken[tag], pLeft: 80, pTop: 20, scale: this.state.tempTokenScale[tag], rotation: 0, player: true, link: '', cover: false});
			this.props.handleUpdateModuleCurrent(this.props.module.key, this.props.module.envKey, current); 
		}
	}

	addLinkToken(){
		if(this.state.tempLinkEnv !== '' & this.state.tempLinkEnv !== 'Select One' & this.state.tempLinkEnv !== undefined){
			let current = (this.props.module.environment.items) ? this.props.module.environment.items : [];
			current.push({item: 'scroll', pLeft: 80, pTop: 20, scale: 2, rotation: 0, player: false, link: this.props.module.envOptions[this.state.tempLinkEnv], cover: false});
			this.props.handleUpdateModuleCurrent(this.props.module.key, this.props.module.envKey, current); 
		}
	}

	addCoverToken(){
		let current = (this.props.module.environment.items) ? this.props.module.environment.items : [];
		current.push({item: 'bakcground black', pLeft: 80, pTop: 20, scale: this.state.tempCoverScale, rotation: 0, player: false, link: '', cover: true});
		this.props.handleUpdateModuleCurrent(this.props.module.key, this.props.module.envKey, current); 
	}

	movePlayerTokens(){
		if(this.state.tempMoveEnv!== '' & this.state.tempMoveEnv !== 'Select One'){
			let tempCurrent = (this.props.module.environment.items) ? this.props.module.environment.items : [];
			let tempNew = [];
			let tempSame = [];
			for(let i = 0; i < tempCurrent.length; i++){
				if(tempCurrent[i].player){
					tempNew.push(tempCurrent[i]);
				} else {
					tempSame.push(tempCurrent[i]);
				}
			}
			this.props.handleUpdateModuleCurrent(this.props.module.key, this.props.module.envKey, tempSame);
			this.props.handleUpdateModuleOther(this.props.module.key, this.state.tempMoveEnv, tempNew);
		}
	}

	coverBack(){
		if(this.state.tempToken['scene'] !== '' & this.state.tempToken['scene'] !== 'Select One' & this.state.tempToken['scene'] !== undefined){
			let current = (this.props.module.environment.items) ? this.props.module.environment.items : [];
			let temp = [];
			for(let i = 0; i < current.length; i++){
				if(!current[i].back){
					temp.push(current[i]);
				}
			}
			let temp1 = [];

			let totalWidth = 780;
			let totalHeight = 780;

			for(let i = (Number(this.props.module.environment.scale) * this.state.tempTokenScale['scene']); i < totalWidth + (Number(this.props.module.environment.scale) * this.state.tempTokenScale['scene']); i += (Number(this.props.module.environment.scale) * this.state.tempTokenScale['scene'])){
				for(let j = (Number(this.props.module.environment.scale) * this.state.tempTokenScale['scene']); j < totalHeight + (Number(this.props.module.environment.scale) * this.state.tempTokenScale['scene']); j += (Number(this.props.module.environment.scale) * this.state.tempTokenScale['scene'])){
					temp1.push(
						{item: this.state.tempToken['scene'], 
						pLeft: i - (Number(this.props.module.environment.scale) * this.state.tempTokenScale['scene']), 
						pTop: j - (Number(this.props.module.environment.scale) * this.state.tempTokenScale['scene']) - 2, 
						scale: this.state.tempTokenScale['scene'], 
						rotation: 0,
						back: true, 
						player: false, 
						link: '', 
						cover: false
						}
					)
				}
			}
			let temp3 = [...temp1, ...temp]
			this.props.handleUpdateModuleCurrent(this.props.module.key, this.props.module.envKey, temp3); 
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
			for(let i = 0; i < Object.values(this.props.module.envOptions).length; i++){
				temp.push(<option key={i} value={Object.keys(this.props.module.envOptions)[i]}>{Object.values(this.props.module.envOptions)[i]}</option>)
			}
		return temp;
	}

	envMoveOptions(){
		let temp = [];
			for(let i = 0; i < Object.values(this.props.module.envOptions).length; i++){
				if(Object.keys(this.props.module.envOptions)[i] !== this.props.module.envKey){
					temp.push(<option key={i} value={Object.keys(this.props.module.envOptions)[i]}>{Object.values(this.props.module.envOptions)[i]}</option>)
				}
			}
		return temp;
	}

	changeEnv(){
		if(this.state.tempEnv!== '' & this.state.tempEnv !== 'Select One'){
			this.props.handleGrabModuleEnv(this.props.module.key, this.state.tempEnv);
		}
	}

	changePlayerEnv(){
		if(this.state.tempPlayerEnv!== '' & this.state.tempPlayerEnv !== 'Select One'){
			this.props.handleSetCurrentModuleEnv(this.props.module.key, this.state.tempPlayerEnv);
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
						<Form.Control placeholder={this.props.module.environment.scale} style={{width: '70px'}} onKeyPress={(event) => {if(event.charCode===13){event.preventDefault(); (this.state.tempScale !== '' & !isNaN(Number(this.state.tempScale))) ? this.props.handleChangeModuleEnvScale(this.props.module.key, this.props.module.envKey, this.state.tempScale) : this.setState({...this.state, scaleError: true})}}} onChange={(text) => {(text.target.value !== '0' & text.target.value !== '' & (!isNaN(Number(text.target.value)))) ? this.setState({...this.state, tempScale: text.target.value}) : this.setState({...this.state, tempScale: this.props.module.environment.scale})}} />
					</Form.Group>
					<Button variant="outline-primary" style={{marginLeft: '30px'}} onClick={() => {(this.state.tempScale !== '' & !isNaN(Number(this.state.tempScale))) ? this.props.handleChangeModuleEnvScale(this.props.module.key, this.props.module.envKey, this.state.tempScale) : this.setState({...this.state, scaleError: true})}}>Change Scale</Button>
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
			</Card.Body>
		</Card>)
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
					<Form.Control value={this.state.tempEnv} as="select" style={{float: 'left', width: '200px'}} onChange={(text) => {this.setState({...this.state, tempEnv: text.target.value})}}>
						<option value='Select One'>Select One</option>
						{this.envOptions()}
					</Form.Control>
					<Button variant="outline-primary" style={{ float: 'right', marginTop: '10px'}} onClick={() => {this.changeEnv()}}>Change Environment</Button>
				</Form>
				<br/>
				<Card.Title style={{fontSize: '16px', marginTop: '75px'}}>New Environment</Card.Title>
				<Form style={{margin: '5px'}}>
					<Form.Group>
						<Form.Control placeholder='Name' style={{width: '200px'}} onKeyPress={(event) => {if(event.charCode===13 & event.target.value !== ''){event.preventDefault(); this.props.handleNewModuleEnvironment(this.props.module.key, this.state.tempNewEnv); this.setState({...this.state, tempEnv: this.state.tempNewEnv});}}} onChange={(text) => {if(text.target.value !== ''){this.setState({...this.state, tempNewEnv: text.target.value})}}} />
					</Form.Group>
					<Button variant="outline-primary" style={{ float: 'right'}} onClick={() => {this.props.handleNewModuleEnvironment(this.props.module.key, this.state.tempNewEnv); this.setState({...this.state, tempEnv: this.state.tempNewEnv}); alert(this.state.tempNewEnv + ' Created!')}}>Create new Environment</Button>
				</Form>
			
			</Card.Body>
		</Card>)
	}

	newMap(){
		this.props.handleNewMap(this.props.module.key, this.state.tempNewMap);
	}

	addEnvtoMap(){
		let temp = this.props.module.maps[this.state.tempMap];
		if(!temp.environments){
			temp.environments = {};
		}
		temp.environments[this.state.tempMaptoEnv] = this.props.module.envOptions[this.state.tempMaptoEnv];
		this.props.handleUpdateMaps(this.props.module.key, this.state.tempMap, temp);
	}

	deleteEnvtoMap(env){
		let temp = this.props.module.maps[this.state.tempMap];
		delete temp.environments[env];
		this.props.handleUpdateMaps(this.props.module.key, this.state.tempMap, temp);
	}


	maps(){
		return(<Card style={{marginTop: '5px', marginBottom: '5px', marginLeft: '2px', marginRight: '2px'}}>
			<Card.Header>Map Organization</Card.Header>
			<Card.Body>
			<Card.Title style={{fontSize: '16px'}}>Module Maps</Card.Title>
			<Card.Subtitle className="mb-2 text-muted">Your players will see the current map visual, but adding the environments is simply for organization's sake.</Card.Subtitle>
				<Card.Title style={{fontSize: '16px'}}>Create Map</Card.Title>
				<Form style={{margin: '5px'}} inline>
					<Form.Group>
						<Form.Control placeholder='Name' style={{width: '200px'}} onKeyPress={(event) => {if(event.charCode===13 & event.target.value !== ''){event.preventDefault(); this.props.handleNewMap()}}} onChange={(text) => {if(text.target.value !== ''){this.setState({...this.state, tempNewMap: text.target.value})}}} />
					</Form.Group>
					<Button variant="outline-primary" style={{marginLeft: '10px'}} onClick={() => {this.newMap(); alert(this.state.tempNewMap + ' Created!')}}>Create New Map</Button>
				</Form>
				<br/>


				<Card.Title  style={{fontSize: '16px', marginTop: '10px'}}>Maps</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">Choose a map to see the environments it contains. Your players will also be able to see and edit this map.</Card.Subtitle>
				<Form style={{margin: '5px'}}>
					<Form.Control value={this.state.tempMap} as="select" style={{float: 'left', width: '200px'}} onChange={(text) => {this.setState({...this.state, tempMap: text.target.value}); this.props.handleSetCurrentModuleMap(this.props.module.key, text.target.value)}}>
						<option value='Select One'>Select One</option>
						{Object.keys(this.props.module.maps).map((l) =>{
							return(<option value={l} key={l}>{this.props.module.maps[l].name}</option>)
						})}
					</Form.Control>
				</Form>
				<br/>

				{(this.props.module.maps[this.state.tempMap]) ? <div style={{margin: '20px', width: '80%', border: '1px solid', borderColor: 'black'}}>
					 {(this.props.module.maps[this.state.tempMap].environments) ? Object.keys(this.props.module.maps[this.state.tempMap].environments).map((l) => {
						return (
						<div key={l}>
						<MdDelete style={{float: 'left'}} onClick={() => {this.deleteEnvtoMap(l)}} />
						<p style={{marginLeft: '10px', marginBottom: '5px'}}>{this.props.module.maps[this.state.tempMap].environments[l]}</p>
						</div>
						)
					}) : <></>}
				</div> : <></>}
				
				{(this.props.module.maps[this.state.tempMap]) ? 
				<div>
				<Card.Title  style={{fontSize: '16px', marginTop: '30px'}}>Add Environment to Map</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">Add an environment to the currently selected map</Card.Subtitle>
				<Form style={{margin: '5px'}}>
					<Form.Control value={this.state.tempMaptoEnv} as="select" style={{float: 'left', width: '200px'}} onChange={(text) => {this.setState({...this.state, tempMaptoEnv: text.target.value})}}>
						<option value='Select One'>Select One</option>
						{Object.keys(this.props.module.envOptions).map((l) =>{
							return(<option value={l} key={l}>{this.props.module.envOptions[l]}</option>)
						})}
					</Form.Control>
					<Button variant="outline-primary" style={{ float: 'right'}} onClick={() => {this.addEnvtoMap()}}>Add Environment</Button>
				</Form>
				<br/>
				</div>
				: <></>}
				{(this.props.module.maps[this.state.tempMap]) ? 
				<div>
				<Card.Title  style={{fontSize: '16px', marginTop: '30px'}}>Change Scale of Map</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">Max scale of 75</Card.Subtitle>
				<Form style={{margin: '5px'}} inline>
					<Form.Group>
						<Form.Control placeholder={this.props.module.maps[this.state.tempMap].scale} style={{width: '200px'}} onChange={(text) => {if(text.target.value !== '' && !isNaN(text.target.value) && text.target.value !== 0 && text.target.value < 76){this.setState({...this.state, tempMapScale: text.target.value})}}} />
					</Form.Group>
					<Button variant="outline-primary" style={{marginLeft: '10px'}} onClick={() => {this.props.handleChangeMapScale(this.props.module.key, this.state.tempMap, this.state.tempMapScale)}}>Change Scale</Button>
				</Form>
				<br/>
				</div>
				: <></>}

			</Card.Body>
		</Card>)
	}

	playerPanel(){
		return(<Card style={{marginTop: '5px', marginBottom: '5px', marginLeft: '2px', marginRight: '2px'}}>
			<Card.Header>Player Panel</Card.Header>
			<Card.Body>
			<Card.Title style={{fontSize: '16px'}}>Player Tokens</Card.Title>
			<Card.Subtitle className="mb-2 text-muted">These tokens are movable between environments</Card.Subtitle>
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
				<Button variant="outline-primary" style={{float: 'right', width: '100px'}} onClick={() => {this.addPlayerToken('players')}}>Add Item</Button>
				</Form>

				<br/>
				<Card.Title  style={{fontSize: '16px', marginTop: '30px'}}>Player Environment</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">This is the environment the players currently see</Card.Subtitle>
				<Form style={{margin: '5px'}}>
					<Form.Control value={this.state.tempPlayerEnv} as="select" style={{float: 'left', width: '200px'}} onChange={(text) => {this.setState({...this.state, tempPlayerEnv: text.target.value})}}>
						<option value='Select One'>Select One</option>
						{this.envOptions()}
					</Form.Control>
					<Button variant="outline-primary" style={{ float: 'right', marginTop: '10px'}} onClick={() => {this.changePlayerEnv()}}>Change Environment</Button>
				</Form>
				<br/>


				<Card.Title  style={{fontSize: '16px', marginTop: '70px'}}>Move Tokens</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">Transfer player tokens created in this panel to another environment</Card.Subtitle>
				<Form style={{margin: '5px'}}>
					<Form.Control value={this.state.tempMoveEnv} as="select" style={{float: 'left', width: '200px'}} onChange={(text) => {this.setState({...this.state, tempMoveEnv: text.target.value})}}>
						<option value='Select One'>Select One</option>
						{this.envMoveOptions()}
					</Form.Control>
					<Button variant="outline-primary" style={{ float: 'right', marginTop: '10px'}} onClick={() => {this.movePlayerTokens()}}>Move Tokens</Button>
				</Form>
				<br/>


				<Card.Title  style={{fontSize: '16px', marginTop: '70px'}}>Create Ref Token</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">Create a token to reference where an exit/entrance goes that your players cannot see</Card.Subtitle>
				<Form style={{margin: '5px'}}>
					<Form.Control value={this.state.tempLinkEnv} as="select" style={{float: 'left', width: '200px'}} onChange={(text) => {this.setState({...this.state, tempLinkEnv: text.target.value})}}>
						<option value='Select One'>Select One</option>
						{this.envMoveOptions()}
					</Form.Control>
					<Button variant="outline-primary" style={{ float: 'right', marginTop: '10px'}} onClick={() => {this.addLinkToken()}}>Create Ref</Button>
				</Form>
				<br/>


				<Card.Title  style={{fontSize: '16px', marginTop: '70px'}}>Create Cover Token</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">This token will cover areas for players while being transparent for you</Card.Subtitle>
				<Form style={{margin: '5px'}}>
				<Form.Label style={{float: 'left', paddingRight: '5px'}}>Scale</Form.Label>
				<Form.Group>
				<Form.Control placeholder={this.state.tempCoverScale} style={{float: 'left', width: '50px'}} custom onChange={(text) => {(text.target.value !== '0' & text.target.value !== '' & (!isNaN(Number(text.target.value)))) ? this.setState({...this.state, tempCoverScale: text.target.value}) : this.setState({...this.state, tempCoverScale: 1})}}/>
				</Form.Group>
					<Button variant="outline-primary" style={{ float: 'right', marginTop: '10px'}} onClick={() => {this.addCoverToken()}}>Create Cover</Button>
				</Form>
				<br/>


			</Card.Body>
		</Card>)
	}

	deleteEnv(){
		if(this.props.module.envKey.length > 0){
			return(
				  <Modal
					show={this.state.showDelete}
					onHide={() => {this.setState({showDelete: false})}}
					backdrop="static"
					keyboard={false}
					style={{top: String(window.innerHeight/4) + 'px'}}
					>
					<Modal.Header>
						<Modal.Title>Delete Enivronment</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Label>Are you sure you want to delete {this.props.module.environment.name}?</Form.Label>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="danger" onClick={() => {this.setState({showDelete: false}); this.props.handleDeleteModuleEnvironment(this.props.module.key, this.props.module.envKey); setTimeout(() => {this.props.handleGrabModuleEnvOptions(this.props.module.key)}, 1000); alert('Deleted!')}}>
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
		let temp = this.props.module.environment.items;
		if(!temp[id].conditions){
			temp[id].conditions = {};
		}
		return temp;
	}
	
	editPopup(){

		if(this.props.module.environment.items[this.props.box.id]){
		return(<div style={{marginTop: '25px', paddingBottom: '25px', height: '100%', opacity: '.9'}}>
			<Card style={{padding: '20px', height: '100%', overflowY: 'scroll'}}>
				<Card.Title style={{textAlign: 'center'}}>Select Token to Edit Tooltip</Card.Title>
				<Card.Subtitle style={{paddingBottom: '10px'}}>The tooltips are only visible to players if they are on a token created by the "players" panel</Card.Subtitle>
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
					  <Button variant="outline-secondary" onClick={() => {let temp = this.checkConditions(this.props.box.id); temp[this.props.box.id].conditions[`Player Name`] = this.state.tempName; this.props.handleUpdateModuleCurrent(this.props.module.key, this.props.module.envKey, temp)}}>Save Player Name</Button>
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
					  <Button variant="outline-secondary" onClick={() => {let temp = this.checkConditions(this.props.box.id); temp[this.props.box.id].conditions[`HP`] = this.state.tempHP; this.props.handleUpdateModuleCurrent(this.props.module.key, this.props.module.envKey, temp)}}>Save HP</Button>
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
					  <Button variant="outline-secondary" onClick={() => {let temp = this.checkConditions(this.props.box.id); temp[this.props.box.id].conditions[`Armor Class`] = this.state.tempAC; this.props.handleUpdateModuleCurrent(this.props.module.key, this.props.module.envKey, temp)}}>Save Armor Class</Button>
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
					  <Button variant="outline-secondary" onClick={() => {let temp = this.checkConditions(this.props.box.id); temp[this.props.box.id].conditions[`Conditions`] = this.state.tempConditions; this.props.handleUpdateModuleCurrent(this.props.module.key, this.props.module.envKey, temp)}}>Save Conditions</Button>
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
					  <Button variant="outline-secondary" onClick={() => {let temp = this.checkConditions(this.props.box.id); temp[this.props.box.id].conditions[`Notes`] = this.state.tempOther; this.props.handleUpdateModuleCurrent(this.props.module.key, this.props.module.envKey, temp)}}>Save Notes</Button>
					</InputGroup.Append>
				  </InputGroup>
			</Card>
		</div>)
		} else {
			return (
				<div style={{marginTop: '25px', width: '100%', height: '100%', paddingBottom: '25px'}}>
					<Card style={{height: '100%',padding: '20px'}}>
						<Card.Title style={{textAlign: 'center'}}>Select Token to Edit Tooltip</Card.Title>
					</Card>
				</div>
			)
		}
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

		{this.deleteEnv()}
		<div className="p-3 bg-secondary text-white" style={{position: 'absolute', left: '0', top: '75px', width: '1895px', margin: '0'}}>
			<h2 style={{paddingLeft: '25px', paddingRight: '25px', float: 'left'}}>{this.props.module.environment.name}</h2>
			<ShowAll>
				{(!this.props.module.envKey.length < 1) ? <Button variant="secondary" style={{marginLeft: '15px', border: '1px solid', borderColor: 'white'}} onClick={() => {this.setState({...this.state, showEnvChange: !this.state.showEnvChange})}}>Change Environment</Button> : <></>}
				{(!this.props.module.envKey.length < 1) ? <Button variant="secondary" style={{marginLeft: '15px', border: '1px solid', borderColor: 'white'}} onClick={() => {this.setState({...this.state, showEnvVar: !this.state.showEnvVar})}}>Environment Variables</Button> : <></>}
				{(!this.props.module.envKey.length < 1) ? <Button variant="secondary" style={{marginLeft: '15px', border: '1px solid', borderColor: 'white'}} onClick={() => {this.setState({...this.state, showPlaceTok: !this.state.showPlaceTok})}}>Place Tokens</Button> : <></>}
				{(this.props.module.environment.items) ? <Button variant="secondary" style={{marginLeft: '15px', border: '1px solid', borderColor: 'white'}} onClick={() => {this.props.editTokens(!this.props.editEnv.tokens); this.setState({...this.state, showEdit: !this.state.showEdit})}}>Edit Tokens</Button> : <></>}
				{(!this.props.module.envKey.length < 1) ? <Button variant="secondary" style={{marginLeft: '15px', border: '1px solid', borderColor: 'white'}} onClick={() => {this.setState({...this.state, showPlayers: !this.state.showPlayers})}}>Players</Button> : <></>}
				{(!this.props.module.envKey.length < 1) ? <Button variant="secondary" style={{marginLeft: '15px', border: '1px solid', borderColor: 'white'}} onClick={() => {this.setState({...this.state, showMaps: !this.state.showMaps})}}>Maps</Button> : <></>}
				{(!this.props.module.envKey.length < 1) ? <p style={{color: 'white', float: 'right'}}>{'Share to players using this link: http://www.dndonestop.com/viewmodules/' + this.props.module.key} </p>: <></>}
			</ShowAll>
		</div>
			{(this.state.showEnvChange || this.state.showEnvVar || this.state.showPlaceTok || this.state.showPlayers || this.state.showMaps || this.props.module.envKey.length < 1) ?
			<>
				<ShowAll>
			{(this.state.showPlayers || this.state.showMaps) ? <div style={{width: '450px', position: 'absolute', right: '10px', top: '155px', zIndex: '20000', maxHeight: '80%', overflowY: 'auto', minHeight: '80%', opacity: '.9'}}>
				{(this.state.showPlayers) ? this.playerPanel() : <></>}
				{(this.state.showMaps) ? this.maps() : <></>}
			</div> : <></>}
			</ShowAll>
			<ShowAll>
			{(this.state.showEnvChange || this.state.showEnvVar || this.state.showPlaceTok || this.props.module.envKey.length < 1) ? <div style={{width: '450px', position: 'absolute', right: '475px', top: '155px', zIndex: '20000', maxHeight: '80%', overflowY: 'auto', minHeight: '80%', opacity: '.9'}}>
				{(this.state.showEnvChange || this.props.module.envKey.length < 1) ? this.envChange() : <></>}
				{(this.state.showEnvVar) ? this.envVariables() : <></>}
				{(this.state.showPlaceTok) ? this.placeToken() : <></>}
			</div> : <></>}
			</ShowAll>
			</>
			:
			<></>
			}
			{(this.state.showMaps) ? <Map /> : <></>}
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
		module: state.module
	}
}

export default connect(mapStateToProps, 
	{handleGrabMaps, handleUpdateMaps, editTokens, handleChangeGrid, handleNewMap, handleSetCurrentModuleMap, handleChangeMapScale,
	handleGrabModuleEnv, handleGrabModuleEnvOptions, handleUpdateModuleOther, handleSetCurrentModuleEnv, handleUpdateModuleCurrent, handleNewModuleEnvironment, handleChangeModuleEnvScale, handleDeleteModuleEnvironment, handleDeleteModule, handleGrabModulePlayers}
	)(CustomPanel);