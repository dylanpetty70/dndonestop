import React, {Component} from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


class Monsters extends Component {

	constructor(props){
		super(props);
		this.state = {data: this.props.dndInfo.generalInfo.specifics.monsters[this.props.item]};
		this.abilities = this.abilities.bind(this);
		this.ac = this.ac.bind(this);
		this.hp = this.hp.bind(this);
		this.challenge = this.challenge.bind(this);
		this.alignment = this.alignment.bind(this);
		this.damage_immunities = this.damage_immunities.bind(this);
		this.damage_vulnerabilities = this.damage_vulnerabilities.bind(this);
		this.condition_immunities = this.condition_immunities.bind(this);
		this.hitDice = this.hitDice.bind(this);
		this.languages = this.languages.bind(this);
		this.speed = this.speed.bind(this);
		this.proficiencies = this.proficiencies.bind(this);
		this.senses = this.senses.bind(this);
		this.size = this.size.bind(this);
		this.specialAbilities = this.specialAbilities.bind(this);
		this.actions = this.actions.bind(this);
		this.legendary_action = this.legendary_action.bind(this);
		this.capitalLetter = this.capitalLetter.bind(this);
	}

	componentDidUpdate(prevProps) {
	  if(prevProps.item !== this.props.item) {
		this.setState({data: this.props.dndInfo.generalInfo.specifics.monsters[this.props.item]});
	  }
	}

	abilities(){
		let temp = [];
		let abilityMods = [];
		if(this.state.data._id){
			let abilities = {Strength: this.state.data.strength, 
							Dexterity: this.state.data.dexterity,
							Constitution: this.state.data.constitution,
							Intelligence: this.state.data.intelligence,
							Wisdom: this.state.data.wisdom,
							Charisma: this.state.data.charisma,
							};
			for(var keys in abilities){
				abilityMods.push((Number(abilities[keys]) - 10 > 0) ? 
					Math.floor((Number(abilities[keys]) -  10)/2): 
					Math.ceil((Number(abilities[keys]) -10)/2))
			}

			temp.push(
				<Container key={'ab'} style={{textAlign: 'center'}}>
					<Row>
					<Col>
						<Card body>
							<Card.Title style={{fontSize: '12px'}}>Strength</Card.Title>
							<h3>{abilityMods[0]}<br/></h3>
							{abilities.Strength}
						</Card>
					</Col>
					<Col>
						<Card body>
							<Card.Title style={{fontSize: '12px'}}>Dexterity</Card.Title>
							<h3>{abilityMods[1]}<br/></h3>
							{abilities.Dexterity}
						</Card>
					</Col>
					<Col>
						<Card body>
							<Card.Title style={{fontSize: '12px'}}>Constitution</Card.Title>
							<h3>{abilityMods[2]}<br/></h3>
							{abilities.Constitution}
						</Card>
					</Col>
					<Col>
						<Card body>
							<Card.Title style={{fontSize: '12px'}}>Intelligence</Card.Title>
							<h3>{abilityMods[3]}<br/></h3>
							{abilities.Intelligence}
						</Card>
					</Col>
					<Col>
						<Card body>
							<Card.Title style={{fontSize: '12px'}}>Wisdom</Card.Title>
							<h3>{abilityMods[4]}<br/></h3>
							{abilities.Wisdom}
						</Card>
					</Col>
					<Col>
						<Card body>
							<Card.Title style={{fontSize: '12px'}}>Charisma</Card.Title>
							<h3>{abilityMods[5]}<br/></h3>
							{abilities.Charisma}
						</Card>
					</Col>
					</Row>
					<br/>
					<br/>
				</Container>
			)
		}
        return temp;
	}

	ac(){
		let temp = [];
		if(this.state.data.ac){
			temp.push(<h6 key={'dac'}>Armor Class</h6>)
			temp.push(<p key={'acede'}>{this.state.data.ac}</p>)
		}
		return temp;
	}

	hp(){
		let temp = [];
		if(this.state.data.hit_points){
			temp.push(<h6 key={'hp'}>Hit Points</h6>)
			temp.push(<p key={'hpp'}>{this.state.data.hit_points}</p>)
		}
		return temp;
	}

	challenge(){
		let temp = [];
		if(this.state.data.challenge_rating){
			temp.push(<h6 key={'cr'}>Challenge Rating</h6>)
			temp.push(<p key={'crp'}>{this.state.data.challenge_rating}</p>)
		}
		return temp;
	}

	alignment(){
		let temp = [];
		if(this.state.data.alignment){
			temp.push(<h6 key={'al'}>Alignment</h6>)
			temp.push(<p key={'alp'}>{this.state.data.alignment}</p>)
		}
		return temp;
	}

	damage_immunities(){
		let temp = [];
		let list = [];
		if(this.state.data.damage_immunities){
			temp.push(<h6 key={'di'}>Damage Immunities</h6>)
			list = [];
			for(let i = 0; i < this.state.data.damage_immunities.length; i++){
				list.push(this.state.data.damage_immunities[i]);
			}
			temp.push(<p key={'dip'}>{list.join(', ')}<br/></p>);
		}
		return temp;
	}

