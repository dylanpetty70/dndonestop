import React, { Component } from 'react';
import UseDrag from './useDrag';
import DragLayer from './CustomDragLayer';
import { connect } from 'react-redux';
import {handleChangeCampaign, handleAddCampaign, handleAddNotepad, handleAddSubnotepad, handleAddNote, handleGrabCampaigns, changeNotepad, changeSubnotepad, handleUpdateNote} from '../../actions/notes';
import CustomPanel from './CustomPanel';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Typeahead } from 'react-bootstrap-typeahead';
import {GrAdd} from 'react-icons/gr';

class Notepad extends Component {

	constructor(props){
		super(props);
		this.state = {showAddNotepad: false, 
					showAddSubnotepad: false, 
					showAddCampaign: false,
					tempNotepadName: '', 
					tempSubnotepadName: '',
					tempCampaignName: '',
					subnotepads: [],
					boxes: {},
					items: [],
					}
		this.subnotepads = this.subnotepads.bind(this);
		this.notepads = this.notepads.bind(this);
		this.addNotepad = this.addNotepad.bind(this);
		this.addSubnotepad = this.addSubnotepad.bind(this);
		this.updateSubState = this.updateSubState.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.styles = this.styles.bind(this);
	}

	componentDidMount(){
		let tempItems = [];
          if(this.props.notesOptions.current.subnotepad !== '' & Object.keys(this.props.notepads).length > 0){
              for(let i = 0; i < this.props.notepads[this.props.notesOptions.current.notepad].length; i++){
                  if(this.props.notepads[this.props.notesOptions.current.notepad][i].subnotepad === this.props.notesOptions.current.subnotepad){
                    if(this.props.notepads[this.props.notesOptions.current.notepad][i].notes){
                        tempItems = this.props.notepads[this.props.notesOptions.current.notepad][i].notes;
			        }
	              }
              }
          }
		let temp = {};
		if(tempItems.length > 0){
			for(let i = 0; i < tempItems.length; i++){
			temp[['id' + i]] = {id: 'id'+i, top: Number(tempItems[i].pTop), left: Number(tempItems[i].pLeft), object: tempItems[i].object, size: tempItems[i].size};
			}
		} else {
			temp = {};
		}

		
		this.setState({...this.state, boxes: temp, items: tempItems});
    }

	componentDidUpdate(prevProps){
		if(prevProps.notepads !== this.props.notepads){
			let tempItems = [];
			  if(this.props.notesOptions.current.subnotepad !== '' & Object.keys(this.props.notepads).length > 0){
				  for(let i = 0; i < this.props.notepads[this.props.notesOptions.current.notepad].length; i++){
					  if(this.props.notepads[this.props.notesOptions.current.notepad][i].subnotepad === this.props.notesOptions.current.subnotepad){
						if(this.props.notepads[this.props.notesOptions.current.notepad][i].notes){
							tempItems = this.props.notepads[this.props.notesOptions.current.notepad][i].notes;
						}
					  }
				  }
			  }
			let temp = {};
			if(tempItems.length > 0){
				for(let i = 0; i < tempItems.length; i++){
				temp[['id' + i]] = {id: 'id'+i, top: Number(tempItems[i].pTop), left: Number(tempItems[i].pLeft), object: tempItems[i].object, size: tempItems[i].size};
				}
			} else {
				temp = {};
			}
			this.setState({...this.state, boxes: temp, items: tempItems});
		}
	}

	handleUpdate(items){
		let tempItems = [];
          if(this.props.notesOptions.current.subnotepad !== '' & Object.keys(this.props.notepads).length > 0){
              for(let i = 0; i < this.props.notepads[this.props.notesOptions.current.notepad].length; i++){
                  if(this.props.notepads[this.props.notesOptions.current.notepad][i].subnotepad === this.props.notesOptions.current.subnotepad){
                    if(this.props.notepads[this.props.notesOptions.current.notepad][i].notes){
						if(items === undefined){
							tempItems = this.props.notepads[this.props.notesOptions.current.notepad][i].notes;
						} else {
							tempItems = items;
						}
			        }
	              }
              }
          }
		let temp = {};
		if(tempItems.length > 0){
			for(let i = 0; i < tempItems.length; i++){
			temp[['id' + i]] = {id: 'id'+i, top: Number(tempItems[i].pTop), left: Number(tempItems[i].pLeft), object: tempItems[i].object, size: tempItems[i].size};
			}
		} else {
			temp = {};
		}

		
		this.setState({...this.state, boxes: temp, items: tempItems});
		if(items !== undefined){ this.props.handleUpdateNote(this.props.notesOptions.current.campaign, this.props.notesOptions.current.notepad, this.props.notesOptions.current.subnotepad, tempItems)}
	}

