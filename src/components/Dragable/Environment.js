import React, { Component } from 'react';
import Container from './Container';
import DragLayer from './CustomDragLayer';
import { connect } from 'react-redux';
import {handleGrabDraggable, handleAddNewItem, handleUpdateCurrent, handleNewEnvironment, changeCurrentEnv} from '../../actions/draggable';
import CustomPanel from './CustomPanel';
import GridLayer from './GridLayer';
import Button from 'react-bootstrap/Button';




class Environment extends Component {

	constructor(props){
		super(props);
		this.state = {tempItem: ''}
	}

	componentDidMount(){
    }

	render(){
		return(
			<div style={{width: '95vw', margin: '5px'}}>
            <div style={{height: '75vw', width: '75vw', position: 'flex'}}>
			<Button variant="secondary" style={{position: 'absolute', top: '10px', width: '100px', left: '850px'}} onClick={() => {this.props.handleGrabDraggable(this.props.envOptions.current)}}>Refresh</Button>
				<GridLayer />
				<Container snapToGridAfterDrop={true} />
				<DragLayer snapToGridWhileDragging={true}/>
            </div>
				<CustomPanel />
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

export default connect(mapStateToProps, {handleAddNewItem, handleGrabDraggable, handleUpdateCurrent, handleNewEnvironment, changeCurrentEnv})(Environment);