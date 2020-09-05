import React, { Component } from 'react';
import { connect } from 'react-redux';
import {handleChangeGrid, handleGrabDraggable, handleUpdateCurrent, handleNewEnvironment, handleChangeScale,changeCurrentEnv,handleDeleteEnvironment, handleShareEnvironment} from '../../actions/draggable';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { Typeahead } from 'react-bootstrap-typeahead';
import {editTokens} from '../../actions/editEnv';

class CustomPanel extends Component {

	constructor(props){
		super(props);
		this.state = {tempItem: '',
						tempScale: '',
						scaleError: false,
						tempToken: {creature: '', scene: '', background: '', players: ''},
						tempTokenScale: {creature: 1, scene: 1, background: 1, players: 1},
						tempEnv: this.props.envOptions.current,
						tempNewEnv: '',
						showEnvVar: false,
						showPlaceTok: false,
						showEnvChange: false,
						showDelete: false,
						tempShare: ''
						}
		this.addToken = this.addToken.bind(this)
		this.objectItems = this.objectItems.bind(this);
		this.envOptions = this.envOptions.bind(this);
		this.changeEnv = this.changeEnv.bind(this);
		this.envVariables = this.envVariables.bind(this);
		this.placeToken = this.placeToken.bind(this);
		this.envChange = this.envChange.bind(this);
		this.deleteEnv = this.deleteEnv.bind(this);
	}

	componentDidMount(){
		this.props.handleChangeGrid({color: 'black'})
    }

	addToken(tag){
		if(this.state.tempToken[tag] !== '' & this.state.tempToken[tag] !== 'Select One' & this.state.tempToken[tag] !== undefined){
			let current = this.props.draggable.current;
			current.push({item: this.state.tempToken[tag], pLeft: 80, pTop: 20, scale: this.state.tempTokenScale[tag], rotation: 0});
			this.props.handleUpdateCurrent(this.props.envOptions.current, current, this.props.user.username); 
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
		if(this.props.envOptions){
			if(this.props.envOptions.all){
				for(let i = 0; i < this.props.envOptions.all.length; i++){
					temp.push(<option key={i} value={this.props.envOptions.all[i]}>{this.props.envOptions.all[i]}</option>)
				}
			}
		}
		return temp;
	}

	changeEnv(){
		if(this.state.tempEnv!== '' & this.state.tempEnv !== 'Select One'){
			this.props.handleGrabDraggable(this.state.tempEnv, this.props.user.username);
			this.props.changeCurrentEnv(this.state.tempEnv, this.props.user.username);
		}
	}

	changeGrid(text){
		this.props.handleChangeGrid({color: text});
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
						<Form.Control placeholder={this.props.draggable.scale} style={{width: '70px'}} onChange={(text) => {(text.target.value !== '0' & text.target.value !== '' & (!isNaN(Number(text.target.value)))) ? this.setState({...this.state, tempScale: text.target.value}) : this.setState({...this.state, tempScale: this.props.draggable.scale})}} />
					</Form.Group>
					<Button variant="outline-primary" style={{marginLeft: '30px'}} onClick={() => {(this.state.tempScale !== '' & !isNaN(Number(this.state.tempScale))) ? this.props.handleChangeScale(this.state.tempScale, this.props.envOptions.current, this.props.user.username) : this.setState({...this.state, scaleError: true})}}>Change Scale</Button>
				</Form>
				<Form>
				<Card.Title  style={{fontSize: '16px', marginTop: '30px'}}>Grid Color</Card.Title>
					<Form.Group>
					<Typeahead
							id="gridColor"
							labelKey="gridColor"
							onChange={(text) => {this.changeGrid(text[0])}}
							options={['black', 'white', 'none']}
							placeholder={this.props.envOptions.options.color}
						/>
					</Form.Group>
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
					/>
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
					/>
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
					/>
				</Form.Group>
				<Form.Label style={{float: 'left', paddingRight: '5px'}}>Scale</Form.Label>
				<Form.Group>
				<Form.Control placeholder={this.state.tempTokenScale.scene} style={{float: 'left', width: '50px'}} custom onChange={(text) => {(text.target.value !== '0' & text.target.value !== '' & (!isNaN(Number(text.target.value)))) ? this.setState({...this.state, tempTokenScale: {...this.state.tempTokenScale, scene: text.target.value}}) : this.setState({...this.state, tempTokenScale: {...this.state.tempTokenScale, scene: '1'}})}}/>
				</Form.Group>
				<Button variant="outline-primary" style={{float: 'right', width: '100px'}} onClick={() => {this.addToken('scene')}}>Add Item</Button>
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
				{(this.props.envOptions.current.length > 0) ?
				<>
				<Card.Title style={{fontSize: '16px', marginTop: '75px'}}>Share Environment</Card.Title>
				<Form style={{margin: '5px'}}>
				<Form.Group  style={{float: 'left', width: '250px'}}>
					<Typeahead
						id="searchshare"
						labelKey="share"
						onChange={(text) => {this.setState({...this.state, tempShare: text[0]})}}
						options={this.props.userNames}
						placeholder={"Share with..."}
					/>
				</Form.Group>
                <Button variant="outline-primary" style={{ float: 'right', marginTop: '10px'}} onClick={() => {this.props.handleShareEnvironment(this.props.envOptions.current, this.props.user.username, this.state.tempShare)}}>
                    Share Environment 
                </Button>
			</Form>
			<br/>
			</>
			:
			<></>}
				<Card.Title style={{fontSize: '16px', marginTop: '75px'}}>New Environment</Card.Title>
				<Form style={{margin: '5px'}}>
					<Form.Group>
						<Form.Control placeholder='Name' style={{width: '250px'}} onChange={(text) => {this.setState({...this.state, tempNewEnv: text.target.value})}} />
					</Form.Group>
					<Button variant="outline-primary" style={{ float: 'right'}} onClick={() => {this.props.handleNewEnvironment(this.state.tempNewEnv, this.props.user.username, this.props.user.username); this.setState({...this.state, tempEnv: this.state.tempNewEnv});}}>Create new Environment</Button>
				</Form>
				<Button variant="danger" style={{float: 'right', marginTop: '25px', marginRight: '10px'}} onClick={() => {this.props.editTokens(false); this.setState({...this.state, showDelete: !this.state.showDelete, showEnvChange: false, showEnvVar: false, showPlaceTok: false})}}>Delete Current Environment</Button>
			</Card.Body>
		</Card>)
	}

