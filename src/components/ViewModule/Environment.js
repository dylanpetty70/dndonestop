import React, { Component } from 'react';
import Container from './Container';
import { connect } from 'react-redux';
import {handlePlayerGrabModuleEnv} from '../../actions/modules';
import {withRouter} from 'react-router-dom';




class Environment extends Component {

	componentDidMount(){
		this.props.handlePlayerGrabModuleEnv(this.props.match.params.key);
    }

	render(){
		return(
			<div style={{width: '95vw', margin: '5px'}}>
            <div style={{position: 'flex', marginTop: '20px'}}>
				<Container snapToGridAfterDrop={true} />
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

export default withRouter(connect(mapStateToProps, {handlePlayerGrabModuleEnv})(Environment));