import React, {Component} from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';


class LevelUp extends Component {

	constructor(props){
		super(props);
		this.state = {data: this.props.dndInfo.generalInfo.specifics['level-up'][this.props.item]};
		this.all = this.all.bind(this);
		this.separate = this.separate.bind(this);
		this.formatString = this.formatString.bind(this);
	}

	componentDidUpdate(prevProps) {
	  if(prevProps.item !== this.props.item) {
		this.setState({data: this.props.dndInfo.generalInfo.specifics['level-up'][this.props.item]});
	  }
	}

	formatString(string){
		let temp = string.split("_");
		for (let i = 0; i < temp.length; i++) {
			temp[i] = temp[i][0].toUpperCase() + temp[i].substr(1);
		}
		temp = temp.join(" ");
		return temp
	}

	separate(data){
		let temp = [];
		for(let i = 0; i < data.length; i++){
			if(data[i]['subclass']){
					temp.push(<h5 key={'acasasds' + i + data[0].class.index + data[0].level}>Subclass</h5>)
					temp.push(<p key={'acasdsp' + i + data[0].class.index + data[0].level}>{this.formatString(data[i]['subclass'].name)}</p>)
			}
			if(data[i]['ability_score_bonuses']){
				temp.push(<h6 key={'as' + i + data[0].class.index + data[0].level}>Ability Score Bonuses</h6>)
				temp.push(<p key={'asp' + i + data[0].class.index + data[0].level}>{data[i]['ability_score_bonuses']}</p>)
			}
			if(data[i]['class_specific']){
				temp.push(<h6 key={'cs' + i + data[0].class.index + data[0].level}>Class Specific Information</h6>)
				for(var keys in data[i]['class_specific']){
					temp.push(<em key={'cse' + i + data[0].class.index + data[0].level + keys}>{this.formatString(keys)}</em>)
					temp.push(<p key={'csef' + i + data[0].class.index + data[0].level + keys}>{data[i]['class_specific'][keys]}</p>)
				}
			}
			if(data[i]['feature_choices']){
				temp.push(<h6 key={'cf' + i + data[0].class.index + data[0].level}>Feature Choices</h6>)
				for(let j = 0; j < data[i]['feature_choices'].length; j++){
					temp.push(<p key={'cffe' + i + data[0].class.index + data[0].level + keys}>{this.formatString(data[i]['feature_choices'][j].name)}</p>)
				}
			}
			if(data[i]['features']){
				temp.push(<h6 key={'cfd' + i + data[0].class.index + data[0].level}>Feature Choices</h6>)
				for(let j = 0; j < data[i]['features'].length; j++){
					temp.push(<p key={'cfffdde' + i + j + data[0].class.index + data[0].level + keys}>{this.formatString(data[i]['features'][j].name)}</p>)
				}
			}
			if(data[i]['prof_bonus']){
				temp.push(<h6 key={'cffdd' + i + data[0].class.index + data[0].level}>Proficiency Bonus</h6>)
					temp.push(<p key={'cfffdde' + i + data[0].class.index + data[0].level + keys}>{data[i]['prof_bonus']}</p>)
			}
			if(data[i]['spellcasting']){
				temp.push(<h6 key={'cffds' + i + data[0].class.index + data[0].level}>Spellcasting</h6>)
				for(var keys1 in data[i]['spellcasting']){
					temp.push(<em key={'cdfdse' + i + data[0].class.index + data[0].level + keys1}>{this.formatString(keys1)}</em>)
					temp.push(<p key={'csefdfdf' + i + data[0].class.index + data[0].level + keys1}>{data[i]['spellcasting'][keys1]}</p>)
				}
			}
			if(data[i]['subclass_specific']){
				temp.push(<h6 key={'cfffdads' + i + data[0].class.index + data[0].level}>Subclass Specific</h6>)
				for(var keys2 in data[i]['subclass_specific']){
					temp.push(<em key={'cdffdadse' + i + data[0].class.index + data[0].level + keys2}>{this.formatString(keys2)}</em>)
					temp.push(<p key={'csefdfdafdf' + i + data[0].class.index + data[0].level + keys2}>{data[i]['subclass_specific'][keys2]}</p>)
				}
			}
		}

		return(
			<Card key={data[0].length + data[0].class.index + data[0].level} body>
				<h4 style={{textAlign: 'center'}}>{data[0].level}</h4>
				{temp}
			</Card>
		)
	}

	all(){
		let data = this.state.data.sort((a,b) => {return a.level - b.level});
		let temp = [];
		let holder = [];
		for(let i = 0; i < 21; i++){
			holder = [];
			for(let j = 0; j < data.length; j++){
				if(data[j].level === i){
					holder.push(data[j]);
				}
			}
			if(holder.length > 0){
				temp.push(
					this.separate(holder)
				)
			}
		}
		return temp;
	}

	render(){
		return(
			<div>
				{(Object.keys(this.props.dndInfo.generalInfo.specifics['level-up']).includes(this.props.item) & this.state.data !== undefined) ?
				<div>

				{(this.state.data.type) ? <><h6 key={'fc'}>Type</h6><p key={'fcp'}>{this.state.data.type}</p></> : <></>}
				
				{this.all()}

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

export default connect(mapStateToProps)(LevelUp);