	styles(){
		return(
			{
			  width: '83vw',
			  height: '100vh',
			  border: '1px solid black',
			  position: 'relative',
			  left: '195px',
			  margin: '5px',
			  top: '-34px'
			}
		)
	}

	updateSubState(){
		setTimeout(() => {
			let tempsub = [];
			if(this.props.notesOptions.current.notepad !== ''){
				for(let i = 0; i < this.props.notepads[this.props.notesOptions.current.notepad].length; i++){
					tempsub.push(this.props.notepads[this.props.notesOptions.current.notepad][i].subnotepad)
				}
				this.setState({...this.state, subnotepads: tempsub});
			} else {
				this.setState({...this.state, subnotepads: ''});
			}
		}, 300)
	}

	subnotepads(){
		if(Object.keys(this.props.notepads).length !== 0 & this.props.notesOptions.current.subnotepad !== ''){
			let temp = [];
			for(let i = 0; i < this.state.subnotepads.length; i++){
				temp.push(
					<Nav.Item key={'subnotepadsitem'+i}>
						<Nav.Link style={{color: 'black', fontSize: '16px'}} eventKey={this.state.subnotepads[i]}>{this.state.subnotepads[i]}</Nav.Link>
					</Nav.Item>
				)
			}
			const handleSelect = (eventKey) => {
				this.props.changeSubnotepad(eventKey);
				this.updateSubState();
				setTimeout(this.handleUpdate(), 600);
			}

			return (
			<Nav variant='tabs' activeKey={this.props.notesOptions.current.subnotepad} className="flex-column mr-auto" onSelect={handleSelect}>
				{temp}
				<Nav.Item>
				<Nav.Link style={{color: 'blue', fontSize: '16px'}}  onClick={() => {this.setState({...this.state, showAddSubnotepad: true})}}>+ Note</Nav.Link>
				</Nav.Item>
			</Nav>
			);
		} else {
			return(<Nav variant='tabs' defaultActiveKey={''} className="flex-column mr-auto">
				<Nav.Item>
				<Nav.Link style={{color: 'blue', fontSize: '16px'}}  onClick={() => {this.setState({...this.state, showAddSubnotepad: true})}}>+ Note</Nav.Link>
				</Nav.Item>
			</Nav>)
		}
	}	

	
	notepads(){
		if(this.props.notepads !== {} & this.props.notesOptions.current.notepad !== ''){
			setTimeout(()=>{this.updateSubState()}, 600)
			let notepads = Object.keys(this.props.notepads)
			const handleSelect = (eventKey) => {
				this.props.changeNotepad(eventKey, this.props.notepads[eventKey]);
				this.updateSubState();
				setTimeout(this.handleUpdate(), 600);
			}
			let temp = [];
			for(let i = 0; i < notepads.length; i++){
				temp.push(<Nav.Item key={'notepadsitem'+i}>
					<Nav.Link style={{color: 'black', fontSize: '16px'}} eventKey={notepads[i]}>{notepads[i]}</Nav.Link>
				</Nav.Item>)
			}

			return (
			<Nav variant='tabs' activeKey={this.props.notesOptions.current.notepad} style={{marginLeft: '30px'}} className="flex-row mr-auto" onSelect={handleSelect}>
				{temp}
				<Nav.Item>
				<Nav.Link style={{color: 'blue',fontSize: '16px'}} onClick={() => {this.setState({...this.state, showAddNotepad: true})}}>+ Notepad</Nav.Link>
				</Nav.Item>
			</Nav>
			);
		} else {
			return(<Nav variant='tabs' activeKey={''} style={{marginLeft: '30px'}} className="flex-row mr-auto">
				<Nav.Item>
				<Nav.Link style={{color: 'blue',fontSize: '16px'}} onClick={() => {this.setState({...this.state, showAddNotepad: true})}}>+ Notepad</Nav.Link>
				</Nav.Item>
			</Nav>)
		}
	}

