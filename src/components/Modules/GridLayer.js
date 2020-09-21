import React, { Component } from 'react';
import { connect } from 'react-redux';




class GridLayer extends Component {

	constructor(props){
		super(props);
		this.state = {}
		this.createGrid = this.createGrid.bind(this);
	}

	createGrid(){
		let totalWidth = 780;
		let totalHeight = 780;
		let temp = [];
		let scale = this.props.module.environment.scale + 'px';
		temp.push(
			<div key='background' style={{backgroundColor: this.props.envOptions.background, position: 'fixed', width: '1890px', height: '780px', left: '11px', top: '176px'}}>
			</div>
		)
		for(let i = Number(this.props.module.environment.scale); i < totalWidth; i += Number(this.props.module.environment.scale)){
			let variableLeft = String(i + 15 - Number(this.props.module.environment.scale)) + 'px';
			const styleBottom ={
				position: 'absolute',
				width: scale,
				height: '780px',
				border: (this.props.envOptions.color === 'none') ? '0' : '1px solid',
				borderColor: (this.props.envOptions.color) ? this.props.envOptions.color : 'black',
				left: variableLeft,
				top: '176px',
				opacity: .25,
				zIndex: 1000,
				pointerEvents: 'none'
			}

			let bottomKey = i + 'Bottom';

			temp.push(
			<div key={bottomKey} style={styleBottom}>
			</div>
			)
		}
		for(let i = Number(this.props.module.environment.scale); i < totalHeight; i += Number(this.props.module.environment.scale)){
			let variableTop = String(i + 176 - Number(this.props.module.environment.scale)) + 'px';
			const styleTop ={
				position: 'absolute',
				width: '780px',
				height: scale,
				border: (this.props.envOptions.color === 'none') ? '0' : '1px solid',
				borderColor: (this.props.envOptions.color) ? this.props.envOptions.color : 'black',
				left: '15px',
				top: variableTop,
				opacity: .25,
				zIndex: 1000,
				pointerEvents: 'none'
			}

			let topKey = i + 'Top';

			temp.push(
			<div key={topKey} style={styleTop}>
			</div>
			)

		}
		return temp;
	}

	render(){
		return(
			<div>
				{this.createGrid()}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
        module: state.module,
		envOptions: state.envOptions,
    draggableItems: state.draggableItems
	}
}

export default connect(mapStateToProps)(GridLayer);