	damage_vulnerabilities(){
		let temp = [];
		let list = [];
		if(this.state.data.damage_vulnerabilities){
			temp.push(<h6 key={'dv'}>Damage Vulnerabilities</h6>)
			list = [];
			for(let i = 0; i < this.state.data.damage_vulnerabilities.length; i++){
				list.push(this.state.data.damage_vulnerabilities[i]);
			}
			temp.push(<p key={'dvp'}>{list.join(', ')}<br/></p>);
		}
		return temp;
	}

	condition_immunities(){
		let temp = [];
		let list = [];
		if(this.state.data.condition_immunities){
			temp.push(<h6 key={'ci'}>Condition Immunities</h6>)
			list = [];
			for(let i = 0; i < this.state.data.condition_immunities.length; i++){
				list.push(this.state.data.condition_immunities[i]);
			}
			temp.push(<p key={'cip'}>{list.join(', ')}<br/></p>);
		}
		return temp;
	}

	hitDice(){
		let temp = [];
		if(this.state.data.hit_die){
			temp.push(<h6 key={'hd'}>Hit Die</h6>)
			temp.push(<p key={'hdp'}>{this.state.data.hit_die}</p>)
		}
		return temp;
	}

	languages(){
		let temp = [];
		if(this.state.data.languages){
			temp.push(<h6 key={'l'}>Languages</h6>)
			temp.push(<p key={'lp'}>{this.state.data.languages}</p>)
		}
		return temp;
	}

	speed(){
		let temp = [];
		if(this.state.data.speed){
			temp.push(<h6 key={'se'}>Speed</h6>)
			for(var key in this.state.data.speed){
				let string = this.capitalLetter(key);
				temp.push(<p key={'sep'+key}>{string}: {this.state.data.speed[key]}<br/></p>);
			}
		}
		return temp;
	}

	proficiencies(){
		let temp = [];
		let list = [];
		if(this.state.data.proficiencies){
			temp.push(<h6 key={'p'}>Proficiencies</h6>)
			list = [];
			for(let i = 0; i < this.state.data.proficiencies.length; i++){
				list.push(this.state.data.proficiencies[i].name);
			}
			temp.push(<p key={'pp'}>{list.join(', ')}<br/></p>);
		}
		return temp;
	}

	capitalLetter(str){
		str = str.split(" ");
		for (var i = 0, x = str.length; i < x; i++) {
			str[i] = str[i][0].toUpperCase() + str[i].substr(1);
		}
		return str.join(" ");
	}

	senses(){
		let temp = [];
		if(this.state.data.senses){
			temp.push(<h6 key={'s'}>Senses</h6>)
			for(var key in this.state.data.senses){
				let string = key.replace('_', ' ');
				string = this.capitalLetter(string);
				temp.push(<p key={'sp'+key}>{string}: {this.state.data.senses[key]}<br/></p>);
			}
		}
		return temp;
	}

	size(){
		let temp = [];
		if(this.state.data.size){
			temp.push(<h6 key={'see'}>Size</h6>)
			temp.push(<p key={'sefe'}>{this.state.data.size}</p>)
		}
		return temp;
	}

	specialAbilities(){
		let temp = [];
		if(this.state.data.special_abilities){
			temp.push(<h6 key={'sa'}>Special Abilities</h6>)
			for(let i = 0; i < this.state.data.special_abilities.length; i++){
				let string = ((this.state.data.special_abilities[i].usage) ? String(': ' + this.state.data.special_abilities[i].usage.times + ' times ' + this.state.data.special_abilities[i].usage.type) : '');
				temp.push(<em key={'name' + i}>{this.state.data.special_abilities[i].name + string}</em>)
				temp.push(<p key={'desdc'+i}>{this.state.data.special_abilities[i].desc}</p>);
			}
		}
		return temp;
	}

