import React, {Component} from 'react';
import { connect } from 'react-redux';


class Races extends Component {

	constructor(props){
		super(props);
		this.state = {data: this.props.dndInfo.generalInfo.specifics.races[this.props.item]};
		this.description = this.description.bind(this);
		this.abilityBonuses = this.abilityBonuses.bind(this);
		this.languages = this.languages.bind(this);
		this.traits = this.traits.bind(this);
		this.proficiencies = this.proficiencies.bind(this);
		this.subraces = this.subraces.bind(this);
	}

	componentDidUpdate(prevProps) {
	  if(prevProps.item !== this.props.item) {
		this.setState({data: this.props.dndInfo.generalInfo.specifics.races[this.props.item]});
	  }
	}

	description(){
		let temp = [];
		if(this.state.data){
			temp.push(<h6 key={'desc'}>Description</h6>)
			temp.push(<em key={'a'}>Age</em>)
			temp.push(<p key={'ap'}>{this.state.data.age}</p>)
			temp.push(<em key={'asd'}>Alignment</em>)
			temp.push(<p key={'apsd'}>{this.state.data.alignment}</p>)
			temp.push(<em key={'al'}>Language Description</em>)
			temp.push(<p key={'alp'}>{this.state.data.language_desc}</p>)
			temp.push(<em key={'as'}>Size</em>)
			temp.push(<p key={'asp'}>{this.state.data.size}</p>)
			temp.push(<em key={'asd'}>Size Description</em>)
			temp.push(<p key={'asdp'}>{this.state.data.size_description}<br/></p>)
			temp.push(<h6 key={'ass'}>Speed</h6>)
			temp.push(<p key={'assp'}>{this.state.data.speed}</p>)
		}
		return temp;
	}

	abilityBonuses(){
		let temp = [];
		if(this.state.data.ability_bonuses){
			temp.push(<h6 key={'ab'}>Ability Bonuses</h6>)
			for(let i = 0; i < this.state.data.ability_bonuses.length; i++){
				temp.push(<p key={'abp'+i}>Bonus {this.state.data.ability_bonuses[i].bonus} to {this.state.data.ability_bonuses[i].name}</p>)
			}
		}
		return temp;
	}

	languages(){
		let temp = [];
		if(this.state.data.languages){
			temp.push(<h6 key={'l'}>Languages</h6>)
			let list = [];
			for(let i = 0; i < this.state.data.languages.length; i++){
				list.push(this.state.data.languages[i].name)
			}
			temp.push(<p key={'lp'}>{list.join(', ')}</p>)
		}
		return temp;
	}

	traits(){
		let temp = [];
		let list = [];
		if(this.state.data.traits){
			temp.push(<h6 key={'t'}>Traits</h6>)
			list = [];
			for(let i = 0; i < this.state.data.traits.length; i++){
				list.push(this.state.data.traits[i].name);
			}
			temp.push(<p key={'tp'}>{list.join(', ')}<br/></p>);
		}
		if(this.state.data.traits_options){
			temp.push(<h6 key={'to'}>Trait Options</h6>);
			temp.push(<em key={'toe'}>Choose {this.state.data.trait_options.choose}</em>);
			list = [];
			for(let i = 0; i < this.state.data.trait_options.from.length; i++){
				list.push(this.state.data.trait_options[i].from.name)
			}
			temp.push(<p key={'top'}>{list.join(', ')}</p>);
		}
		return temp;
	}

	proficiencies(){
		let temp = [];
		let list = [];

		if(this.state.data.starting_proficiencies){
			temp.push(<h6 key={'prof'}>Proficiencies</h6>)
			list = [];
			for(let i = 0; i < this.state.data.starting_proficiencies.length; i++){
				list.push(this.state.data.starting_proficiencies[i].name)
			}
			temp.push(<p key='profp'>{list.join(", ")}<br/></p>);
		}

		if(this.state.data.starting_proficiency_options){
			temp.push(<h6 key={'profc'}>Proficiency Options</h6>)
				list = [];
				temp.push(<em key={'choosep'}>Choose {this.state.data.starting_proficiency_options.choose}</em>)
				for(let j = 0; j < this.state.data.starting_proficiency_options.from.length; j++){
					list.push(this.state.data.starting_proficiency_options.from[j].name)
				}
				temp.push(<p key={'profcp'}>{list.join(", ")}<br/></p>);
		}


		return temp;
	}

	subraces(){
		let temp = [];
		let list = [];
		if(this.state.data.subraces){
			temp.push(<h6 key={'t'}>Subraces</h6>)
			list = [];
			for(let i = 0; i < this.state.data.subraces.length; i++){
				list.push(this.state.data.subraces[i].name);
			}
			temp.push(<p key={'tp'}>{list.join(', ')}<br/></p>);
		}
		return temp;
	}

	render(){
		return(
			<div>
				{(Object.keys(this.props.dndInfo.generalInfo.specifics.races).includes(this.props.item) & this.state.data !== undefined) ?
				<div>

				{this.abilityBonuses()}
				
				{this.description()}

				{this.traits()}

				{this.proficiencies()}

				{this.subraces()}

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

export default connect(mapStateToProps)(Races);