import React, {Component} from 'react';
import { connect } from 'react-redux';


class Languages extends Component {

	constructor(props){
		super(props);
		this.state = {data: this.props.dndInfo.generalInfo.specifics.languages[this.props.item]};
		this.description = this.description.bind(this);
	}

	componentDidUpdate(prevProps) {
	  if(prevProps.item !== this.props.item) {
		this.setState({data: this.props.dndInfo.generalInfo.specifics.languages[this.props.item]});
	  }
	}

	description(){
		let temp = [];
		if(this.state.data.desc){
			temp.push(<h6 key={'desc'}>Description</h6>)
			temp.push(<p key={'descp'}>{this.state.data.desc}</p>)
		}
		return temp;
	}

	render(){
		return(
			<div>
				{(Object.keys(this.props.dndInfo.generalInfo.specifics.languages).includes(this.props.item) & this.state.data !== undefined) ?
				<div>

				{(this.state.data.type) ? <><h6 key={'fc'}>Type</h6><p key={'fcp'}>{this.state.data.type}</p></> : <></>}
				
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

export default connect(mapStateToProps)(Languages);