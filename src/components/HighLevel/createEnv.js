import React, {Component} from 'react';
import Environment from '../Dragable/Environment';
import { connect } from 'react-redux';
import PulseLoader from 'react-spinners/PulseLoader';
import {handleGrabDraggable, handleGrabOptions} from '../../actions/draggable';
var firebase = require('firebase/app');
require('firebase/auth')


class CreateEnv extends Component {

	constructor(props){
		super(props);
        this.state = {status: false};
	}

	componentDidMount(){
        setTimeout(() => {
        if (firebase.auth().currentUser) {
            this.props.handleGrabOptions();
            setTimeout(() => {
                if(this.props.draggable.options.length < 1){
                    this.props.handleGrabDraggable(this.props.draggable.options[0]);
                }
            }, 500)
        this.setState({...this.state, status: true});
        } else {
        this.setState({...this.state, status: false});
        }
		}, 1000)
	}

	render(){
		return(
            <div>
                {(this.state.status) ?
				    <Environment/> :
                    <PulseLoader
                      css={{display: 'block', margin: '0 auto', borderColor: 'red'}}
                      size={150}
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
		dndInfo: state.dndInfo,
        envOptions: state.envOptions,
        draggable: state.draggable
	}
}

export default connect(mapStateToProps, {handleGrabDraggable, handleGrabOptions})(CreateEnv);