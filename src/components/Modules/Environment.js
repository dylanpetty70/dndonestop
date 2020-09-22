import React, { Component } from 'react';
import Container from './Container';
import DragLayer from './CustomDragLayer';
import { connect } from 'react-redux';
import {handleGrabModuleEnv, handleUpdateModuleCurrent, handleGrabModuleOptions,handleGrabModuleEnvOptions, handleNewModule, handleSetModule, handleDeleteModule} from '../../actions/modules';
import { handleGrabDraggableItems } from '../../actions/draggable';
import CustomPanel from './CustomPanel';
import GridLayer from './GridLayer';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Typeahead } from 'react-bootstrap-typeahead';
import {RiCloseLine} from 'react-icons/ri';

const ref = React.createRef();
const ref1 = React.createRef();

class Environment extends Component {

	constructor(props){
		super(props);
		this.state = {showModule: true,
						tempNewModule: '',
						tempDelete: '',
						}
		this.chooseModule = this.chooseModule.bind(this);
		this.chosenModule = this.chosenModule.bind(this);
	}

	componentDidMount(){

    }

	chosenModule(module){
		let temp = '';
		for(var key in this.props.module.moduleOptions){
			if(this.props.module.moduleOptions[key] === module){
				temp = key;
			}
		}
		this.props.handleGrabModuleEnvOptions(temp);
		this.props.handleSetModule(temp);
		this.setState({...this.state, showModule: false})
	}

	chooseModule(){
         return(
              <Modal
                show={this.state.showModule}
                onHide={() => {this.setState({showModule: false})}}
                backdrop="static"
                keyboard={false}
				style={{top: String(window.innerHeight/4) + 'px'}}
                >
                <Modal.Header>
                    <Modal.Title>Choose Module</Modal.Title>
                </Modal.Header>
                <Modal.Body>
					{(Object.values(this.props.module.moduleOptions).length > 0) ? <><Form>
					<h6  style={{fontSize: '16px', marginTop: '10px', alignText: 'center'}}>
					Modules are your opportunity to create a collection of interconnected playable grids while customizing how your players can interact with them and what they see at any given moment.
					</h6>
					<hr/>
					<h4  style={{fontSize: '16px', marginTop: '20px'}}>Select Module</h4>
						<Form.Group>
						<Typeahead
								id="gridColor"
								labelKey="gridColor"
								onChange={(text) => {this.chosenModule(text[0])}}
								options={Object.values(this.props.module.moduleOptions)}
								ref={ref}
							> 
							<RiCloseLine color='black' size={22} style={{position: 'absolute', right: '3px', top: '10px'}} onClick={() => {ref.current.clear()}}/>
							</Typeahead>
						</Form.Group>
					</Form>
					
					<h4  style={{fontSize: '16px', marginTop: '20px'}}>Delete Module</h4>
					<Form inline='true'>
						<Form.Group>
						<Typeahead
								id="delete"
								labelKey="delete"
								onChange={(text) => {this.setState({...this.state, tempDelete: Object.keys(this.props.module.moduleOptions)[Object.values(this.props.module.moduleOptions).indexOf(text[0])]})}}
								options={Object.values(this.props.module.moduleOptions)}
								ref={ref1}
							> 
							<RiCloseLine color='black' size={22} style={{position: 'absolute', right: '3px', top: '10px'}} onClick={() => {ref1.current.clear()}}/>
							</Typeahead>
						</Form.Group>
						<Button variant="outline-primary" style={{marginLeft: '30px'}} onClick={() => {(this.state.tempDelete !== '') ? this.props.handleDeleteModule(this.state.tempDelete) : this.setState({...this.state, tempDelete: this.state.tempDelete})}}>Delete Module</Button>
					</Form></>
					: <></>}
					<h4 style={{fontSize: '16px', marginTop: '20px'}}>Create New Module</h4>
					<Form inline='true'>
						<Form.Group>
							<Form.Control style={{width: '250px'}} onKeyPress={(event) => {if(event.charCode===13){event.preventDefault(); (this.state.tempNewModule !== '') ? this.props.handleNewModule(this.state.tempNewModule) : this.setState({...this.state, tempNewModule: this.state.tempNewModule}); alert('Module ' + this.state.tempNewModule + ' Created!');}}} onChange={(text) => {this.setState({...this.state, tempNewModule: text.target.value})}} />
						</Form.Group>
						<Button variant="outline-primary" style={{marginLeft: '30px'}} onClick={() => {(this.state.tempNewModule !== '') ? this.props.handleNewModule(this.state.tempNewModule) : this.setState({...this.state, tempNewModule: this.state.tempNewModule}); alert('Module ' + this.state.tempNewModule + ' Created!');}}>Create Module</Button>
					</Form>
				</Modal.Body>
                </Modal>     
	     )
	}

	render(){
		return(
			<div style={{width: '95vw', margin: '5px'}}>
            <div style={{position: 'flex', marginTop: '100px'}}>
			{this.chooseModule()}
			<GridLayer />
				<Container snapToGridAfterDrop={true} />
				<DragLayer snapToGridWhileDragging={true}/>
            </div>
			{(!this.state.showModule) ? 
				<CustomPanel changeState={this.changeState}/>
			: <></>}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
        module: state.module,
		draggableItems: state.draggableItems
	}
}

export default connect(mapStateToProps, {handleGrabModuleEnv, handleUpdateModuleCurrent, handleGrabModuleOptions, handleGrabDraggableItems, handleGrabModuleEnvOptions, handleNewModule, handleSetModule, handleDeleteModule})(Environment);