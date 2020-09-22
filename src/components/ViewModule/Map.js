import React, { Component } from 'react';
import { connect } from 'react-redux';
import {handleUpdateMaps, handleGrabMapCurrent, handleGrabMaps} from '../../actions/modules';
import {withRouter} from 'react-router-dom';

const styleMap = {
  border: '1px solid black',
  position: 'absolute',
  marginLeft: '1000px',
  backgroundColor: 'lightGrey',
  top: '245px'
}

const styleClicks = {
  height: '130px', 
  width: '630px',
  border: '1px solid black',
  position: 'absolute',
  margin: '5px',
  marginLeft: '1000px',
  backgroundColor: 'lightGrey',
  top: '90px',
  padding: '10px'
}

const styleBlock = [
	{
		backgroundColor: 'white', zIndex: '2'
	},
	{
		borderColor: '#dfe4e1', border: '1px solid', backgroundColor: 'white', boxShadow: '1px 1px 1px 1px grey', zIndex: '3'
	},
	{
		backgroundColor: '#afcef2'
	},
	{
		borderColor: '#dfe4e1', border: '1px solid', backgroundColor: 'white', boxShadow: '1px 1px 1px 1px grey', zIndex: '3', borderRadius: '25px'
	},
	{
		borderColor: '#dfe4e1', border: '1px solid', backgroundColor: 'white', boxShadow: '1px 1px 1px 1px grey', zIndex: '3', borderRadius: '.25em'
	},
	{
		borderColor: '#dfe4e1', border: '1px dotted', backgroundColor: 'white', boxShadow: '1px 1px 1px 1px grey', zIndex: '3'
	},
	{
		borderColor: '#dfe4e1', border: '1px', backgroundColor: 'white', boxShadow: '1px 1px 1px 1px grey', zIndex: '3', borderStyle: 'dashed solid'
	},
	{
		borderColor: '#dfe4e1', border: '1px', backgroundColor: 'white', boxShadow: '1px 1px 1px 1px grey', zIndex: '3', borderStyle: 'solid dashed'
	},
	{
		border: '5px solid rgba(255,255,255,1)', backgroundColor: 'red', borderRadius: '15px'
	}

]

class Map extends Component {

	constructor(props){
		super(props);
		this.state = {tempSelect: 0,}
		this.mapItems = this.mapItems.bind(this);
		this.changeItem = this.changeItem.bind(this);
	}

	componentDidMount(){
		this.props.handleGrabMapCurrent(this.props.match.params.key);
    }

	mapItems(){
		let temp = [];
		if(this.props.module.currentMap){
			if(this.props.module.maps[this.props.module.currentMap].items){
				if(this.props.module.maps[this.props.module.currentMap].items.length === this.props.module.maps[this.props.module.currentMap].scale){
					temp = this.props.module.maps[this.props.module.currentMap].items;
				} else if(this.props.module.maps[this.props.module.currentMap].items.length < this.props.module.maps[this.props.module.currentMap].scale){
					let scale = this.props.module.maps[this.props.module.currentMap].scale;
					let map = this.props.module.maps[this.props.module.currentMap].items;
					for(let i = 0; i < scale; i++){
						for(let j = 0; j < scale; j++){
							if(map[i]){
								if(map[i][j]){
									if(temp[i]){
										temp[i][j] = map[i][j];
									} else {
										temp[i] = [];
										temp[i][j] = 0;
									}
								} else {
									if(temp[i]){
										temp[i][j] = 0;
									} else {
										temp[i] = [];
										temp[i][j] = 0;
									}
								}
							} else {
								if(temp[i]){
									temp[i].push(0);
								} else {
									temp.push([]);
									temp[i].push(0);
								}
							}
						}
					}
				} else {
					let scale = this.props.module.maps[this.props.module.currentMap].scale;
					let map = this.props.module.maps[this.props.module.currentMap].items;
					for(let i = 0; i < scale; i++){
						for(let j = 0; j < scale; j++){
							if(temp[i]){
								temp[i][j] = map[i][j];
							} else {
								temp[i] = [];
								temp[i][j] = map[i][j];
							}
						}
					}
				}
			} else if(this.props.module.maps[this.props.module.currentMap].scale){
				let scale = this.props.module.maps[this.props.module.currentMap].scale;
				for(let i = 0; i < scale; i++){
					for(let j = 0; j < scale; j++){
						if(temp[i]){
							temp[i][j] = 0;
						} else {
							temp[i] = [];
							temp[i][j] = 0;
						}
					}
				}
			}
			if(temp !== this.props.module.maps[this.props.module.currentMap].items){
				let data = this.props.module.maps[this.props.module.currentMap];
				data['items'] = temp;
				this.props.handleUpdateMaps(this.props.match.params.key, this.props.module.currentMap, data)
			}
			//this is where the grid is rendered using temp
			let tempRender = [];
			let scale = this.props.module.maps[this.props.module.currentMap].scale;
			let tempWidth = String(Math.floor(630/this.props.module.maps[this.props.module.currentMap].scale)) + 'px';
			for(let i = 0; i < scale; i++){
				for(let j = 0; j < scale; j++){
					let left = j * Math.floor(630/this.props.module.maps[this.props.module.currentMap].scale);
					let top = i * Math.floor(630/this.props.module.maps[this.props.module.currentMap].scale);
					let style = styleBlock[temp[i][j]];
					tempRender.push(
						<div onClick={() => {this.changeItem(i, j)}} key={String(i)+String(j)+String(i*j)+String(j)} style={{width: tempWidth, height: tempWidth, left: left, top: top, position: 'absolute', ...style}}></div>
					)
				}
			}
			return tempRender;
		}
	}

