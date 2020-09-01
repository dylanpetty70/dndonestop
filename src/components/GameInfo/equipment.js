import React, {Component} from 'react';
import { connect } from 'react-redux';


class Equipment extends Component {

	constructor(props){
		super(props);
		this.state = {data: this.props.dndInfo.generalInfo.specifics.equipment[this.props.item]};
		this.description = this.description.bind(this);
		this.cost = this.cost.bind(this);
		this.weight = this.weight.bind(this);
		this.speed = this.speed.bind(this);
		this.armorClass = this.armorClass.bind(this);
		this.damage = this.damage.bind(this);
		this.range = this.range.bind(this);
		this.throwRange = this.throwRange.bind(this);
		this.properties = this.properties.bind(this);
		this.twoHandDamage = this.twoHandDamage.bind(this);
	}

	componentDidUpdate(prevProps) {
	  if(prevProps.item !== this.props.item) {
		this.setState({data: this.props.dndInfo.generalInfo.specifics.equipment[this.props.item]});
	  }
	}

	description(){
		let temp = [];
		if(this.state.data.desc){
			temp.push(<h6 key={'desc'}>Description</h6>)
			for(let i = 0; i < this.state.data.desc.length; i++){
				temp.push(<p key={'desc'+i}>{this.state.data.desc[i].replace('- ', '')}</p>)
			}
		}
		return temp;
	}

	cost(){
		let temp = [];
		if(this.state.data.cost){
			temp.push(<h6 key={'cost'}>Cost</h6>)
			temp.push(<p key={'costp'}>{this.state.data.cost.quantity + ' ' + this.state.data.cost.unit}</p>)
		}
		return temp;
	}

	speed(){
		let temp = [];
		if(this.state.data.speed){
			temp.push(<h6 key={'sp'}>Speed</h6>)
			temp.push(<p key={'spp'}>{this.state.data.speed.quantity + ' ' + this.state.data.speed.unit}</p>)
		}
		return temp;
	}

	weight(){
		let temp = [];
		if(this.state.data.weight){
			temp.push(<h6 key={'we'}>Weight</h6>)
			temp.push(<p key={'wep'}>{this.state.data.weight}</p>)
		}
		return temp;
	}

	armorClass(){
		let temp = [];
		if(this.state.data.armor_class){
			temp.push(<h6 key={'ac'}>Armor Class</h6>)
			if(this.state.data.armor_class.base){
				temp.push(<p key={'arb'}>Base: {this.state.data.armor_class.base}</p>)
			}
			if(String(this.state.data.armor_class.dex_bonus)){
				temp.push(<p key={'arbd'}>Dex Bonus: {String(this.state.data.armor_class.dex_bonus)}</p>)
			}
			if(this.state.data.armor_class.max_bonus){
				temp.push(<p key={'arbb'}>Max Bonus: {String(this.state.data.armor_class.max_bonus)}</p>)
			}
		}
		return temp;
	}

	damage(){
		let temp = [];
		if(this.state.data.damage){
			temp.push(<h6 key={'d'}>Damage</h6>)
			temp.push(<em key={'dd'}>Damage Dice</em>)
			temp.push(<p key={'ddp'}>{this.state.data.damage.damage_dice}</p>)
			temp.push(<em key={'dt'}>Damage Type</em>)
			temp.push(<p key={'dtp'}>{this.state.data.damage.damage_type.name}</p>)
		}
		return temp;
	}

	range(){
		let temp = [];
		if(this.state.data.range){
			temp.push(<h6 key={'r'}>Range</h6>)
			if(this.state.data.range.normal){
				temp.push(<em key={'rn'}>Normal</em>)
				temp.push(<p key={'rnp'}>{this.state.data.range.normal}</p>)
			}
			if(this.state.data.range.long){
				temp.push(<em key={'rnd'}>Long</em>)
				temp.push(<p key={'rnpd'}>{this.state.data.range.long}</p>)
			}
		}
		return temp;
	}

	throwRange(){
		let temp = [];
		if(this.state.data.throw_range){
			temp.push(<h6 key={'d'}>Throw Range</h6>)
			if(this.state.data.throw_range.long){
				temp.push(<em key={'dd'}>Long</em>)
				temp.push(<p key={'ddp'}>{this.state.data.throw_range.long}</p>)
			}
			if(this.state.data.throw_range.long){
				temp.push(<em key={'dt'}>Normal</em>)
				temp.push(<p key={'dtp'}>{this.state.data.throw_range.normal}</p>)
			}
		}
		return temp;
	}

	properties(){
		let temp = [];
		if(this.state.data.properties){
			temp.push(<h6 key={'pro'}>Properties</h6>)
			let list = [];
			for(let i = 0; i < this.state.data.properties.length; i++){
				list.push(this.state.data.properties[i].name)
			}
			temp.push(<p key={'prop'}>{list.join(', ')}</p>);
		}
		return temp;
	}

	twoHandDamage(){
		let temp = [];
		if(this.state.data[`2h_damage`]){
			temp.push(<h6 key={'d'}>Two Handed Damage</h6>)
			temp.push(<em key={'dd'}>Damage Dice</em>)
			temp.push(<p key={'ddp'}>{this.state.data[`2h_damage`].damage_dice}</p>)
			temp.push(<em key={'dt'}>Damage Type</em>)
			temp.push(<p key={'dtp'}>{this.state.data[`2h_damage`].damage_type.name}</p>)
		}
		return temp;
	}

	render(){
		return(
			<div>
				{(Object.keys(this.props.dndInfo.generalInfo.specifics.equipment).includes(this.props.item) & this.state.data !== undefined) ?
				<div>
				
				{this.description()}

				{this.twoHandDamage()}

				{this.damage()}

				{this.range()}

				{this.throwRange()}

				{this.properties()}

				{this.cost()}

				{this.weight()}

				{this.speed()}

				{this.armorClass()}

				{(this.state.data.stealth_disadvantage) ? <><h6 key={'sd'}>Stealth Disadvantage</h6><p key={'sdp'}>{String(this.state.data.stealth_disadvantage)}</p></> : <></>}



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

export default connect(mapStateToProps)(Equipment);