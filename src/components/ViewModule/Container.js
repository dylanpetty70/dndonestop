import React, { useCallback, useState, useMemo } from 'react'
import { useDrop } from 'react-dnd'
import DraggableBox from './DraggableBox'
import {snapToGrid} from './snapToGrid'
import update from 'immutability-helper'
import { connect } from 'react-redux';
import {handleGrabModuleEnv, handleUpdateModuleCurrent, handleModuleUpdateItem} from '../../actions/modules';
import {withRouter} from 'react-router-dom';


const styles = {
  height: '780px', 
  width: '780px',
  border: '1px solid black',
  position: 'relative',
  margin: '5px',
  marginLeft: '10px',
  overflow: 'hidden'
}
function renderBox(item, key, updateBoxes) {
  return <DraggableBox key={key} id={key} updateBoxes={updateBoxes} {...item} />
}
const Container = (props) => {
  let temp = {};


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
            let tempHolder = {};
            for(var key in props.module.environment.items){
                if(props.module.environment.items[key].back){
                    let item = props.module.environment.items[key].item
                    let temp1 = (props.draggableItems) ? Object.keys(props.draggableItems).find(key => key === item) : [];
                    temp[[key]] = {id: key, top: props.module.environment.items[key].pTop, left: props.module.environment.items[key].pLeft, object: temp1, scale: props.module.environment.items[key].scale, rotation: props.module.environment.items[key].rotation, conditions: props.module.environment.items[key].conditions, cover: props.module.environment.items[key].cover, link: props.module.environment.items[key].link, player: props.module.environment.items[key].player};
                } else {
                    let item = props.module.environment.items[key].item
                    let temp1 = (props.draggableItems) ? Object.keys(props.draggableItems).find(key => key === item) : [];
                    tempHolder[[key]] = {id: key, top: props.module.environment.items[key].pTop, left: props.module.environment.items[key].pLeft, object: temp1, scale: props.module.environment.items[key].scale, rotation: props.module.environment.items[key].rotation, conditions: props.module.environment.items[key].conditions, cover: props.module.environment.items[key].cover, link: props.module.environment.items[key].link, player: props.module.environment.items[key].player};
                }
            }
            temp = {...temp, ...tempHolder};
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
            let tempHolder = {};
            for(var key in props.module.environment.items){
                if(props.module.environment.items[key].back){
                    let item = props.module.environment.items[key].item
                    let temp1 = (props.draggableItems) ? Object.keys(props.draggableItems).find(key => key === item) : [];
                    temp[[key]] = {id: key, top: props.module.environment.items[key].pTop, left: props.module.environment.items[key].pLeft, object: temp1, scale: props.module.environment.items[key].scale, rotation: props.module.environment.items[key].rotation, conditions: props.module.environment.items[key].conditions, cover: props.module.environment.items[key].cover, link: props.module.environment.items[key].link, player: props.module.environment.items[key].player};
                } else {
                    let item = props.module.environment.items[key].item
                    let temp1 = (props.draggableItems) ? Object.keys(props.draggableItems).find(key => key === item) : [];
                    tempHolder[[key]] = {id: key, top: props.module.environment.items[key].pTop, left: props.module.environment.items[key].pLeft, object: temp1, scale: props.module.environment.items[key].scale, rotation: props.module.environment.items[key].rotation, conditions: props.module.environment.items[key].conditions, cover: props.module.environment.items[key].cover, link: props.module.environment.items[key].link, player: props.module.environment.items[key].player};
                }
            }
            temp = {...temp, ...tempHolder};
        } else {
        temp = {};
    }
    } else {
        temp = {};
    }
        setBoxes(temp);
  };

  const [, drop] = useDrop({
    accept: ['true'],
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset()
      let left = Math.round(item.left + delta.x)
      let top = Math.round(item.top + delta.y)
        ;[left, top] = snapToGrid(left, top, Number(props.module.environment.scale))
      moveBox(item.id, left, top)
      let current = props.module.environment.items;
      let index = item.id;
      if(current[index]){
          current[index].pLeft = left;
          current[index].pTop = top;
          props.handleModuleUpdateItem(props.match.params.key, props.module.envKey, index, current[index])
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

export default withRouter(connect(mapStateToProps, {handleGrabModuleEnv, handleUpdateModuleCurrent, handleModuleUpdateItem})(Container));