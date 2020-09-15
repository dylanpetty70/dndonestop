import React, { useCallback, useState, useMemo } from 'react'
import { useDrop } from 'react-dnd'
import DraggableBox from './DraggableBox'
import {snapToGrid} from './snapToGrid'
import update from 'immutability-helper'
import { connect } from 'react-redux';
import {handleGrabDraggable, handleUpdateCurrent} from '../../actions/draggable';


const styles = {
  height: '80vh', 
  width: '98vw',
  border: '1px solid black',
  position: 'relative',
  margin: '5px'
}
function renderBox(item, key, updateBoxes) {
  return <DraggableBox key={key} id={key} updateBoxes={updateBoxes} {...item} />
}
const Container = (props) => {
  let temp = {};
  if(props.draggable.environment.items){
      if(Object.keys(props.draggable.environment.items).length > 0){
          for(let i = 0; i < Object.keys(props.draggable.environment.items).length; i++){
            let temp1 = (props.draggableItems) ? Object.keys(props.draggableItems).find(key => key === props.draggable.environment.items[i].item) : [];
            temp[['id' + i]] = {id: 'id'+i, top: props.draggable.environment.items[i].pTop, left: props.draggable.environment.items[i].pLeft, object: temp1, scale: props.draggable.environment.items[i].scale, rotation: props.draggable.environment.items[i].rotation, conditions: props.draggable.environment.items[i].conditions};
          }
        } else {
            temp = {};  
		}
    } else {
        temp = {};
	}


  const [boxes, setBoxes] = useState(temp)
  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        }),
      )
    },
    [boxes],
  )

  const updateBoxes = useMemo(() => {
      let temp = {};
      if(props.draggable.environment.items){
          if(Object.keys(props.draggable.environment.items).length > 0){
              for(let i = 0; i < Object.keys(props.draggable.environment.items).length; i++){
                let temp1 = (props.draggableItems) ? Object.keys(props.draggableItems).find(key => key === props.draggable.environment.items[i].item) : [];
                temp[['id' + i]] = {id: 'id'+i, top: props.draggable.environment.items[i].pTop, left: props.draggable.environment.items[i].pLeft, object: temp1, scale: props.draggable.environment.items[i].scale, rotation: props.draggable.environment.items[i].rotation, conditions: props.draggable.environment.items[i].conditions};
              }
          } else {
                temp = {};  
          }
      } else {
            temp = {};
      }
      setBoxes(temp);
  }, [props.draggable.environment.items, props.draggableItems]);

    const updateBoxes1 = () => {
  let temp = {};
  if(props.draggable.environment.items){
      if(Object.keys(props.draggable.environment.items).length > 0){
          for(let i = 0; i < Object.keys(props.draggable.environment.items).length; i++){
            let temp1 = (props.draggableItems) ? Object.keys(props.draggableItems).find(key => key === props.draggable.environment.items[i].item) : [];
            temp[['id' + i]] = {id: 'id'+i, top: props.draggable.environment.items[i].pTop, left: props.draggable.environment.items[i].pLeft, object: temp1, scale: props.draggable.environment.items[i].scale, rotation: props.draggable.environment.items[i].rotation, conditions: props.draggable.environment.items[i].conditions};
          }
        } else {
            temp = {};  
		}
    } else {
        temp = {};
	}
    setBoxes(temp);
  };

  const [, drop] = useDrop({
    accept: (props.draggableItems) ? [...Object.keys(props.draggableItems)] : [],
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset()
      let left = Math.round(item.left + delta.x)
      let top = Math.round(item.top + delta.y)
        ;[left, top] = snapToGrid(left, top, Number(props.draggable.environment.scale))
      moveBox(item.id, left, top)
      let current = props.draggable.environment.items;
      let index = Number(item.id.replace('id', ''));
      if(current[index]){
          current[index].pLeft = left;
          current[index].pTop = top;
          props.handleUpdateCurrent(props.draggable.key, current)
	  } else {
       updateBoxes1();
	  }
      return undefined
    },
  })

  return (
    <div ref={drop} style={styles}>
      {Object.keys(boxes).map((key) => renderBox(boxes[key], key, updateBoxes))}
    </div>
  )
}


const mapStateToProps = state => {
	return{
        draggable: state.draggable,
        envOptions: state.envOptions,
    draggableItems: state.draggableItems

	}
}

export default connect(mapStateToProps, {handleGrabDraggable, handleUpdateCurrent})(Container);