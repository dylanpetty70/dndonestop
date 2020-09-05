import React, {Component} from 'react';
import { connect } from 'react-redux';
import Classes from './GameInfo/classes';
import Conditions from './GameInfo/conditions';
import DamageTypes from './GameInfo/damageTypes';
import Equipment from './GameInfo/equipment';
import Features from './GameInfo/features';
import Languages from './GameInfo/languages';
import LevelUp from './GameInfo/levelup';
import MagicSchools from './GameInfo/magicSchools';
import Monsters from './GameInfo/monsters';
import Races from './GameInfo/races';
import Spells from './GameInfo/spells';
import Traits from './GameInfo/traits';
import WeaponProperties from './GameInfo/weaponProperties';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Typeahead } from 'react-bootstrap-typeahead';
import {handleGrab5e} from '../actions/5eInfo';

class GameInfo extends Component {

	constructor(props){
		super(props);
        this.state = {page: 'spells', tempSearch: '', placeholder: 'Spell', selected: '', searchLabel: 'Spells', dndInfo: []};
		this.navTabs = this.navTabs.bind(this);
		this.switchStatement = this.switchStatement.bind(this);
		this.options = this.options.bind(this);
	}

	componentDidMount(){
		if(!(Object.keys(this.props.dndInfo).length > 0)){
			this.props.handleGrab5e();
		}
	}

	options(category){
		let temp = [];
		temp = Object.keys(this.props.dndInfo.generalInfo.specifics[category]);
		return temp;
	}

	navTabs(){
		const handleSelect = (eventKey) => this.setState({...this.state, tempSearch: '', page: eventKey.split(',')[0], placeholder: eventKey.split(',')[1], searchLabel: eventKey.split(',')[2]});

		return (
		<Nav defaultActiveKey="spells" className="flex-column mr-auto" onSelect={handleSelect}>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey={['classes','Class','Classes']}><Button variant="secondary" style={{width: '100%', textAlign: 'left'}} active={this.state.page === 'classes'}>Classes</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey={['conditions','Condition', 'Conditions']}><Button variant="secondary" style={{width: '100%', textAlign: 'left'}} active={this.state.page === 'conditions'}>Conditions</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey={['damage-types', 'Damage Type', 'Damage Types']}><Button variant="secondary" style={{width: '100%', textAlign: 'left'}} active={this.state.page === 'damage-types'}>Damage Types</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey={['equipment', 'Equipment', 'Equipment']}><Button variant="secondary" style={{width: '100%', textAlign: 'left'}} active={this.state.page === 'equipment'}>Equipment</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey={['features', 'Feature', 'Features']}><Button variant="secondary" style={{width: '100%', textAlign: 'left'}} active={this.state.page === 'features'}>Features</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey={['languages','Language','Languages']}><Button variant="secondary" style={{width: '100%', textAlign: 'left'}} active={this.state.page === 'languages'}>Languages</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey={['level-up','Level Up','Level Up']}><Button variant="secondary" style={{width: '100%', textAlign: 'left'}} active={this.state.page === 'level-up'}>Level Up</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey={['magic-schools', 'Magic School', 'Magic Schools']}><Button variant="secondary" style={{width: '100%', textAlign: 'left'}} active={this.state.page === 'magic-schools'}>Magic Schools</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey={['monsters', 'Monster', 'Monsters']}><Button variant="secondary" style={{width: '100%', textAlign: 'left'}} active={this.state.page === 'monsters'}>Monsters</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey={['races', 'Race', 'Races']}><Button variant="secondary" style={{width: '100%', textAlign: 'left'}} active={this.state.page === 'races'}>Races</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey={['spells', 'Spell', 'Spells']}><Button variant="secondary" style={{width: '100%', textAlign: 'left'}} active={this.state.page === 'spells'}>Spells</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey={['traits', 'Trait', 'Traits']}><Button variant="secondary" style={{width: '100%', textAlign: 'left'}} active={this.state.page === 'traits'}>Traits</Button></Nav.Link>
			</Nav.Item>
			<Nav.Item>
			<Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey={['weapon-properties', 'Weapon Property', 'Weapon Properties']}><Button variant="secondary" style={{width: '100%', textAlign: 'left'}} active={this.state.page === 'weapon-properties'}>Weapon Properties</Button></Nav.Link>
			</Nav.Item>
		</Nav>
		);
	}

	switchStatement(){
		switch(this.state.page){
			case 'classes':
				return (<Classes item={this.state.tempSearch}/>);
			case 'conditions':
				return (<Conditions item={this.state.tempSearch}/>);
			case 'damage-types': 
				return (<DamageTypes item={this.state.tempSearch}/>);
			case 'equipment':
				return (<Equipment item={this.state.tempSearch}/>);
			case 'features':
				return (<Features item={this.state.tempSearch}/>);
			case 'languages':
				return (<Languages item={this.state.tempSearch}/>);
			case 'level-up':
				return (<LevelUp item={this.state.tempSearch}/>);
			case 'magic-schools': 
				return (<MagicSchools item={this.state.tempSearch}/>);
			case 'monsters':
				return (<Monsters item={this.state.tempSearch}/>);
			case 'races':
				return (<Races item={this.state.tempSearch}/>);
			case 'spells':
				return (<Spells item={this.state.tempSearch}/>);
			case 'traits': 
				return (<Traits item={this.state.tempSearch}/>);
			case 'weapon-properties':
				return (<WeaponProperties item={this.state.tempSearch}/>);
			default:
				return (<></>);
		}
	}
	render(){
		return(
            <div>
			<div className="p-3 bg-secondary text-white" style={{position: 'absolute', left: '0', top: '55px', minHeight: '100%', margin: '0'}}>
				<h2>Categories</h2>
					<hr/>
				{this.navTabs()}
			</div>
			<div className="p-3 bg-secondary text-white" style={{position: 'absolute', left: '0', top: '55px', minWidth: '100%', margin: '0' , marginLeft: '225px'}}>
			<div style={{display: 'flex', width: '100%', marginLeft: '20px'}}>
				<Form inline={true}>
					<Form.Label style={{fontSize: '16px', marginRight: '30px'}}>{'Search ' + this.state.searchLabel}</Form.Label>
					<Form.Group>
						{(Object.keys(this.props.dndInfo).length > 0) ? <Typeahead
								id="searchGameInfo"
								labelKey="gameInfo"
								onChange={(text) => {this.setState({...this.state, tempSearch: text[0]})}}
								options={this.options(this.state.page)}
								placeholder={"Choose a "+ this.state.placeholder + "..."}
						/> : <></>}
					</Form.Group>
				</Form>
			</div>
			</div>
			<div style={{color: 'black', marginLeft: '300px', marginTop: '100px', border: '1px solid', borderColor: 'lightGrey', width: '70vw'}}>
				{(this.state.tempSearch !== '') ? 
				<Card style={{width: '100%', height: '100%'}} body>
					<Card.Title style={{textAlign: 'center'}}>{this.state.tempSearch}</Card.Title>
					<hr style={{width: '80%'}} />
					{this.switchStatement()}
				</Card>
				:
				<></>
				}
			</div>
			</div>
		)
	}
}


const mapStateToProps = state => {
	return{
		dndInfo: state.dndInfo
	}
}

export default connect(mapStateToProps, {handleGrab5e})(GameInfo);