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
  if(props.draggable.current){
      if(Object.keys(props.draggable.current).length > 0){
          for(let i = 0; i < Object.keys(props.draggable.current).length; i++){
            let temp1 = (props.draggable.items) ? Object.keys(props.draggable.items).find(key => key === props.draggable.current[i].item) : [];
            temp[['id' + i]] = {id: 'id'+i, top: props.draggable.current[i].pTop, left: props.draggable.current[i].pLeft, object: temp1, scale: props.draggable.current[i].scale, rotation: props.draggable.current[i].rotation};
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
       if(props.draggable.current){
            if(Object.keys(props.draggable.current).length > 0){
                for(let i = 0; i < Object.keys(props.draggable.current).length; i++){
                let temp1 = (props.draggable.items) ? Object.keys(props.draggable.items).find(key => key === props.draggable.current[i].item) : '';
                temp[['id' + i]] = {id: 'id'+i, top: props.draggable.current[i].pTop, left: props.draggable.current[i].pLeft, object: temp1, scale: props.draggable.current[i].scale, rotation: props.draggable.current[i].rotation};
                }
                setBoxes(temp);
            } else {
                setBoxes({})     
			}
        } else {
            setBoxes({})  
		}
  }, [props.draggable]);

    const updateBoxes1 = () => {
      let temp = {};
      if(props.draggable.current){
            if(Object.keys(props.draggable.current).length > 0){
                for(let i = 0; i < Object.keys(props.draggable.current).length; i++){
                let temp1 = (props.draggable.items) ? Object.keys(props.draggable.items).find(key => key === props.draggable.current[i].item) : '';
                temp[['id' + i]] = {id: 'id'+i, top: props.draggable.current[i].pTop, left: props.draggable.current[i].pLeft, object: temp1, scale: props.draggable.current[i].scale, rotation: props.draggable.current[i].rotation};
                }
                setBoxes(temp);
            } else {
                setBoxes({})     
			}
        } else {
            setBoxes({})  
		}
  };

  const [, drop] = useDrop({
    accept: (props.draggable.items) ? [...Object.keys(props.draggable.items)] : [],
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset()
      let left = Math.round(item.left + delta.x)
      let top = Math.round(item.top + delta.y)
        ;[left, top] = snapToGrid(left, top, props.draggable.scale)
      moveBox(item.id, left, top)
      let current = props.draggable.current;
      let index = Number(item.id.replace('id', ''));
      if(current[index]){
          current[index].pLeft = left;
          current[index].pTop = top;
          props.handleUpdateCurrent(props.envOptions.current, current, props.user.username)
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
        user: state.user
	}
}

export default connect(mapStateToProps, {handleGrabDraggable, handleUpdateCurrent})(Container);