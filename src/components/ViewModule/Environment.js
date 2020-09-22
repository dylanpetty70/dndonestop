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
            <div style={{position: 'flex', marginTop: '80px'}}>
				<h3 style={{position: 'absolute', left: '105px', top: '100px', width: '780px', textAlign: 'center'}}>{(this.props.module.envKey.length > 0) ? this.props.module.environment.name : "No Environment Currently Selected by DM"}</h3>
				<Container snapToGridAfterDrop={true} />
				<h3 style={{position: 'absolute', top: '105px', left: '1005px', width: '630px', textAlign: 'center'}}>{(this.props.module.currentMap.length > 0) ? this.props.module.maps[this.props.module.currentMap].name : "No Map Currently Selected by DM"}</h3>
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