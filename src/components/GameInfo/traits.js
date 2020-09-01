import React, {Component} from 'react';
import { connect } from 'react-redux';


class Traits extends Component {

	constructor(props){
		super(props);
		this.state = {data: this.props.dndInfo.generalInfo.specifics.traits[this.props.item]};
		this.description = this.description.bind(this);
		this.subraces = this.subraces.bind(this);
		this.races = this.races.bind(this);
	}

	componentDidUpdate(prevProps) {
	  if(prevProps.item !== this.props.item) {
		this.setState({data: this.props.dndInfo.generalInfo.specifics.traits[this.props.item]});
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

	races(){
		let temp = [];
		let list = [];
		if(this.state.data.races){
			temp.push(<h6 key={'t'}>Races</h6>)
			list = [];
			for(let i = 0; i < this.state.data.races.length; i++){
				list.push(this.state.data.races[i].name);
			}
			temp.push(<p key={'tp'}>{list.join(', ')}<br/></p>);
		}
		return temp;
	}

	render(){
		return(
			<div>
				{(Object.keys(this.props.dndInfo.generalInfo.specifics.traits).includes(this.props.item) & this.state.data !== undefined) ?
				<div>
				
				{this.description()}

				{this.races()}

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

export default connect(mapStateToProps)(Traits);