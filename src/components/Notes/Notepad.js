import React, { Component } from 'react';
import UseDrag from './useDrag';
import DragLayer from './CustomDragLayer';
import { connect } from 'react-redux';
import {handleNewCampaign, handleNewNotepad, handleNewSubnotepad, handleNewNote, handleGrabCampaign, 
	handleUpdateNote, handleDeleteNotepad, handleDeleteSubnotepad, handleDeleteCampaign,
	handleShareCampaign, handleGrabCampaignOptions} from '../../actions/notes';
import CustomPanel from './CustomPanel';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Typeahead } from 'react-bootstrap-typeahead';
import {GrAdd} from 'react-icons/gr';
import {MdDelete} from 'react-icons/md';
import {RiCloseLine} from 'react-icons/ri';

const ref = React.createRef();
const ref1 = React.createRef();

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
					tempShare: '',
					currentNotepad: '',
					currentSubnotepad: ''
					}
		this.subnotepads = this.subnotepads.bind(this);
		this.notepads = this.notepads.bind(this);
		this.addNotepad = this.addNotepad.bind(this);
		this.addSubnotepad = this.addSubnotepad.bind(this);
		this.styles = this.styles.bind(this);
		this.deleteNotepad = this.deleteNotepad.bind(this);
		this.deleteSubnotepad = this.deleteSubnotepad.bind(this);
		this.deleteCampaign = this.deleteCampaign.bind(this);
		this.shareCampaign = this.shareCampaign.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	componentDidMount(){
		if(Object.keys(this.props.notepads.options).length < 1){
			this.props.handleGrabCampaignOptions();
		}
    }

	handleUpdate(){
		let tempItems = {};
		if(this.state.currentSubnotepad !== '' && this.props.notepads.campaign.notepads){
			if(this.props.notepads.campaign.notepads[this.state.currentNotepad].subnotepads){
				if(this.props.notepads.campaign.notepads[this.state.currentNotepad].subnotepads[this.state.currentSubnotepad].notes){
					tempItems = this.props.notepads.campaign.notepads[this.state.currentNotepad].subnotepads[this.state.currentSubnotepad].notes;
				}
			}
		}

		let temp = {};
		if(Object.keys(tempItems).length){
			for(var key in tempItems){
				temp[[key]] = {
					key: key, 
					top: Number(tempItems[key].pTop), 
					left: Number(tempItems[key].pLeft), 
					object: tempItems[key].object, 
					height: tempItems[key].height, 
					width: tempItems[key].width, 
					title: tempItems[key].title, 
					body: tempItems[key].body,
					campaign: tempItems[key].campaign,
					notepad: tempItems[key].notepad,
					subnotepad: tempItems[key].subnotepad
				}
			}
		}


		return temp;
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
			  top: '66px'
			}
		)
	}

	subnotepads(){
		if(this.state.currentNotepad !== '' && this.props.notepads.campaign.notepads){
			if(this.props.notepads.campaign.notepads[this.state.currentNotepad]){
				let subnotepads = this.props.notepads.campaign.notepads[this.state.currentNotepad].subnotepads;
				let temp = [];
				for(var key in subnotepads){
					let tempString = key;
					const handleDelete = () => {
						this.deleteSubnotepad(tempString)
					}
					temp.push(
						<Nav.Item key={'subnotepadsitem'+key}>
							<Nav.Link style={{color: 'black', fontSize: '16px'}} eventKey={key}>
								{subnotepads[key].name}
								{(this.state.currentSubnotepad === key) ? <MdDelete onClick={() => {handleDelete()}} /> : <></>}
							</Nav.Link>
						</Nav.Item>
					)
				}
				const handleSelect = (eventKey) => {
					this.setState({...this.state, currentSubnotepad: eventKey})
				}

				return (
				<>
				<Nav variant='tabs' style={{border: '1px dashed', borderColor: 'darkGrey'}} activeKey={this.state.currentSubnotepad} className="flex-column mr-auto" onSelect={handleSelect}>
					
				{(this.state.currentSubnotepad === '') ? <h6 style={{color: 'red'}}>Choose a Page</h6> : <></>}
					<div style={{marginRight: '10px', marginTop: '7px', marginBottom: '7px', paddingRight: '10px', paddingLeft: '5px'}}><h6>Page</h6></div>
					{temp}
					<Nav.Item>
					<Nav.Link style={{color: 'blue', fontSize: '16px'}}  onClick={() => {this.setState({...this.state, showAddSubnotepad: true})}}>+ Page</Nav.Link>
					</Nav.Item>
				</Nav>
				</>
				);
			}
		} else {
			return(
				<h6 style={{color: 'red'}}>Choose a Notepad</h6>
			)
		}
	}	

	
	notepads(){
		if(this.props.notepads.campaign.notepads){
			let notepads = this.props.notepads.campaign.notepads
			const handleSelect = (eventKey) => {
				this.setState({...this.state, currentNotepad: eventKey, currentSubnotepad: ''})
			}
			let temp = [];
			for(var key in notepads){
				let tempString = key;
				const handleDelete = () => {
					this.deleteNotepad(tempString)
				}
				temp.push(<Nav.Item key={'notepadsitem'+key}>
					<Nav.Link style={{color: 'black', fontSize: '16px'}} eventKey={key}>
						{notepads[key].name}
						{(this.state.currentNotepad === key) ? <MdDelete onClick={() => {handleDelete()}} /> : <></>}
					</Nav.Link>
				</Nav.Item>)
			}
			return (
			<Nav variant='tabs' activeKey={this.state.currentNotepad} style={{marginLeft: '30px', border: '1px dashed', borderColor: 'darkGrey'}} className="flex-row mr-auto" onSelect={handleSelect}>
				<div style={{marginRight: '10px', marginTop: '7px', marginBottom: '7px', paddingRight: '10px', paddingLeft: '5px'}}><h6>Notepads</h6></div>
				{temp}
				<Nav.Item>
				<Nav.Link style={{color: 'blue',fontSize: '16px'}} onClick={() => {this.setState({...this.state, showAddNotepad: true})}}>+ Notepad</Nav.Link>
				</Nav.Item>
			</Nav>
			);
		} else if(this.props.notepads.key !== ''){
			return(<Nav variant='tabs' activeKey={''} style={{marginLeft: '30px'}} className="flex-row mr-auto">
					<div style={{marginRight: '10px', marginTop: '7px', marginBottom: '7px', paddingRight: '10px', paddingLeft: '5px'}}><h6>Notepads</h6></div>
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
                    <Button variant="primary" onClick={() => {this.setState({...this.state, showAddCampaign: false});  this.props.handleNewCampaign(this.state.tempCampaignName);}}>Create</Button>
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
                    <Button variant="primary" onClick={() => {this.setState({...this.state, showAddNotepad: false});  this.props.handleNewNotepad(this.props.notepads.key, this.state.tempNotepadName); }}>Create</Button>
                    <Button variant="outline-danger" onClick={() => {this.setState({...this.state, showAddNotepad: false});}}>Cancel</Button>
                </Modal.Footer>
            </Modal>     
        )
	}

	deleteNotepad(notepad){
		this.setState({...this.state, currentNotepad: '', currentSubnotepad: ''})
		this.props.handleDeleteNotepad(this.props.notepads.key, notepad); 
	}

	deleteSubnotepad(subnotepad){
		this.setState({...this.state, currentNotepad: '', currentSubnotepad: ''})
		this.props.handleDeleteSubnotepad(this.props.notepads.key, this.state.currentNotepad, subnotepad); 
	}

	deleteCampaign(campaign){
		this.setState({...this.state, currentNotepad: '', currentSubnotepad: ''})
		this.props.handleDeleteCampaign(this.props.notepads.key);
		setTimeout(() => {this.props.handleGrabCampaignOptions()}, 600);
	}

	shareCampaign(){
		this.props.handleShareCampaign(this.props.notepads.key, this.state.tempShare);
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
                    <Button variant="primary" onClick={() => {this.setState({...this.state, showAddSubnotepad: false}); this.props.handleNewSubnotepad(this.props.notepads.key, this.state.currentNotepad, this.state.tempSubnotepadName); }}>Create</Button>
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
				<div className="p-3" style={{backgroundColor: '#e8e9ed', zIndex: '2', position: 'absolute', height: '70px', left: '0', top: '77px', width: '100vw', margin: '0'}}>
				<Form inline={true}>
				<Form.Group style={{maxWidth: '200px', maxHeight: '36px'}}>
					<Typeahead
							id="campaignSelect"
							labelKey="campaigns"
							onChange={(text) => {if(text[0] !== undefined){this.props.handleGrabCampaign(Object.keys(this.props.notepads.options)[Object.values(this.props.notepads.options).indexOf(text[0])])}}}
							options={Object.values(this.props.notepads.options)}
							placeholder='Add Campaign'
							value={(this.props.notepads.campaign.name) ? this.props.notepads.campaign.name : 'Add Campaign'}
							style={{height: '36px'}}
							ref={ref}
						> 
						<RiCloseLine color='black' size={22} style={{position: 'absolute', right: '38px', top: '10px'}} onClick={() => {ref.current.clear()}}/>
						</Typeahead>
						<GrAdd style={{borderRadius: '.25em', backgroundColor: 'lightGrey', height: '36px', width: '36px', top: '-35px', marginLeft: '163px', position: 'relative'}} onClick={() => {this.setState({...this.state, showAddCampaign: true});}} />
					</Form.Group>
					{this.notepads()}
				{(this.props.notepads.key !== '') ? <>
				<Typeahead
							id="campaignShare"
							labelKey="campaignShare"
							onChange={(value) => {this.setState({...this.state, tempShare: Object.keys(this.props.userNames)[Object.values(this.props.userNames).indexOf(value[0])]})}}
							options={Object.values(this.props.userNames)}
							placeholder='Share with...'
							style={{height: '36px'}}
							ref={ref1}
						> 
						<RiCloseLine color='black' size={22} style={{position: 'absolute', right: '3px', top: '10px'}} onClick={() => {ref1.current.clear()}}/>
						</Typeahead>
				<Button variant ="outline-secondary" style={{float: 'right', marginRight: '10px'}} onClick={() => {this.shareCampaign()}}>Share Campaign</Button>
				<Button variant="danger" style={{float: 'right', marginRight: '20px'}} onClick={() => {this.deleteCampaign()}}>Delete Campaign</Button></>
				: <></>}
				</Form>
				</div>
				<div className="p-3" style={{backgroundColor: '#e8e9ed', zIndex: '1', position: 'absolute', left: '0', top: '100px', minHeight: '104.5%', margin: '0', width: '200px'}}>
					<hr/>
					{(this.props.notepads.key !== '') ? this.subnotepads() : <></>}
				</div>
            <div style={{height: '75vw', width: '75vw', position: 'flex'}}>
				<UseDrag boxes={this.handleUpdate()} scale={1} accept={['0','1','2','3','4','5','6','7']} snapToGrid={false} styles={this.styles()}/>
				<DragLayer/>
            </div>
				{(this.state.currentSubnotepad !== '') ? <CustomPanel notepad={this.state.currentNotepad} subnotepad={this.state.currentSubnotepad} /> : <></>}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
        notepads: state.notepads,
		userNames: state.userNames
	}
}

export default connect(mapStateToProps, {handleNewCampaign, handleNewNotepad, handleNewSubnotepad, handleNewNote, handleGrabCampaign, 
	handleUpdateNote, handleDeleteNotepad, handleDeleteSubnotepad, handleDeleteCampaign,
	handleShareCampaign, handleGrabCampaignOptions})(Notepad);