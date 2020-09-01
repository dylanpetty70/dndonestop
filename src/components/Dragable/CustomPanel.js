import React, { Component } from 'react';
import { connect } from 'react-redux';
import {handleGrabDraggable, handleUpdateCurrent, handleNewEnvironment, handleChangeScale,changeCurrentEnv} from '../../actions/draggable';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Typeahead } from 'react-bootstrap-typeahead';

class CustomPanel extends Component {

	constructor(props){
		super(props);
		this.state = {tempItem: '',
						tempScale: '',
						scaleError: false,
						tempToken: {creature: '', scene: '', background: ''},
						tempTokenScale: {creature: 1, scene: 1, background: 1},
						tempEnv: this.props.envOptions.current,
						tempNewEnv: ''
						}
		this.addToken = this.addToken.bind(this)
		this.objectItems = this.objectItems.bind(this);
		this.envOptions = this.envOptions.bind(this);
		this.changeEnv = this.changeEnv.bind(this);
	}

	componentDidMount(){
		
    }

	addToken(tag){
		if(this.state.tempToken[tag] !== '' & this.state.tempToken[tag] !== 'Select One' & this.state.tempToken[tag] !== undefined){
			let current = this.props.draggable.current;
			current.push({item: this.state.tempToken[tag], pLeft: 80, pTop: 20, scale: this.state.tempTokenScale[tag]});
			this.props.handleUpdateCurrent(this.props.envOptions.current, current); 
		}
	}

