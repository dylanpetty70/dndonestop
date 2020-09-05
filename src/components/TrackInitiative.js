import React, {Component} from 'react';
import { connect } from 'react-redux';
import {changeInitiativeShow, handleNewInitiative, handleDeleteInitiative, handleShareInitiative, handleUpdateInitiative, handleGrabInitiative} from '../actions/initiative';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Typeahead } from 'react-bootstrap-typeahead';
import {GrAdd} from 'react-icons/gr';
import {MdDelete} from 'react-icons/md';
import {AiOutlineArrowUp} from 'react-icons/ai';

class TrackInitiative extends Component {

	constructor(props){
		super(props);
        this.state = {currentInitiative: 'Choose an initiative name...',
						tempInitiative: [],
						tempShare: '',
						tempNew: ''
						};
		this.noInitiatives = this.noInitiatives.bind(this);
		this.cardView = this.cardView.bind(this);
		this.rows = this.rows.bind(this);
		this.newIni = this.newIni.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeIni = this.handleChangeIni.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleSort = this.handleSort.bind(this);
		this.handleRadioChange = this.handleRadioChange.bind(this);
		this.handleAddNew = this.handleAddNew.bind(this);
	}

	componentDidMount() {
	  
	}

	rows(){
		if(this.state.currentInitiative !== 'Choose an initiative name...' && this.state.currentInitiative !== ''){
			if(this.state.tempInitiative !== [] && this.state.tempInitiative !== undefined){
				return this.state.tempInitiative.map((item, i) => {
					return (<Row key={i}>
						<Col>
							<Form.Group>
							<Form.Control placeholder={item.name} onChange={(text) => {this.handleChange('name', i, text.target.value)}}/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group>
							<Form.Control placeholder={item.initiative} onChange={(text) => {this.handleChange('initiative', i, text.target.value)}}/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group>
							<Form.Control placeholder={item.ac} onChange={(text) => {this.handleChange('ac', i, text.target.value)}}/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group>
							<Form.Control placeholder={item.conditions} onChange={(text) => {this.handleChange('conditions', i, text.target.value)}}/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group>
							<Form.Control placeholder={item.hp} onChange={(text) => {this.handleChange('hp', i, text.target.value)}}/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group>
							<Form.Control placeholder={item.notes} onChange={(text) => {this.handleChange('notes', i, text.target.value)}}/>
							</Form.Group>
						</Col>
						<Col>
							<input type="radio" id={"current" + i} name={"current"} defaultChecked={item.current} onClick={(value) => {this.handleRadioChange(i)}}/>
						</Col>
						<MdDelete onClick={() => {this.handleDelete(i)}} />
					</Row>)
				})
			}
		}
	}

	handleChange(type, i, data){
		let newData = this.state.tempInitiative;
		newData[i][type] = data;
		this.setState({...this.state, tempInitiative: newData});
	}

	handleRadioChange(index){
		let data = this.state.tempInitiative;
		for(let i = 0; i < data.length; i++){
			if(i === index){
				data[i].current = true;
			} else {
				data[i].current = false;
			}
		}
	}

	handleSort(){
		let newData = this.state.tempInitiative;
		let holder = this.state.currentInitiative;
		newData.sort((a, b) => {return b.initiative - a.initiative})
		this.setState({...this.state, tempInitiative: newData, currentInitiative: 'Choose an initiative name...'});
		setTimeout(() => {this.setState({...this.state, currentInitiative: holder})}, 500)
	}

	handleChangeIni(text){
		this.setState({...this.state, currentInitiative: text, tempInitiative: this.props.initiative.initiatives[text].items});
	}

	handleDelete(i){
		let temp = this.state.tempInitiative;
		temp.splice(i, 1);
		this.setState({...this.state, tempInitiative: temp});
		this.props.handleUpdateInitiative(this.state.currentInitiative, temp, this.props.user.username)
	}

	handleAddNew(){
		this.props.handleNewInitiative(this.state.tempNew, this.props.user.username)
		setTimeout(() => {this.setState({...this.state, currentInitiative: this.state.tempNew, tempInitiative: []})}, 1000)
		
	}

	refresh(){
		this.setState({...this.state, tempInitiative: [], currentInitiative: 'Choose an initiative name...'});
		setTimeout(() => {this.setState({...this.state, currentInitiative: this.state.tempNew, tempInitiative: []})}, 500)
	}

