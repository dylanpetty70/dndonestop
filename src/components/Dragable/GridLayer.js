import React, { Component } from 'react';
import { connect } from 'react-redux';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

class GridLayer extends Component {

	constructor(props){
		super(props);
		this.state = {checked: true}
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
				border: '1px solid',
				borderColor: (this.state.checked) ? 'black' : 'white',
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
				border: '1px solid',
				borderColor: (this.state.checked) ? 'black' : 'white',
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
				<ButtonGroup toggle style={{position: 'absolute', top: '10px', width: '100px', left: '970px'}}>
					<ToggleButton
					  type="checkbox"
					  variant="secondary"
					  checked={this.state.checked}
					  value="true"
					  onChange={() => this.setState({...this.state, checked: !this.state.checked})}
					>
					  Grid Color
					</ToggleButton>
				  </ButtonGroup>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
        draggable: state.draggable
	}
}

export default connect(mapStateToProps)(GridLayer);