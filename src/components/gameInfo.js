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
        this.state = {page: 'spells', tempSearch: '', placeholder: 'Spell', selected: '', searchLabel: 'Spells', dndInfo: [], spellFilter: '', monsterFilter: ''};
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
		let temp1 = [];
		if(this.state.page === 'spells' && (this.state.spellFilter !== undefined && this.state.spellFilter !== '')){
			if(this.state.spellFilter.substr(0,5) === 'Level'){
				for(var key in this.props.dndInfo.generalInfo.specifics[category]){
					if(String(this.props.dndInfo.generalInfo.specifics[category][key].level) === String(this.state.spellFilter.substr(7,1))){
						temp1.push(key);
					}
				}
				temp = temp1;
			} else {
				for(var key1 in this.props.dndInfo.generalInfo.specifics[category]){
					if(this.props.dndInfo.generalInfo.specifics[category][key1].classes){
						for(let i = 0; i < this.props.dndInfo.generalInfo.specifics[category][key1].classes.length; i++){
							if(this.props.dndInfo.generalInfo.specifics[category][key1].classes[i].name.toLowerCase() === this.state.spellFilter.toLowerCase()){
								temp1.push(key1);
							}
						}
					}
				}
				temp = temp1;
			}
		} else if(this.state.page === 'monsters' && (this.state.monsterFilter !== undefined && this.state.monsterFilter !== '')){
			if(this.state.monsterFilter.substr(0,2) === 'CR'){
				for(var key3 in this.props.dndInfo.generalInfo.specifics[category]){
					if(this.props.dndInfo.generalInfo.specifics[category][key3]['challenge_rating'] === Number(String(this.state.monsterFilter).substr(4,-1))){
						temp1.push(key3);
					}
				}
				temp = temp1;
			} else {
				for(var key2 in this.props.dndInfo.generalInfo.specifics[category]){
					if(this.props.dndInfo.generalInfo.specifics[category][key2].type){
						if(this.props.dndInfo.generalInfo.specifics[category][key2].type === this.state.monsterFilter.toLowerCase()){
							temp1.push(key2);
						}
					}
				}
				temp = temp1;
			}
		} else {
			temp = Object.keys(this.props.dndInfo.generalInfo.specifics[category]);
		}		


		
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
					{(this.state.page === 'spells') ? 
					<>
					<Form.Label style={{fontSize: '16px', marginRight: '30px', marginLeft: '50px'}}>Filter</Form.Label>
					<Form.Group>
						{(Object.keys(this.props.dndInfo).length > 0) ? <Typeahead
								id="searchspell"
								labelKey="spellfilter"
								onChange={(text) => {this.setState({...this.state, spellFilter: text[0]})}}
								options={['Level: 1', 'Level: 2', 'Level: 3', 'Level: 4', 'Level: 5', 'Level: 6', 'Level: 7', 'Level: 8', 'Level: 9',
											'Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer', 'Warlock', 'Wizard']}
								placeholder={"Choose a filter..."}
						/>
					: <></>}
					</Form.Group>
					</>
					: <></>}
					{(this.state.page === 'monsters') ? 
					<>
					<Form.Label style={{fontSize: '16px', marginRight: '30px', marginLeft: '50px'}}>Filter</Form.Label>
					<Form.Group>
						{(Object.keys(this.props.dndInfo).length > 0) ? <Typeahead
								id="searchmonster"
								labelKey="monsterfilter"
								onChange={(text) => {this.setState({...this.state, monsterFilter: text[0]})}}
								options={['CR: 0', 'CR: .125', 'CR: .25', 'CR: .5', 'CR: 1', 'CR: 2', 'CR: 3', 'CR: 4', 'CR: 5', 'CR: 6', 'CR: 7', 
									'CR: 8', 'CR: 9', 'CR: 10', 'CR: 11', 'CR: 12', 'CR: 13', 'CR: 14', 'CR: 15', 'CR: 16', 'CR: 17', 'CR: 18', 
									'CR: 19', 'CR: 20', 'CR: 21', 'CR: 22', 'CR: 23', 'CR: 24', 'CR: 30', 'Beast']}
								placeholder={"Choose a filter..."}
						/>
					: <></>}
					</Form.Group>
					</>
					: <></>}
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