	cardView(){
		return(
			<Card style={{height: '100%'}}>
					<Card.Header style={{marginTop: '20px'}}>
					<Form inline style={{float: 'left', marginTop: '5px'}}>
						<Form.Group style={{float: 'left', minWidth: '225px'}}>
							<Typeahead
								id="initiatives"
								labelKey="initiatives"
								onChange={(text) => {if(text.length !== 0) {this.handleChangeIni(text[0])}}}
								options={Object.keys(this.props.initiative.initiatives)}
								placeholder={this.state.currentInitiative}
								/>
							<Button variant="outline-danger" style={{float: 'left'}} onClick={() => {this.props.handleDeleteInitiative(this.state.currentInitiative, this.props.user.username); this.refresh();}}>
								Delete
							</Button>
						</Form.Group>
					</Form>
					<Form inline style={{float: 'right', marginTop: '5px'}}>
						<Form.Group>
							<Form.Control placeholder='New Initiative' onChange={(text) => {this.setState({...this.state, tempNew: text.target.value})}}/>
						</Form.Group>
							<Button variant="outline-success" style={{marginRight: '10px'}} onClick={() => {this.handleAddNew()}}>
								Add New
							</Button>
					</Form>
						{(this.state.currentInitiative !== 'Choose an initiative name...') ? <>
						<Form inline  style={{float: 'right', marginTop: '5px'}}>
						<Form.Group style={{float: 'right'}}>
								<Typeahead
									id="searchshare"
									labelKey="share"
									onChange={(text) => {if(text.length !== 0) {this.setState({...this.state, tempShare: text[0]})}}}
									options={this.props.userNames}
									placeholder={"Share with..."}
								/>
							<Button variant="outline-primary" onClick={() => {this.props.handleShareInitiative(this.state.currentInitiative, this.props.user.username, this.state.tempShare)}}>
								Share
							</Button>
							<Button variant="outline-success" style={{marginLeft: '10px', marginRight: '10px'}} onClick={() => {this.props.handleUpdateInitiative(this.state.currentInitiative, this.state.tempInitiative, this.props.user.username)}}>
								Save
							</Button>
						</Form.Group>
						</Form>
						</>
						: <></>}
					</Card.Header>
					<Card.Body style={{overflowY: 'scroll'}}>
					<Container>
						<Row>
							<Col>
								<Card.Title style={{fontSize: '14px'}}>Name</Card.Title>
							</Col>
							<Col>
								<Card.Title style={{fontSize: '14px'}}>Initiatives<AiOutlineArrowUp onClick={() => {this.handleSort()}} /></Card.Title>
							</Col>
							<Col>
								<Card.Title style={{fontSize: '14px'}}>AC</Card.Title>
							</Col>
							<Col>
								<Card.Title style={{fontSize: '14px'}}>Conditions</Card.Title>
							</Col>
							<Col>
								<Card.Title style={{fontSize: '14px'}}>HP</Card.Title>
							</Col>
							<Col>
								<Card.Title style={{fontSize: '14px'}}>Notes</Card.Title>
							</Col>
							<Col>
								<Card.Title style={{fontSize: '14px'}}>Current</Card.Title>
							</Col>
						</Row>
						<hr/>

						{this.rows()}
						<Row>
							{(this.state.currentInitiative !== 'Choose an initiative name...') ?<><GrAdd onClick={() => {this.props.handleUpdateInitiative(this.state.currentInitiative, this.newIni(), this.props.user.username)}} />
							<p style={{paddingLeft: '5px'}}>Add Player</p></>
							: <></>}
						</Row>
					</Container>
					</Card.Body>
				</Card>
		)
	}

	newIni(){
		let temp = this.state.tempInitiative;
		if(this.state.tempInitiative === undefined){
			temp = [];
		}
		temp.push({name: '', initiative: '', ac: '', conditions: '', hp: '', notes: '', current: false})
		this.setState({...this.state, tempInitiative: temp});
		return temp;
	}

	noInitiatives(){
		return(<Card style={{height: '100%'}}>
					<Card.Header style={{marginTop: '20px'}}>
					<h3>Add Initiative</h3>
					</Card.Header>
					<Card.Body>
						<Form.Group>
							<Form.Control placeholder='New Initiative' onChange={(text) => {this.setState({...this.state, tempNew: text.target.value})}}/>
						</Form.Group>
							<Button variant="outline-success" style={{marginRight: '10px'}} onClick={() => {this.handleAddNew()}}>
								Add New
							</Button>
					</Card.Body>
				</Card>)
	}

	render(){
		return(
            <div style={{height: '100%', width: '100%'}}>
				{(Object.keys(this.props.initiative.initiatives).length > 0) ? 
				this.cardView()
				: 
				this.noInitiatives()
				}
            </div>
		)
	}
}

const mapStateToProps = state => {
	return{
		user: state.user,
		initiative: state.initiative,
		userNames: state.userNames,
	}
}

export default connect(mapStateToProps, {changeInitiativeShow, 
										handleNewInitiative, 
										handleDeleteInitiative, 
										handleShareInitiative, 
										handleUpdateInitiative, 
										handleGrabInitiative
										})(TrackInitiative);