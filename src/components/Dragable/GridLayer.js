import React, { Component } from 'react';
import { connect } from 'react-redux';

class GridLayer extends Component {

	constructor(props){
		super(props);
		this.state = {}
		this.createGrid = this.createGrid.bind(this);
	}

	createGrid(){
		let totalWidth = .98 * document.documentElement.clientWidth;
		let totalHeight = .8 * document.documentElement.clientHeight;
		let temp = [];
		let scale = this.props.draggable.environment.scale + 'px';

		for(let i = Number(this.props.draggable.environment.scale); i < totalWidth; i += Number(this.props.draggable.environment.scale)){
			let variableLeft = String(i + 11 - Number(this.props.draggable.environment.scale)) + 'px';
			const styleBottom ={
				position: 'absolute',
				width: scale,
				height: '80vh',
				border: (this.props.envOptions.color === 'none') ? '0' : '1px solid',
				borderColor: (this.props.envOptions.color) ? this.props.envOptions.color : 'black',
				left: variableLeft,
				top: '156px',
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
		for(let i = Number(this.props.draggable.environment.scale); i < totalHeight; i += Number(this.props.draggable.environment.scale)){
			let variableTop = String(i + 156 - Number(this.props.draggable.environment.scale)) + 'px';
			const styleTop ={
				position: 'absolute',
				width: '98vw',
				height: scale,
				border: (this.props.envOptions.color === 'none') ? '0' : '1px solid',
				borderColor: (this.props.envOptions.color) ? this.props.envOptions.color : 'black',
				left: '11px',
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
        draggable: state.draggable,
		envOptions: state.envOptions,
    draggableItems: state.draggableItems
	}
}

export default connect(mapStateToProps)(GridLayer);