import React from 'react'
import { useDrop } from 'react-dnd'
import DraggableBox from '../Notes/DraggableBox'
import { connect } from 'react-redux';
import {handleUpdateNote} from '../../actions/notes';


const Container = (props) => {

  const [, drop] = useDrop({
    accept: props.accept,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset()
      let left = Math.round(item.left + delta.x)
      let top = Math.round(item.top + delta.y)
      if(props.snapToGrid){
        ;[left, top] = props.snapToGrid(left, top, props.scale)
	  }

       let data = {
                    object: item.object, 
                    pLeft: left, 
                    pTop: top, 
                    height: item.height, 
                    width: item.width, 
                    title: item.title, 
                    body: item.body, 
                    campaign: item.campaign, 
                    notepad: item.notepad, 
                    subnotepad: item.subnotepad,
                    key: item.key
                    }
       props.handleUpdateNote(data.campaign, data.notepad, data.subnotepad, data.key, data);
    },
  })

  return (
    <div ref={drop} style={props.styles}>
      {Object.keys(props.boxes).map((key) => {
      return(<DraggableBox key={key} id={key} {...props.boxes[key]}/>)
      })}
    </div>
  )
}

const mapStateToProps = state => {
	return{
	}
}


export default connect(mapStateToProps, {handleUpdateNote})(Container);