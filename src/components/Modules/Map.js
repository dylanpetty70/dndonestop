import React, { Component } from 'react';
import { connect } from 'react-redux';
import {handleUpdateMaps, handleGrabMapCurrent} from '../../actions/modules';
import {withRouter} from 'react-router-dom';

const styleMap = {
  border: '1px solid black',
  position: 'absolute',
  marginLeft: '800px',
  backgroundColor: 'white',
  top: '321px'
}

const styleClicks = {
  height: '130px', 
  width: '630px',
  border: '1px solid black',
  position: 'absolute',
  margin: '5px',
  marginLeft: '800px',
  backgroundColor: 'lightGrey',
  top: '171px',
  padding: '10px'
}

const styleBlock = [
	{
		backgroundColor: 'white', zIndex: '2'
	},
	{
		border: '.25px solid rgba(0, 0, 0, .4)', backgroundColor: 'white', boxShadow: '1px 1px 1px 1px grey', zIndex: '3'
	},
	{
		backgroundColor: '#afcef2'
	},
	{
		border: '.25px solid rgba(0, 0, 0, .6)', backgroundColor: 'white', boxShadow: '1px 1px 1px 1px grey', zIndex: '3', borderRadius: '25px'
	},
	{
		border: '.25px solid rgba(0, 0, 0, .6)', backgroundColor: 'white', boxShadow: '1px 1px 1px 1px grey', zIndex: '3', borderRadius: '.25em'
	},
	{
		border: '.25px dotted rgba(0, 0, 0, .6)', backgroundColor: 'white', boxShadow: '1px 1px 1px 1px grey', zIndex: '3'
	},
	{
		border: '.25px rgba(0, 0, 0, .6)', backgroundColor: 'white', boxShadow: '1px 1px 1px 1px grey', zIndex: '3', borderStyle: 'dashed solid'
	},
	{
		border: '.25px rgba(0, 0, 0, .6)', backgroundColor: 'white', boxShadow: '1px 1px 1px 1px grey', zIndex: '3', borderStyle: 'solid dashed'
	},
	{
		border: '3px solid rgba(0, 0, 0, 0)', backgroundColor: 'red', borderRadius: '15px'
	},
	{
		backgroundColor: 'black'
	}
]

const styleBlockPlayer = [
	{
		backgroundColor: 'transparent', zIndex: '4'
	},
	{
		backgroundColor: 'red', borderRadius: '25px', zIndex: '4'
	},
	{
		backgroundColor: 'orange', borderRadius: '25px', zIndex: '4'
	},
	{
		backgroundColor: 'yellow', borderRadius: '25px', zIndex: '4'
	},
	{
		backgroundColor: 'green', borderRadius: '25px', zIndex: '4'
	},
	{
		backgroundColor: 'cyan', borderRadius: '25px', zIndex: '4'
	},
	{
		backgroundColor: 'blue', borderRadius: '25px', zIndex: '4'
	},
	{
		backgroundColor: 'purple', borderRadius: '25px', zIndex: '4'
	},
	{
		backgroundColor: 'gray', borderRadius: '25px', zIndex: '4'
	},
	{
		backgroundColor: 'brown', borderRadius: '25px', zIndex: '4'
	}
]

class Map extends Component {

	constructor(props){
		super(props);
		this.state = {tempSelect: 0,}
		this.mapItems = this.mapItems.bind(this);
		this.mapPlayerItems = this.mapPlayerItems.bind(this);
		this.changeItem = this.changeItem.bind(this);
	}

	componentDidMount(){
		this.props.handleGrabMapCurrent(this.props.module.key);
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
				if(this.props.module.currentMap){
					this.props.handleUpdateMaps(this.props.module.key, this.props.module.currentMap, data)
				}
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

	mapPlayerItems(){
		let temp = [];
		if(this.props.module.currentMap){
			if(this.props.module.maps[this.props.module.currentMap].playerItems){
				if(this.props.module.maps[this.props.module.currentMap].playerItems.length === this.props.module.maps[this.props.module.currentMap].scale){
					temp = this.props.module.maps[this.props.module.currentMap].playerItems;
				} else if(this.props.module.maps[this.props.module.currentMap].playerItems.length < this.props.module.maps[this.props.module.currentMap].scale){
					let scale = this.props.module.maps[this.props.module.currentMap].scale;
					let map = this.props.module.maps[this.props.module.currentMap].playerItems;
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
					let map = this.props.module.maps[this.props.module.currentMap].playerItems;
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
			if(temp !== this.props.module.maps[this.props.module.currentMap].playerItems){
				let data = this.props.module.maps[this.props.module.currentMap];
				data['playerItems'] = temp;
				if(this.props.module.currentMap){
					this.props.handleUpdateMaps(this.props.module.key, this.props.module.currentMap, data)
				}
			}
			//this is where the grid is rendered using temp
			let tempRender = [];
			let scale = this.props.module.maps[this.props.module.currentMap].scale;
			let tempWidth = String(Math.floor(630/this.props.module.maps[this.props.module.currentMap].scale)/2) + 'px';
			for(let i = 0; i < scale; i++){
				for(let j = 0; j < scale; j++){
					let left = j * Math.floor(630/this.props.module.maps[this.props.module.currentMap].scale)  +( Math.floor(630/this.props.module.maps[this.props.module.currentMap].scale)/4);
					let top = i * Math.floor(630/this.props.module.maps[this.props.module.currentMap].scale)  + (Math.floor(630/this.props.module.maps[this.props.module.currentMap].scale)/4);
					let style = styleBlockPlayer[temp[i][j]];
					tempRender.push(
						<div onClick={() => {this.changeItem(i, j)}} key={String(i)+String(j)+String(i*j)+String(j)+'2'} style={{width: tempWidth, height: tempWidth, left: left, top: top, position: 'absolute', ...style}}></div>
					)
				}
			}
			return tempRender;
		}
	}

	changeItem(i , j){
		let data = this.props.module.maps[this.props.module.currentMap];
		data['items'][i][j] = this.state.tempSelect;
		this.props.handleUpdateMaps(this.props.module.key, this.props.module.currentMap, data)
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
						<div style={{float: 'left', width: '20px', height: '20px', margin: '10px', backgroundColor: 'black'}} onClick={() => {this.setState({...this.state, tempSelect: 9})}}>
						</div>
					</div>
				</div>
				<div style={{...styleMap, width: width, height: width}}>
					{this.mapItems()}
					{this.mapPlayerItems()}
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

export default withRouter(connect(mapStateToProps, {handleUpdateMaps, handleGrabMapCurrent})(Map));