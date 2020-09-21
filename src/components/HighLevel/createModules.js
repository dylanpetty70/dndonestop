import React, {Component} from 'react';
import Environment from '../Modules/Environment';
import { connect } from 'react-redux';
import PulseLoader from 'react-spinners/PulseLoader';
import {handleGrabModuleOptions} from '../../actions/modules';
import {handleGrabDraggableItems} from '../../actions/draggable';
var firebase = require('firebase/app');
require('firebase/auth')


class CreateModules extends Component {

	constructor(props){
		super(props);
        this.state = {status: false};
	}

	componentDidMount(){
        setTimeout(() => {
        if (firebase.auth().currentUser) {
            this.props.handleGrabModuleOptions();
            this.setState({...this.state, status: true});
        } else {
            this.setState({...this.state, status: false});
        }
		}, 1000)
        if(Object.keys(this.props.draggableItems).length < 1){
            this.props.handleGrabDraggableItems();
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
		module: state.module,
        draggableItems: state.draggableItems
	}
}

export default connect(mapStateToProps, {handleGrabModuleOptions, handleGrabDraggableItems})(CreateModules);