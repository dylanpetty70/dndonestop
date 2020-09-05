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

		for(let i = this.props.draggable.scale; i < totalWidth; i += this.props.draggable.scale){
			let variableLeft = String(i + 11 - this.props.draggable.scale) + 'px';
			const styleBottom ={
				position: 'absolute',
				width: this.props.draggable.scale,
				height: '80vh',
				border: (this.props.envOptions.options) ? (this.props.envOptions.options.color === 'none') ? '0' : '1px solid' : '1px solid',
				borderColor: (this.props.envOptions.options) ? this.props.envOptions.options.color : 'black',
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

		for(let i = this.props.draggable.scale; i < totalHeight; i += this.props.draggable.scale){
			let variableTop = String(i + 156 - this.props.draggable.scale) + 'px';
			const styleTop ={
				position: 'absolute',
				width: '98vw',
				height: this.props.draggable.scale,
				border: (this.props.envOptions.options) ? (this.props.envOptions.options.color === 'none') ? '0' : '1px solid' : '1px solid',
				borderColor: (this.props.envOptions.options) ? this.props.envOptions.options.color : 'black',
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