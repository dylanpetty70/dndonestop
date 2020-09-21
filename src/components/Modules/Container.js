import React, { useCallback, useState, useMemo } from 'react'
import { useDrop } from 'react-dnd'
import DraggableBox from './DraggableBox'
import {snapToGrid} from './snapToGrid'
import update from 'immutability-helper'
import { connect } from 'react-redux';
import {handleGrabModuleEnv, handleUpdateModuleCurrent} from '../../actions/modules';


const styles = {
  height: '780px', 
  width: '780px',
  border: '1px solid black',
  position: 'relative',
  margin: '5px',
  marginLeft: '10px'
}
function renderBox(item, key, updateBoxes) {
  return <DraggableBox key={key} id={key} updateBoxes={updateBoxes} {...item} />
}
const Container = (props) => {
  let temp = {};
  if(props.module.environment.items){
      if(Object.keys(props.module.environment.items).length > 0){
          for(let i = 0; i < Object.keys(props.module.environment.items).length; i++){
            let temp1 = (props.draggableItems) ? Object.keys(props.draggableItems).find(key => key === props.module.environment.items[i].item) : [];
            temp[['id' + i]] = {id: 'id'+i, top: props.module.environment.items[i].pTop, left: props.module.environment.items[i].pLeft, object: temp1, scale: props.module.environment.items[i].scale, rotation: props.module.environment.items[i].rotation, conditions: props.module.environment.items[i].conditions, cover: props.module.environment.items[i].cover, link: props.module.environment.items[i].link};
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
      if(props.module.environment.items){
          if(Object.keys(props.module.environment.items).length > 0){
              for(let i = 0; i < Object.keys(props.module.environment.items).length; i++){
                let temp1 = (props.draggableItems) ? Object.keys(props.draggableItems).find(key => key === props.module.environment.items[i].item) : [];
                temp[['id' + i]] = {id: 'id'+i, top: props.module.environment.items[i].pTop, left: props.module.environment.items[i].pLeft, object: temp1, scale: props.module.environment.items[i].scale, rotation: props.module.environment.items[i].rotation, conditions: props.module.environment.items[i].conditions, cover: props.module.environment.items[i].cover, link: props.module.environment.items[i].link};
              }
          } else {
                temp = {};  
          }
      } else {
            temp = {};
      }
      setBoxes(temp);
  }, [props.module.environment.items, props.draggableItems]);

    const updateBoxes1 = () => {
  let temp = {};
  if(props.module.environment.items){
      if(Object.keys(props.module.environment.items).length > 0){
          for(let i = 0; i < Object.keys(props.module.environment.items).length; i++){
            let temp1 = (props.draggableItems) ? Object.keys(props.draggableItems).find(key => key === props.module.environment.items[i].item) : [];
            temp[['id' + i]] = {id: 'id'+i, top: props.module.environment.items[i].pTop, left: props.module.environment.items[i].pLeft, object: temp1, scale: props.module.environment.items[i].scale, rotation: props.module.environment.items[i].rotation, conditions: props.module.environment.items[i].conditions, cover: props.module.environment.items[i].cover, link: props.module.environment.items[i].link};
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
        ;[left, top] = snapToGrid(left, top, Number(props.module.environment.scale))
      moveBox(item.id, left, top)
      let current = props.module.environment.items;
      let index = Number(item.id.replace('id', ''));
      if(current[index]){
          current[index].pLeft = left;
          current[index].pTop = top;
          props.handleUpdateModuleCurrent(props.module.key, props.module.envKey, current)
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
        envOptions: state.envOptions,
        draggableItems: state.draggableItems,
        module: state.module

	}
}

export default connect(mapStateToProps, {handleGrabModuleEnv, handleUpdateModuleCurrent})(Container);