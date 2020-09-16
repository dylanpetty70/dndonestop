import React, { Component } from 'react';
import { connect } from 'react-redux';
import {handleNewNote} from '../../actions/notes';
import colors from './Colors';
import ReactModal from 'react-modal-resizable-draggable';

class CustomPanel extends Component {

	constructor(props){
		super(props);
		this.state = {}
		this.note = this.note.bind(this);
	}

	componentDidMount(){
    }

	note(){
		let temp = [];
		for(let i = 0; i < colors.length; i++){
			temp.push(
				<div key={'item'+i} position='flex'>
					
					<img src={'/images/postit/'+colors[i]+'.png'}  style={{width: '98px', height: '98px', bottom: '0'}} alt='note'  onClick={() => {if(this.props.notepads.key !== '' && this.props.notepad !== '' && this.props.subnotepad !== ''){this.props.handleNewNote(this.props.notepads.key, this.props.notepad, this.props.subnotepad, i)}}}/>
					<img src='/images/postit/thumbtack.png' style={{position: 'relative', width: '20px', height: '30px', left: '-60px', top: '-30px'}} alt="tack"/>
				</div>
			)
		}
		return temp;
	}

	render(){
		return(
			<ReactModal 
				isOpen={true}
				initHeight='500px'
				initWidth='200px'
				top='200px'
				left='300px'>
				<div style={{zIndex: '99', alignText: 'center',padding: '30px', border: '1px solid', backgroundColor: 'lightGrey', width: '100%', height: '100%', overflowY: 'auto'}}>
				<h5>Click to add</h5>
				<hr/>
				{this.note()}
			</div>
			</ReactModal>
		)
	}
}

const mapStateToProps = state => {
	return{
        notepads: state.notepads
	}
}

export default connect(mapStateToProps, 
	{handleNewNote}
	)(CustomPanel);