	objectItems(tag){
		let temp = [];
		if(this.props.draggable.items){
			for(let i = 0; i < Object.keys(this.props.draggable.items).length; i++){
				if(this.props.draggable.items[Object.keys(this.props.draggable.items)[i]].tag.indexOf(tag) > -1){
					temp.push(Object.keys(this.props.draggable.items)[i])
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
			this.props.handleGrabDraggable(this.state.tempEnv);
			this.props.changeCurrentEnv(this.state.tempEnv);
		}
	}

	render(){
		return(
			<div style={{width: '22vw', border: '1px solid', backgroundColor: 'lightGrey', position: 'absolute', right: '5px', top: '128px', height: '75vw'}}>
				<Card style={{marginTop: '5px', marginBottom: '5px', marginLeft: '2px', marginRight: '2px'}}>
					<Card.Header>
						Grid Scale
					</Card.Header>
					<Card.Body>
						<Form inline='true' style={{marginLeft: '10px'}}>
							<Form.Group>
								<Form.Control placeholder={this.props.draggable.scale} style={{width: '50px'}} onChange={(text) => {(text.target.value !== '0' & text.target.value !== '' & (!isNaN(Number(text.target.value)))) ? this.setState({...this.state, tempScale: text.target.value}) : this.setState({...this.state, tempScale: this.props.draggable.scale})}} />
							</Form.Group>
							<Button variant="outline-primary" style={{marginLeft: '30px'}} onClick={() => {(this.state.tempScale !== '' & !isNaN(Number(this.state.tempScale))) ? this.props.handleChangeScale(this.state.tempScale, this.props.envOptions.current) : this.setState({...this.state, scaleError: true})}}>Change Scale</Button>
						</Form>
					</Card.Body>
				</Card>

				<Card style={{marginTop: '5px', marginBottom: '5px', marginLeft: '2px', marginRight: '2px'}}>
					<Card.Header>Place Token</Card.Header>
					<Card.Body>
					<Card.Title style={{fontSize: '16px'}}>Creatures/Humanoids</Card.Title>
						<Form inline='true'>
						<Container>
							<Row>
							<Col>
						<Form.Label style={{float: 'left'}}>Name</Form.Label>
							</Col>
							<Col>
						<Form.Label style={{float: 'left',  marginLeft: '75px'}}>Scale</Form.Label>
							</Col>
							</Row>
							<Row>
							<Col>
						<Form.Group>
						<Typeahead
							  id="creatureTokens"
							  labelKey="creature"
							  onChange={(text) => {this.setState({...this.state, tempToken: {...this.state.tempToken, creature: text[0]}})}}
							  options={this.objectItems('creature')}
							  placeholder="Choose a creature token..."
							/>
						</Form.Group>
							</Col>
							<Col style={{marginLeft: '150px'}}>
						<Form.Group>
						<Form.Control placeholder={this.state.tempTokenScale.creature} style={{width: '50px'}} custom onChange={(text) => {(text.target.value !== '0' & text.target.value !== '' & (!isNaN(Number(text.target.value)))) ? this.setState({...this.state, tempTokenScale: {...this.state.tempTokenScale, creature: text.target.value}}) : this.setState({...this.state, tempTokenScale: {...this.state.tempTokenScale, creature: '1'}})}}/>
						</Form.Group>
							</Col>
							</Row>
						</Container>
						</Form>
						<Button variant="outline-primary" style={{float: 'right', width: '100px'}} onClick={() => {this.addToken('creature')}}>Add Item</Button>

						<br/>
						<Card.Title style={{fontSize: '16px', marginTop: '30px'}}>Backgrounds</Card.Title>
						<Form inline='true'>
						<Container>
							<Row>
							<Col>
						<Form.Label style={{float: 'left'}}>Name</Form.Label>
							</Col>
							<Col>
						<Form.Label style={{float: 'left',  marginLeft: '75px'}}>Scale</Form.Label>
							</Col>
							</Row>
							<Row>
							<Col>
						<Form.Group>
						<Typeahead
							  id="backgroundTokens"
							  labelKey="background"
							  onChange={(text) => {this.setState({...this.state, tempToken: {...this.state.tempToken, background: text[0]}})}}
							  options={this.objectItems('background')}
							  placeholder="Choose a background token..."
							/>
						</Form.Group>
							</Col>
							<Col style={{marginLeft: '150px'}}>
						<Form.Group>
						<Form.Control placeholder={this.state.tempTokenScale.background} style={{width: '50px'}} custom onChange={(text) => {(text.target.value !== '0' & text.target.value !== '' & (!isNaN(Number(text.target.value)))) ? this.setState({...this.state, tempTokenScale: {...this.state.tempTokenScale, background: text.target.value}}) : this.setState({...this.state, tempTokenScale: {...this.state.tempTokenScale, background: '1'}})}}/>
						</Form.Group>
							</Col>
							</Row>
						</Container>
						</Form>
						<Button variant="outline-primary" style={{float: 'right', width: '100px'}} onClick={() => {this.addToken('background')}}>Add Item</Button>

						<br/>
						<Card.Title style={{fontSize: '16px', marginTop: '30px'}}>Scene</Card.Title>
						<Form inline='true'>
						<Container>
							<Row>
							<Col>
						<Form.Label style={{float: 'left'}}>Name</Form.Label>
							</Col>
							<Col>
						<Form.Label style={{float: 'left',  marginLeft: '75px'}}>Scale</Form.Label>
							</Col>
							</Row>
							<Row>
							<Col>
						<Form.Group>
						<Typeahead
							  id="sceneTokens"
							  labelKey="scene"
							  onChange={(text) => {this.setState({...this.state, tempToken: {...this.state.tempToken, scene: text[0]}})}}
							  options={this.objectItems('scene')}
							  placeholder="Choose a scene token..."
							/>
						</Form.Group>
							</Col>
							<Col style={{marginLeft: '150px'}}>
						<Form.Group>
						<Form.Control placeholder={this.state.tempTokenScale.scene} style={{float: 'left', width: '50px'}} custom onChange={(text) => {(text.target.value !== '0' & text.target.value !== '' & (!isNaN(Number(text.target.value)))) ? this.setState({...this.state, tempTokenScale: {...this.state.tempTokenScale, scene: text.target.value}}) : this.setState({...this.state, tempTokenScale: {...this.state.tempTokenScale, scene: '1'}})}}/>
						</Form.Group>
							</Col>
							</Row>
						</Container>
						</Form>
						<Button variant="outline-primary" style={{float: 'right', width: '100px'}} onClick={() => {this.addToken('scene')}}>Add Item</Button>
					</Card.Body>
				</Card>

				<Card style={{marginTop: '5px', marginBottom: '5px', marginLeft: '2px', marginRight: '2px'}}>
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
							<br/>
							<Button variant="outline-primary" style={{float: 'right', marginTop: '20px'}} onClick={() => {this.changeEnv()}}>Change Environment</Button>
						</Form>
						<Card.Title style={{fontSize: '16px', marginTop: '75px'}}>New Environment</Card.Title>
						<Form style={{margin: '5px'}}>
							<Form.Group>
								<Form.Control placeholder='Name' style={{width: '250px'}} onChange={(text) => {this.setState({...this.state, tempNewEnv: text.target.value})}} />
							</Form.Group>
							<Button variant="outline-primary" style={{ float: 'right', marginTop: '10px'}} onClick={() => {this.props.handleNewEnvironment(this.state.tempNewEnv); this.setState({...this.state, tempEnv: this.state.tempNewEnv})}}>Create new Environment</Button>
						</Form>
					</Card.Body>
				</Card>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
        draggable: state.draggable,
		envOptions: state.envOptions
	}
}

export default connect(mapStateToProps, 
	{handleGrabDraggable, 
	handleUpdateCurrent, 
	handleNewEnvironment, 
	handleChangeScale,
	changeCurrentEnv}
	)(CustomPanel);