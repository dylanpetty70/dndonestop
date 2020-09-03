import React, {Component} from 'react';
import { connect } from 'react-redux';


class Classes extends Component {

	constructor(props){
		super(props);
		this.state = {data: this.props.dndInfo.generalInfo.specifics.classes[this.props.item]}
		this.proficiencies = this.proficiencies.bind(this);
		this.startingEquip = this.startingEquip.bind(this);
		this.spellcasting = this.spellcasting.bind(this);
		this.subclasses = this.subclasses.bind(this);
	}

	componentDidUpdate(prevProps) {
	  if(prevProps.item !== this.props.item) {
		this.setState({data: this.props.dndInfo.generalInfo.specifics.classes[this.props.item]});
	  }
	}

	proficiencies(){
		let temp = [];
		let list = [];

		temp.push(<h6 key={'prof'}>Proficiencies</h6>)
		if(this.state.data.proficiencies){
			list = [];
			temp.push(<em key='equipp'>Equipment</em>)
			for(let i = 0; i < this.state.data.proficiencies.length; i++){
				list.push(this.state.data.proficiencies[i].name)
			}
			temp.push(<p key='profp'>{list.join(", ")}<br/></p>);
		}
		if(this.state.data.proficiencies){
			temp.push(<em key='savp'>Saving Throws</em>)
			list = [];
			for(let i = 0; i < this.state.data.saving_throws.length; i++){
				list.push(this.state.data.saving_throws[i].name)
			}
			temp.push(<p key='profs'>{list.join(", ")}<br/></p>);
		}

		if(this.state.data.proficiency_choices){
			temp.push(<h6 key={'profc'}>Proficiency Choices</h6>)
			for(let i = 0; i < this.state.data.proficiency_choices.length; i++){
				list = [];
				temp.push(<em key={'choosep'+i}>Choose {this.state.data.proficiency_choices[i].choose}</em>)
				for(let j = 0; j < this.state.data.proficiency_choices[i].from.length; j++){
					list.push(this.state.data.proficiency_choices[i].from[j].name.replace('Skill: ',''))
				}
				temp.push(<p key={'profcp'+i}>{list.join(", ")}<br/></p>);
			}		
		}


		return temp;
	}

	startingEquip(){
		let temp = [];
		let list = [];
		if(this.state.data.starting_equipment){
			let info = this.props.dndInfo.generalInfo.specifics[`starting-equipment`][this.props.item.toLowerCase()];
			temp.push(<h6 key={'starte'}>Starting Equipment</h6>)
			temp.push(<em key={'startee'}>Starting Equipment</em>)
			if(info.starting_equipment){
				list = [];
				for(let i = 0; i < info.starting_equipment.length; i++){
					list.push(info.starting_equipment[i].quantity + ' ' + info.starting_equipment[i].equipment.name)
				}
				temp.push(<p key={'startep'}>{list.join(', ')}</p>)
			}
			temp.push(<em key={'starteo'}>Options<br/></em>)
			for(let i = 0; i < info.starting_equipment_options.length; i++){
				temp.push(<em key={'choosep'+i}>Choose {info.starting_equipment_options[i].choose}</em>)
				list = [];
				for(let j = 0; j < info.starting_equipment_options[i].from.length; j++){
					if(info.starting_equipment_options[i].from[j].equipment){
						let quantity = (info.starting_equipment_options[i].from[j].quantity) ? info.starting_equipment_options[i].from[j].quantity : '';
						let name = (info.starting_equipment_options[i].from[j].equipment.name) ? info.starting_equipment_options[i].from[j].equipment.name : '';
						list.push(quantity+ ' ' +name)
					}
				}
				temp.push(<p key={'starteop'+i}>{list.join(', ')}</p>)
			}
		}
		return temp;
	}

	spellcasting(){
		let temp = [];
		if(this.state.data.spellcasting){
			let info = this.props.dndInfo.generalInfo.specifics.spellcasting[this.props.item.toLowerCase()];
			temp.push(<h6 key={'spellc'}>{'Spellcasting '+ info.spellcasting_ability.name}</h6>)
			for(let i = 0; i < info.info.length; i++){
				temp.push(<em key={'spellc'+i}>{info.info[i].name}</em>)
				for(let j = 0; j < info.info[i].desc.length; j++){
					temp.push(<p key={'spellcp'+i+j}>{info.info[i].desc[j]}</p>)
				}
			}
		}
		return temp;
	}

	subclasses(){
		let temp = [];
		if(this.state.data.subclasses){
			temp.push(<h6 key={'subclass'}>Subclasses</h6>)
			for(let i = 0; i < this.state.data.subclasses.length; i++){
				let name = this.state.data.subclasses[i].name;
				temp.push(<em key={'subcl'+i}>{name}</em>)
				temp.push(<p key={'subclex'+i}>{this.props.dndInfo.generalInfo.specifics.subclasses[name].desc.join(' ')}</p>)
			}
		}
		return temp;
	}

	render(){
		return(
			<div>
				{(Object.keys(this.props.dndInfo.generalInfo.specifics.classes).includes(this.props.item) & this.state.data !== undefined) ?
				<div>
				<h6>Hit Die</h6>
				<p>d{this.state.data.hit_die}<br/></p>
				
				{this.proficiencies()}

				{this.startingEquip()}
				
				{this.subclasses()}

				{(Object.keys(this.props.dndInfo.generalInfo.specifics.spellcasting).includes(this.props.item.toLowerCase())) ? this.spellcasting() : <></>}
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

export default connect(mapStateToProps)(Classes);