	actions(){
		let temp = [];
		if(this.state.data.actions){
			temp.push(<h3 key={'sa'}>Actions</h3>)
			for(let i = 0; i < this.state.data.actions.length; i++){
				temp.push(<h5 key={'action' + i}>{this.state.data.actions[i].name}</h5>)
				if(this.state.data.actions[i].desc){
					temp.push(<strong key={'strongdesc'+i}>Description</strong>)
					temp.push(<p key={'pdesc'+i}>{this.state.data.actions[i].desc}</p>);
				}
				if(this.state.data.actions[i].options){
					temp.push(<strong key={'strongop'+i}>Options: Choose {this.state.data.actions[i].options.choose}</strong>)
					for(let j = 0; j < this.state.data.actions[i].options.from[0].length; j++){
						let data = this.state.data.actions[i].options.from[0][j];
						temp.push(<p key={'poptiofdan'+j}>{data.count} {data.name}, {data.type}<br/></p>);
					}
				}
				if(this.state.data.actions[i].options){
					temp.push(<strong key={'stronfdagop'+i}>Options: Choose {this.state.data.actions[i].options.choose}</strong>)
					for(let j = 0; j < this.state.data.actions[i].options.from[0].length; j++){
						let data = this.state.data.actions[i].options.from[0][j];
						temp.push(<p key={'poption'+j}>{data.count} {data.name}, {data.type}<br/></p>);
					}
				}
				if(this.state.data.actions[i].attack_bonus){
					temp.push(<p key={'pdabd'+i}><em key={'statt'+i}>Attack Bonus:</em> {this.state.data.actions[i].desc}</p>);
				}
				if(this.state.data.actions[i].damage){
					for(let j = 0; j < this.state.data.actions[i].damage.length; j++){
						if(this.state.data.actions[i].damage[j].choose){
							temp.push(<h5 key={'strodwdwdwodp'+i}>Options: Choose {this.state.data.actions[i].damage[j].choose}</h5>)
							for(let h = 0; h < this.state.data.actions[i].damage[j].from.length; h++){
								let data = this.state.data.actions[i].damage[j].from[h];
								temp.push(<strong key={'poptdwddwdwdn'+h}>{data.damage_dice + ', ' + data.damage_type.name}<br/></strong>);
							}
						} else{
							let data = this.state.data.actions[i].damage[j];
							temp.push(<p key={'popdfdaman'+j+ data.damage_dice}>Damage {data.damage_dice}, {data.damage_type.name}<br/></p>);
						}
					}
				}
				if(this.state.data.actions[i].dc){
					let data = this.state.data.actions[i].dc;
					temp.push(<p key={'popddfaaman'+i}>DC: {data.dc_value}, {data.dc_type.name}, Success Type: {data.success_type}<br/></p>);
				}
				if(this.state.data.actions[i].usage){
					let data = this.state.data.actions[i].usage;
					temp.push(<p key={'pousagen'+i}>{data.type} of {data.dice} on minimal value {data.min_value}<br/></p>);
				}
				if(this.state.data.actions[i].attack_options){
					temp.push(<h5 key={'strodwdwdwop'+i}>Options: Choose {this.state.data.actions[i].attack_options.choose}</h5>)
					for(let j = 0; j < this.state.data.actions[i].attack_options.from.length; j++){
						let data = this.state.data.actions[i].attack_options.from[j];
						temp.push(<strong key={'poptdwdwdwdn'+j}>{data.name}<br/></strong>);
						if(this.state.data.actions[i].attack_options.from[j].dc){
							let datadc = this.state.data.actions[i].attack_options.from[j].dc;
							temp.push(<p key={'popdafdaman'+j}>DC: {datadc.dc_value}, {datadc.dc_type.name}, Success Type: {datadc.success_type}<br/></p>);
						}
						if(this.state.data.actions[i].attack_options.from[j].damage){
							for(let h = 0; h < this.state.data.actions[i].attack_options.from[j].damage.length; h++){
								let data =this.state.data.actions[i].attack_options.from[j].damage[h];
								temp.push(<p key={'popdaman'+h}>Damage: {data.damage_dice}, {data.damage_type.name}<br/></p>);
							}
						}
						if(this.state.data.actions[i].attack_options.from[j].desc){
							temp.push(<strong key={'stronsasgdesc'+i}>Description</strong>)
							temp.push(<p key={'pdeassasc'+i}>{this.state.data.actions[i].attack_options.from[j].desc}</p>);
						}
					}
				}
			}
		}
		return temp;
	}

	legendary_action(){
		let temp = [];
		if(this.state.data.legendary_actions){
			temp.push(<h4 key={'se'}>Legendary Actions</h4>)
			for(let i = 0; i < this.state.data.legendary_actions.length; i++){
				let data = this.state.data.legendary_actions[i];
				temp.push(<strong key={'pdeasddtafdas'+i}>{data.name}</strong>);
				if(data.desc){
					temp.push(<em key={'stronsasgdtaa'+i}><br/>Description</em>)
					temp.push(<p key={'pdeasddtaas'+i}>{data.desc}</p>);
				}
				if(data.damage){
					for(let h = 0; h <data.damage.length; h++){
						temp.push(<p key={'popdaman'+h}>Damage: {data.damage[h].damage_dice}, {data.damage[h].damage_type.name}<br/></p>);
					}
				}
				if(data.dc){
					temp.push(<p key={'popddfafdaman'+i}>DC: {data.dc.dc_value}, {data.dc.dc_type.name}, Success Type: {data.dc.success_type}<br/></p>);
				}
			}
		}
		return temp;
	}


	render(){
		return(
			<div>
				{(Object.keys(this.props.dndInfo.generalInfo.specifics.monsters).includes(this.props.item) & this.state.data !== undefined) ?
				<div>
				
				{this.abilities()}
				
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.ac()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.hp()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.challenge()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.alignment()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.damage_immunities()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.damage_vulnerabilities()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.condition_immunities()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.hitDice()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.languages()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.speed()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px', maxWidth: '400px'}}>
				{this.proficiencies()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.senses()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.size()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.specialAbilities()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.actions()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.legendary_action()}
				</div>

				</div>
				:
				<></>}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
		dndInfo: state.dndInfo
	}
}

export default connect(mapStateToProps)(Monsters);