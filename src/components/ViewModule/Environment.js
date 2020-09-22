import React, { Component } from 'react';
import Container from './Container';
import { connect } from 'react-redux';
import {handlePlayerGrabModuleEnv, handleGrabMaps} from '../../actions/modules';
import {withRouter} from 'react-router-dom';
import Map from './Map';




class Environment extends Component {

	componentDidMount(){
		this.props.handlePlayerGrabModuleEnv(this.props.match.params.key);
		this.props.handleGrabMaps(this.props.match.params.key);
    }

	render(){
		return(
			<div style={{width: '95vw', margin: '5px'}}>
            <div style={{position: 'flex', marginTop: '20px'}}>
				<Container snapToGridAfterDrop={true} />
			{(Object.keys(this.props.module.maps).length > 0) ? <Map /> : <></>}
            </div>
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

export default withRouter(connect(mapStateToProps, {handlePlayerGrabModuleEnv, handleGrabMaps})(Environment));