import React, {Component} from 'react';
import { connect } from 'react-redux';


class Spells extends Component {

	constructor(props){
		super(props);
		this.state = {data: this.props.dndInfo.generalInfo.specifics.spells[this.props.item]};
		this.description = this.description.bind(this);
		this.level = this.level.bind(this);
		this.school =this.school.bind(this);
		this.castingTime = this.castingTime.bind(this);
		this.attackType = this.attackType.bind(this);
		this.areaOfAttack = this.areaOfAttack.bind(this);
		this.range = this.range.bind(this);
		this.duration = this.duration.bind(this);
		this.concentration = this.concentration.bind(this);
		this.components = this.components.bind(this);
		this.materials = this.materials.bind(this);
		this.classes = this.classes.bind(this);
		this.damage = this.damage.bind(this);
		this.heal = this.heal.bind(this);
		this.ritual = this.ritual.bind(this);
		this.dc = this.dc.bind(this);
		this.description = this.description.bind(this);
		this.higherLevel = this.higherLevel.bind(this);
		this.areaOfEffect = this.areaOfEffect.bind(this);
	}

	componentDidUpdate(prevProps) {
	  if(prevProps.item !== this.props.item) {
		this.setState({data: this.props.dndInfo.generalInfo.specifics.spells[this.props.item]});
	  }
	}

	description(){
		let temp = [];
		if(this.state.data.desc){
			temp.push(<h6 key={'desc'}>Description</h6>)
			for(let i = 0; i < this.state.data.desc.length; i++){
				temp.push(<p key={'desc'+i}>{this.state.data.desc[i]}<br/></p>)
			}
		}
		return temp;
	}

	level(){
		let temp = [];
		if(this.state.data.level){
			let level = 0;
			if(this.state.data.level === 0){
				level = 'Cantrip';
			} else {
				level = this.state.data.level;
			}
			temp.push(<h6 key={'l'}>Level</h6>)
			temp.push(<p key={'lp'}>{level}</p>)
		}
		return temp;
	}

	school(){
		let temp = [];
		if(this.state.data.school){
			temp.push(<h6 key={'ssc'}>School</h6>)
			temp.push(<p key={'sscp'}>{this.state.data.school.name}<br/></p>)
		}
		return temp;
	}

	castingTime(){
		let temp = [];
		if(this.state.data.casting_time){
			temp.push(<h6 key={'ct'}>Casting Time</h6>)
			temp.push(<p key={'ctp'}>{this.state.data.casting_time}<br/></p>)
		}
		return temp;
	}

	attackType(){
		let temp = [];
		if(this.state.data.attack_type){
			temp.push(<h6 key={'at'}>Attack Type</h6>)
			temp.push(<p key={'atp'}>{this.state.data.attack_type}<br/></p>)
		}
		return temp;
	}

	areaOfEffect(){
		let temp = [];
		if(this.state.data.area_of_effect){
			temp.push(<h6 key={'ae'}>Area of Effect</h6>)
			temp.push(<p key={'aep1'}>Size: {this.state.data.area_of_effect.size}<br/></p>)
			temp.push(<p key={'aep2'}>Type: {this.state.data.area_of_effect.type}<br/></p>)
		}
		return temp;
	}

	areaOfAttack(){
		let temp = [];
		if(this.state.data.area_of_attack){
			temp.push(<h6 key={'ae'}>Area of Attack</h6>)
			temp.push(<p key={'aep1'}>Size: {this.state.data.area_of_attack.size}<br/></p>)
			temp.push(<p key={'aep2'}>Type: {this.state.data.area_of_attack.type}<br/></p>)
		}
		return temp;
	}

	range(){
		let temp = [];
		if(this.state.data.range){
			temp.push(<h6 key={'r'}>Range</h6>)
			temp.push(<p key={'rp'}>{this.state.data.range}<br/></p>)
		}
		return temp;
	}

	duration(){
		let temp = [];
		if(this.state.data.duration){
			temp.push(<h6 key={'d'}>Duration</h6>)
			temp.push(<p key={'dp'}>{this.state.data.duration}<br/></p>)
		}
		return temp;
	}

	concentration(){
		let temp = [];
		if(String(this.state.data.concentration)){
			temp.push(<h6 key={'cd'}>Concentration</h6>)
			temp.push(<p key={'cdp'}>{String(this.state.data.concentration)}<br/></p>)
		}
		return temp;
	}

