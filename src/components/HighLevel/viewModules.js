import React, {Component} from 'react';
import Environment from '../ViewModule/Environment';
import { connect } from 'react-redux';
import PulseLoader from 'react-spinners/PulseLoader';
import {handleGrabDraggableItems} from '../../actions/draggable';
import {withRouter} from 'react-router-dom';


class CreateEnv extends Component {

	constructor(props){
		super(props);
        this.state = {status: false};
	}

	componentDidMount(){
        if(Object.keys(this.props.draggableItems).length < 1){
            this.props.handleGrabDraggableItems();
            this.setState({status: true})
        } else {
            this.setState({status: true})
        }
	}

	render(){
		return(
            <div>
                {(this.state.status) ?
				    <Environment/> :
                    <PulseLoader
                      css={{position: 'absolute', top: '40vh', left: '40vw'}}
                      size={100}
                      color={"#123abc"}
                      loading={true}
                    />
                }
                
            </div>
		)
	}
}
const mapStateToProps = state => {
	return{
        draggableItems: state.draggableItems
	}
}

export default withRouter(connect(mapStateToProps, {handleGrabDraggableItems})(CreateEnv));