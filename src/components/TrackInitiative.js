import React, {Component} from 'react';
import { connect } from 'react-redux';
import {changeInitiativeShow, handleNewInitiative, handleDeleteInitiative, handleShareInitiative, handleUpdateInitiative, handleGrabInitiative, handleGrabInitiativeOptions} from '../actions/initiative';
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
import {RiCloseLine} from 'react-icons/ri';

const ref = React.createRef();
const ref1 = React.createRef();

class TrackInitiative extends Component {

	constructor(props){
		super(props);
        this.state = {currentInitiative: 'Choose an initiative name...',
						tempInitiative: [],
						tempShare: '',
						tempNew: '',
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
		if(Object.values(this.props.initiative.options).length < 1){
			this.props.handleGrabInitiativeOptions();
		}
	}

	rows(){
		if(this.props.initiative.key.length > 0){
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
		newData.sort((a, b) => {return b.initiative - a.initiative})
		this.props.handleUpdateInitiative(this.props.initiative.key, newData);
		this.setState({...this.state, tempInitiative: []})
		setTimeout(() => {this.setState({...this.state, tempInitiative: this.props.initiative.initiative.items})}, 1000)
	}

	handleChangeIni(text, key){
		this.props.handleGrabInitiative(key)
		setTimeout(() => {this.setState({...this.state, currentInitiative: text, tempInitiative: this.props.initiative.initiative.items})}, 1000)
	}

	handleDelete(i){
		let temp = this.state.tempInitiative;
		temp.splice(i, 1);
		this.setState({...this.state, tempInitiative: temp});
		this.props.handleUpdateInitiative(this.props.initiative.key, temp)
	}

	handleAddNew(){
		this.props.handleNewInitiative(this.state.tempNew)
		
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
								onChange={(value) => {if(value.length !== 0) {this.handleChangeIni(value[0], Object.keys(this.props.initiative.options)[Object.values(this.props.initiative.options).indexOf(value[0])])}}}
								options={Object.values(this.props.initiative.options)}
								placeholder={'Choose initiative...'}
								ref={ref}
						> 
						<RiCloseLine color='black' size={22} style={{position: 'absolute', right: '3px', top: '10px'}} onClick={() => {ref.current.clear()}}/>
						</Typeahead>
							<Button variant="outline-danger" style={{float: 'left'}} onClick={() => {this.props.handleDeleteInitiative(this.props.initiative.key);}}>
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
									onChange={(value) => {this.setState({...this.state, tempShare: Object.keys(this.props.userNames)[Object.values(this.props.userNames).indexOf(value[0])]})}}
									options={Object.values(this.props.userNames)}
									placeholder={"Share with..."}
									ref={ref1}
								> 
								<RiCloseLine color='black' size={22} style={{position: 'absolute', right: '3px', top: '10px'}} onClick={() => {ref1.current.clear()}}/>
								</Typeahead>
							<Button variant="outline-primary" onClick={() => {this.props.handleShareInitiative(this.props.initiative.key, this.state.tempShare)}}>
								Share
							</Button>
							<Button variant="outline-success" style={{marginLeft: '10px', marginRight: '10px'}} onClick={() => {this.props.handleUpdateInitiative(this.props.initiative.key, this.state.tempInitiative)}}>
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
							{(this.state.currentInitiative !== 'Choose an initiative name...') ?<><GrAdd style={{cursor: 'pointer'}} onClick={() => {this.props.handleUpdateInitiative(this.props.initiative.key, this.newIni())}} />
							<p style={{paddingLeft: '5px'}}>Add Player</p></>
							: <></>}
						</Row>
					</Container>
					</Card.Body>
				</Card>
		)
	}

	newIni(){
		console.log(this.state.tempInitiative);
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
				{(Object.values(this.props.initiative.options).length > 0) ? 
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
		initiative: state.initiative,
		userNames: state.userNames,
	}
}

export default connect(mapStateToProps, {changeInitiativeShow, 
										handleNewInitiative, 
										handleDeleteInitiative, 
										handleShareInitiative, 
										handleUpdateInitiative, 
										handleGrabInitiative,
										handleGrabInitiativeOptions
										})(TrackInitiative);