	components(){
		let temp = [];
		if(this.state.data.components){
			temp.push(<h6 key={'c'}>Components</h6>)
			temp.push(<p key={'cp'}>{this.state.data.components.join(', ')}<br/></p>)
		}
		return temp;
	}

	materials(){
		let temp = [];
		if(this.state.data.material){
			temp.push(<h6 key={'m'}>Material Needed</h6>)
			temp.push(<p key={'mp'}>{this.state.data.material}<br/></p>)
		}
		return temp;
	}

	classes(){
		let temp = [];
		if(this.state.data.classes){
			temp.push(<h6 key={'ce'}>Classes</h6>)
			let list = [];
			for(let i = 0; i < this.state.data.classes.length; i++){
				list.push(this.state.data.classes[i].name);
			}
			temp.push(<p key={'ced'}>{list.join(', ')}<br/></p>)
		}
		return temp;
	}

	damage(){
		let temp = [];
		if(this.state.data.damage){
			temp.push(<h6 key={'ded'}>Damage</h6>)
			if(this.state.data.damage.damage_at_slot_level){
				temp.push(<em key={'dede'}>Damage by Slot Level</em>)
				for(let i = 0; i < this.state.data.damage.damage_at_slot_level.length; i++){
					if(this.state.data.damage.damage_at_slot_level[i] !== null)
					temp.push(<p key={'dedef'+i}>Spell Slot Level {i}: {this.state.data.damage.damage_at_slot_level[i]}</p>)
				}
			}
			if(this.state.data.damage.damage_type){
				temp.push(<em key={'dedeeee'}>Damage Type</em>)
				temp.push(<p key={'dedeef'}>{this.state.data.damage.damage_type.name}<br/></p>)
			}
		}
		return temp;
	}

	heal(){
		let temp = [];
		if(this.state.data.heal_at_slot_level){
			temp.push(<h6 key={'ded'}>Heal by Slot Level</h6>)
			for(let i = 0; i < this.state.data.heal_at_slot_level.length; i++){
				if(this.state.data.heal_at_slot_level[i] !== null)
				temp.push(<p key={'ded'+i}>Spell Slot Level {i}: {this.state.data.heal_at_slot_level[i]}</p>)
			}
		}
		return temp;
	}

	ritual(){
		let temp = [];
		if(String(this.state.data.ritual)){
			temp.push(<h6 key={'rt'}>Cast as Ritual</h6>)
			temp.push(<p key={'rtp'}>{String(this.state.data.ritual)}<br/></p>)
		}
		return temp;
	}

	dc(){
		let temp = [];
		if(this.state.data.dc){
			temp.push(<h6 key={'dc'}>DC</h6>)
			if(this.state.data.dc.dc_type){
				temp.push(<em key={'dcd'}>DC Type</em>)
				temp.push(<p key={'dcdt'}>{this.state.data.dc.dc_type.name}<br/></p>)
			}
			if(this.state.data.dc.dc_success){
				temp.push(<em key={'dcdscs'}>If DC is Passed</em>)
				let dcSuccess = '';
				if(this.state.data.dc.dc_success === "half"){
					dcSuccess = 'Take half damage';
				} else if(this.state.data.dc.dc_success === "none"){
					dcSuccess = 'Spell has no effect';
				} else {
					dcSuccess = this.state.data.dc.dc_success;
				}
				temp.push(<p key={'dedeeff'}>{dcSuccess}<br/></p>)
			}
		}
		return temp;
	}

	higherLevel(){
		let temp = [];
		if(this.state.data.higher_level){
			temp.push(<h6 key={'hli'}>Casing at Higher Levels</h6>)
			for(let i = 0; i < this.state.data.higher_level.length; i++){
				temp.push(<p key={'fdaf'+i}>{this.state.data.higher_level[i]}<br/></p>)
			}
		}
		return temp;
	}

	render(){
		return(
			<div>
				{(Object.keys(this.props.dndInfo.generalInfo.specifics.spells).includes(this.props.item) & this.state.data !== undefined) ?
				<div>

				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.level()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.school()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.castingTime()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.attackType()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.areaOfAttack()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.areaOfEffect()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.range()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.duration()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.concentration()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.components()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.materials()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.classes()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.damage()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.heal()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.ritual()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.dc()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.description()}
				</div>
				<div style={{float: 'left', marginLeft: '25px', marginRight: '24px', marginBottom: '15px', minHeight: '100px'}}>
				{this.higherLevel()}
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

export default connect(mapStateToProps)(Spells);