import React, {Component} from 'react';
import { connect } from 'react-redux';


class Conditions extends Component {

	constructor(props){
		super(props);
		this.state = {data: this.props.dndInfo.generalInfo.specifics.conditions[this.props.item]};
		this.description = this.description.bind(this);
	}

	componentDidUpdate(prevProps) {
	  if(prevProps.item !== this.props.item) {
		this.setState({data: this.props.dndInfo.generalInfo.specifics.conditions[this.props.item]});
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

	render(){
		return(
			<div>
				{(Object.keys(this.props.dndInfo.generalInfo.specifics.conditions).includes(this.props.item) & this.state.data !== undefined) ?
				<div>
				
				{this.description()}

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

export default connect(mapStateToProps)(Conditions);