	changeItem(i , j){
		let data = this.props.module.maps[this.props.module.currentMap];
		data['items'][i][j] = this.state.tempSelect;
		this.props.handleUpdateMaps(this.props.match.params.key, this.props.module.currentMap, data)
	}

	render(){
		let selection = String(this.state.tempSelect * 40 + 10) + 'px';
		let width = (this.props.module.currentMap) ?  Math.floor(630/this.props.module.maps[this.props.module.currentMap].scale) * this.props.module.maps[this.props.module.currentMap].scale + 2 : 630;
		return(
			<div>
				<div style={styleClicks}>
					<h4>Edit Map</h4>
					<p>Click the box you want to apply then the spot on the map to apply it.</p>
					<div style={{position: 'relative', left: selection, width: '20px', height: '2px', backgroundColor: 'green'}}>
					</div>
					<div style={{display: "inline-block"}}>
						<div style={{float: 'left', width: '20px', height: '20px', margin: '10px', backgroundColor: 'white'}} onClick={() => {this.setState({...this.state, tempSelect: 0})}}>
						</div>
						<div style={{float: 'left', width: '20px', height: '20px', margin: '10px', borderColor: 'black', border: '1px solid'}} onClick={() => {this.setState({...this.state, tempSelect: 1})}}>
						</div>
						<div style={{float: 'left', width: '20px', height: '20px', margin: '10px', backgroundColor: '#afcef2'}} onClick={() => {this.setState({...this.state, tempSelect: 2})}}>
						</div>
						<div style={{float: 'left', width: '20px', height: '20px', margin: '10px', borderColor: 'black', border: '1px solid', borderRadius: '15px'}} onClick={() => {this.setState({...this.state, tempSelect: 3})}}>
						</div>
						<div style={{float: 'left', width: '20px', height: '20px', margin: '10px', borderColor: 'black', border: '1px solid', borderRadius: '.25em'}} onClick={() => {this.setState({...this.state, tempSelect: 4})}}>
						</div>
						<div style={{float: 'left', width: '20px', height: '20px', margin: '10px', borderColor: 'black', border: '1px dotted'}} onClick={() => {this.setState({...this.state, tempSelect: 5})}}>
						</div>
						<div style={{float: 'left', width: '20px', height: '20px', margin: '10px', borderColor: 'black', border: '1px', borderStyle: 'dashed solid'}} onClick={() => {this.setState({...this.state, tempSelect: 6})}}>
						</div>
						<div style={{float: 'left', width: '20px', height: '20px', margin: '10px', borderColor: 'black', border: '1px', borderStyle: 'solid dashed'}} onClick={() => {this.setState({...this.state, tempSelect: 7})}}>
						</div>
						<div style={{float: 'left', width: '20px', height: '20px', margin: '10px', border: '5px solid rgba(255,255,255,1)', backgroundColor: 'red', borderRadius: '15px'}} onClick={() => {this.setState({...this.state, tempSelect: 8})}}>
						</div>
					</div>
				</div>
				<div style={{...styleMap, width: width, height: width}}>
					{this.mapItems()}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return{
        module: state.module
	}
}

export default withRouter(connect(mapStateToProps, {handleUpdateMaps, handleGrabMapCurrent, handleGrabMaps})(Map));