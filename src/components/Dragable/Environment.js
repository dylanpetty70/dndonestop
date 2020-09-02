import React, { Component } from 'react';
import Container from './Container';
import DragLayer from './CustomDragLayer';
import { connect } from 'react-redux';
import {handleGrabDraggable, handleUpdateCurrent, handleNewEnvironment, changeCurrentEnv,handleGrabOptions} from '../../actions/draggable';
import CustomPanel from './CustomPanel';
import GridLayer from './GridLayer';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';




class Environment extends Component {

	constructor(props){
		super(props);
		this.state = {tempItem: '',
						tempNewEnv: '',
						current: this.props.envOptions.current}
		this.createEnvModal = this.createEnvModal.bind(this);
		this.changeEnv = this.changeEnv.bind(this);
		this.changeState = this.changeState.bind(this);
	}

	componentDidMount(){
		this.setState({...this.state, current: this.props.envOptions.current})
    }



	createEnvModal(){
		return(<Card style={{marginTop: '5px', marginBottom: '5px', marginLeft: '2px', marginRight: '2px'}}>
			<Card.Header>
				Create Environment 
			</Card.Header>
			<Card.Body>
				<Form>
					<Form.Group>
						<Form.Control placeholder='Name' style={{width: '250px'}} onChange={(text) => {this.setState({...this.state, tempNewEnv: text.target.value})}} />
					</Form.Group>
					<Button variant="outline-primary" style={{ float: 'right', marginTop: '10px'}} onClick={() => {this.changeEnv()}}>Create new Environment</Button>
				</Form>
			</Card.Body>
		</Card>)
	}

	changeEnv(){
		if(this.state.tempEnv!== '' & this.state.tempEnv !== 'Select One'){
			this.props.handleNewEnvironment(this.state.tempNewEnv, this.props.user.username)
			setTimeout(() => {
				this.props.changeCurrentEnv(this.state.tempNewEnv, this.props.user.username);
				this.setState({...this.state, current: this.state.tempNewEnv})
			}, 600)
		}
	}

	changeState(){
		setTimeout(() => {
			if(this.props.envOptions.all.length !== 0){
				this.setState({...this.state, current: this.props.envOptions.all[0]})
				this.props.changeCurrentEnv(this.props.envOptions.all[0], this.props.user.username)
			} else {
				this.setState({...this.state, current: ''})
			}
		}, 600)
	}

	render(){
		return(
			<div style={{width: '95vw', margin: '5px'}}>
			{(this.state.current.length > 0) ? 
			<div>
            <div style={{position: 'flex', marginTop: '100px'}}>
			<Button variant="secondary" style={{position: 'absolute', top: '10px', width: '100px', left: '850px'}} onClick={() => {this.props.handleGrabDraggable(this.props.envOptions.current, this.props.user.username); handleGrabOptions(this.props.user.username)}}>Refresh</Button>
				<GridLayer />
				<Container snapToGridAfterDrop={true} />
				<DragLayer snapToGridWhileDragging={true}/>
            </div>
				<CustomPanel changeState={this.changeState}/>
			</div>
			: <div style={{width: '300px', margin: '20px', height: '100px'}}>{this.createEnvModal()}</div>
			}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
        draggable: state.draggable,
		envOptions: state.envOptions,
		user: state.user
	}
}

export default connect(mapStateToProps, {handleGrabDraggable, handleUpdateCurrent, handleNewEnvironment, changeCurrentEnv,handleGrabOptions})(Environment);