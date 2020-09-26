import React, { Component } from 'react';
import Container from './Container';
import { connect } from 'react-redux';
import {handlePlayerGrabModuleEnv, handleGrabMaps} from '../../actions/modules';
import {withRouter} from 'react-router-dom';
import CustomPanel from './CustomPanel';
import Map from './Map';
import GridLayer from './GridLayer';
import DragLayer from './CustomDragLayer';
import PulseLoader from 'react-spinners/PulseLoader';




class Environment extends Component {

	componentDidMount(){
		this.props.handlePlayerGrabModuleEnv(this.props.match.params.key);
		this.props.handleGrabMaps(this.props.match.params.key);
    }

	render(){
		return(
		<div>
			{(this.props.module.envKey.length > 0) ? 
			<div style={{width: '95vw', margin: '5px'}}>
            <div style={{position: 'flex', marginTop: '80px'}}>
			<GridLayer />
				<Container snapToGridAfterDrop={true} />
				<DragLayer  snapToGridWhileDragging={true}/>
				{(Object.keys(this.props.module.maps).length > 0) ? <Map /> : <></>}
            </div>
				<CustomPanel/>
			</div>
			:
                    <PulseLoader
                      css={{position: 'absolute', top: '40vh', left: '40vw'}}
                      size={100}
                      color={"#123abc"}
                      loading={true}
                    />}
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