import React, { Component } from 'react';
import Container from './Container';
import DragLayer from './CustomDragLayer';
import { connect } from 'react-redux';
import {handleGrabDraggable, handleUpdateCurrent, handleNewEnvironment, handleGrabOptions, handleGrabDraggableItems, restartItems} from '../../actions/draggable';
import CustomPanel from './CustomPanel';
import GridLayer from './GridLayer';




class Environment extends Component {

	constructor(props){
		super(props);
		this.state = {tempItem: '',
						tempNewEnv: '',
						current: this.props.draggable.environment.name,
						uid: ''}
		this.changeState = this.changeState.bind(this);
	}

	componentDidMount(){
		this.setState({...this.state, current: this.props.draggable.environment.name})
		if(Object.keys(this.props.draggableItems).length < 1){
			this.props.handleGrabDraggableItems();
		}

    }



	changeState(){
		setTimeout(() => {
			this.props.handleGrabOptions();
		}, 500)
		setTimeout(() => {
			if(this.props.draggable.options.length !== 0){
				this.setState({...this.state, current: this.props.draggable.options[0]})
				this.props.handleGrabDraggable(this.props.draggable.options[0])
			} else {
				this.setState({...this.state, current: ''})
			}
		}, 1500)
	}

	render(){
		return(
			<div style={{width: '95vw', margin: '5px'}}>
            <div style={{position: 'flex', marginTop: '100px'}}>
			<GridLayer />
				<Container snapToGridAfterDrop={true} />
				<DragLayer snapToGridWhileDragging={true}/>
            </div>
				<CustomPanel changeState={this.changeState}/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
        draggable: state.draggable,
		envOptions: state.envOptions,
		draggableItems: state.draggableItems
	}
}

export default connect(mapStateToProps, {handleGrabDraggable, handleUpdateCurrent, handleNewEnvironment, handleGrabOptions, handleGrabDraggableItems, restartItems})(Environment);