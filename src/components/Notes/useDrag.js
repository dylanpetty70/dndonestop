import React from 'react'
import { useDrop } from 'react-dnd'
import DraggableBox from '../Notes/DraggableBox'
import { connect } from 'react-redux';


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
      let index = Number(item.id.replace('id', ''));
        props.items[index].pLeft = left;
        props.items[index].pTop = top;
        props.handleUpdate(props.items)
    },
  })

  return (
    <div ref={drop} style={props.styles}>
      {Object.keys(props.boxes).map((key) => {
      return(<DraggableBox key={key} id={key} updateBoxes={props.handleUpdate} {...props.boxes[key]}/>)
      })}
    </div>
  )
}

const mapStateToProps = state => {
	return{
	}
}


export default connect(mapStateToProps)(Container);