	deleteEnv(){
		if(this.props.envOptions.current){
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
						<Form.Label>Are you sure you want to delete {this.props.envOptions.current}?</Form.Label>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="danger" onClick={() => {this.setState({showDelete: false}); this.props.handleDeleteEnvironment(this.props.envOptions.current, this.props.user.username); this.props.changeState();}}>
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

	render(){
		return(
		<div>
		{this.deleteEnv()}
		<div className="p-3 bg-secondary text-white" style={{position: 'absolute', left: '0', top: '55px', minWidth: '100%', margin: '0'}}>
			<h2 style={{paddingLeft: '25px', paddingRight: '25px', float: 'left'}}>{this.props.envOptions.current}</h2>
			<Button variant="secondary" style={{marginLeft: '15px', border: '1px solid', borderColor: 'white'}} onClick={() => {this.setState({...this.state, showEnvChange: !this.state.showEnvChange})}}>Change Environment</Button>
			<Button variant="secondary" style={{marginLeft: '15px', border: '1px solid', borderColor: 'white'}} onClick={() => {this.setState({...this.state, showEnvVar: !this.state.showEnvVar})}}>Environment Variables</Button>
			<Button variant="secondary" style={{marginLeft: '15px', border: '1px solid', borderColor: 'white'}} onClick={() => {this.props.editTokens(!this.props.editEnv.tokens); this.setState({...this.state, showPlaceTok: !this.state.showPlaceTok})}}>Place Tokens</Button>
			
		</div>
			{(this.state.showEnvChange || this.state.showEnvVar || this.state.showPlaceTok) ?
			<div style={{width: '22vw', position: 'absolute', right: '10px', top: '155px', zIndex: '20000', maxHeight: '80%', overflowY: 'auto', minHeight: '80%'}}>
				{(this.state.showEnvChange) ? this.envChange() : <></>}
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
		user: state.user,
		userNames: state.userNames,
		editEnv: state.editEnv,
		draggableItems: state.draggableItems
	}
}

export default connect(mapStateToProps, 
	{handleGrabDraggable, 
	handleUpdateCurrent, 
	handleNewEnvironment, 
	handleChangeScale,
	changeCurrentEnv,
	handleDeleteEnvironment,
	handleShareEnvironment,
	editTokens,
	handleChangeGrid}
	)(CustomPanel);