	addCampaign(){
        return(
            <Modal
                show={this.state.showAddCampaign}
                onHide={() => {this.setState({...this.state, showAddCampaign: false})}}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header>
                    <Modal.Title>Add Campaign</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder='Name' onChange={(text) =>{this.setState({...this.state, tempCampaignName: text.target.value})}}/>
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {this.setState({...this.state, showAddCampaign: false});  this.props.handleAddCampaign(this.state.tempCampaignName); this.updateSubState();}}>Create</Button>
                    <Button variant="outline-danger" onClick={() => {this.setState({...this.state, showAddCampaign: false});}}>Cancel</Button>
                </Modal.Footer>
            </Modal>     
        )
	}

	addNotepad(){
        return(
            <Modal
                show={this.state.showAddNotepad}
                onHide={() => {this.setState({...this.state, showAddNotepad: false})}}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header>
                    <Modal.Title>Add Notepad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder='Name' onChange={(text) =>{this.setState({...this.state, tempNotepadName: text.target.value})}}/>
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {this.setState({...this.state, showAddNotepad: false});  this.props.handleAddNotepad(this.props.notesOptions.current.campaign, this.state.tempNotepadName); this.updateSubState();}}>Create</Button>
                    <Button variant="outline-danger" onClick={() => {this.setState({...this.state, showAddNotepad: false});}}>Cancel</Button>
                </Modal.Footer>
            </Modal>     
        )
	}

	addSubnotepad(){
        return(
            <Modal
                show={this.state.showAddSubnotepad}
                onHide={() => {this.setState({...this.state, showAddSubnotepad: false})}}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header>
                    <Modal.Title>Add Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder='Name' onChange={(text) =>{this.setState({...this.state, tempSubnotepadName: text.target.value})}}/>
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {this.setState({...this.state, showAddSubnotepad: false}); this.props.handleAddSubnotepad(this.props.notesOptions.current.campaign, this.props.notesOptions.current.notepad, this.state.tempSubnotepadName); this.updateSubState();}}>Create</Button>
                    <Button variant="outline-danger" onClick={() => {this.setState({...this.state, showAddSubnotepad: false})}}>Cancel</Button>
                </Modal.Footer>
            </Modal>     
        )
	}

	render(){
		return(
			<div>
				{this.addNotepad()}
				{this.addSubnotepad()}
				{this.addCampaign()}
				<div className="p-3" style={{backgroundColor: '#e8e9ed', zIndex: '2', position: 'absolute', height: '70px', left: '0', top: '57px', width: '100vw', margin: '0'}}>
				<Form inline={true}>
				<Form.Group style={{maxWidth: '200px', maxHeight: '36px'}}>
					<Typeahead
							id="campaignSelect"
							labelKey="campaigns"
							onChange={(text) => {if(this.props.notesOptions.all.includes(text[0])){this.props.handleChangeCampaign(text[0])}; this.updateSubState();}}
							options={this.props.notesOptions.all}
							placeholder={this.props.notesOptions.current.campaign}
							value={this.props.notesOptions.current.campaign}
							style={{height: '36px'}}
						/>
						<GrAdd style={{borderRadius: '.25em', backgroundColor: 'lightGrey', height: '36px', width: '36px', top: '-35px', marginLeft: '163px', position: 'relative'}} onClick={() => {this.setState({...this.state, showAddCampaign: true}); this.updateSubState();}} />
					</Form.Group>
					{this.notepads()}
				</Form>
				</div>
				<div className="p-3" style={{backgroundColor: '#e8e9ed', zIndex: '1', position: 'absolute', left: '0', top: '100px', minHeight: '104.5%', margin: '0', width: '200px'}}>
					<hr/>
					{this.subnotepads()}
				</div>
            <div style={{height: '75vw', width: '75vw', position: 'flex'}}>
				<UseDrag boxes={this.state.boxes} items={this.state.items} scale={1} accept={['0','1','2','3','4','5','6','7']} snapToGrid={false} handleUpdate={this.handleUpdate} styles={this.styles()}/>
				<DragLayer/>
            </div>
				<CustomPanel handleUpdate={this.handleUpdate}/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
        notepads: state.notepads,
		notesOptions: state.notesOptions
	}
}

export default connect(mapStateToProps, {handleUpdateNote, handleChangeCampaign, handleAddCampaign, handleAddNotepad, handleAddSubnotepad, handleAddNote, handleGrabCampaigns, changeNotepad, changeSubnotepad})(Notepad);