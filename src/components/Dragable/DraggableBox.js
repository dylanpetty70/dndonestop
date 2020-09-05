import React, { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import {MdDelete} from 'react-icons/md';
import {GrRotateRight, GrRotateLeft} from 'react-icons/gr';
import {AiOutlineArrowUp, AiOutlineArrowDown} from 'react-icons/ai';
import {connect} from 'react-redux';
import {handleUpdateCurrent} from '../../actions/draggable';
import {editTokens} from '../../actions/editEnv';
import ReactHtmlParser from 'react-html-parser';

function getStyles(left, top, isDragging) {
  const transform = `translate3d(${left}px, ${top}px, 0)`
  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  }
}
const DraggableBox = (props) => {
  const { id, left, top, object, scale, rotation } = props
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: object, id: id, left, top, title: object, scale: scale, rotation: rotation },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  })

  const style = () => {
    let rotate = 'rotate('+ Number(rotation) + 'deg)';
    return {
        transform: rotate,
        WebkitTransform: rotate
	}
  }

  const rotateItem = (all, object, function1, user, amount) => {
    for(let i = 0; i < all.length; i++){
      if(i === Number(props.id.replace('id',''))){
        all[i].rotation = Number(all[i].rotation) + amount;
	  }
	}

    function1(props.envOptions.current, all, user);
  }

  const zIndexItem = (all, object, function1, user, position) => {
    let temp = [];
    let index = 0;
    for(let i = 0; i < all.length; i++){
      if(i === Number(props.id.replace('id',''))){
        index = i;
	  }
	}
    if(index !== 0 && position === 'down'){
        temp = all.slice(0,index -1);
        temp = temp.concat(all.slice(index, index+1));
        temp = temp.concat(all.slice(index-1, index));
        temp = temp.concat(all.slice(index+1));
	} else if (index !== all.length - 1 && position === 'up'){
        if(index !== 0){
            temp = all.slice(0,index);
		} else {
            temp = [];  
		}
        temp = temp.concat(all.slice(index +1, index +2));
        temp = temp.concat(all.slice(index, index+1));
        temp = temp.concat(all.slice(index + 2 ));
	} else {
        temp = all;
	}
    function1(props.envOptions.current, temp, user);
  }

  if(props.draggableItems){
        let width = String(props.draggable.scale * props.scale);
        return (
        <div ref={drag} style={getStyles(left, top, isDragging)}>
          <div style={style()}>
          {ReactHtmlParser(props.draggableItems[object].title.replace(/32/g, String(props.draggable.scale * props.scale)))}
          </div>
	      {(props.editEnv.tokens) ? <>
          <div style={{width: {width}}}>
          <MdDelete style={{position: 'relative', top: '0'}} onClick={() => {props.handleUpdateCurrent(props.envOptions.current, props.draggable.current.filter((x,i) => i !== Number(props.id.replace('id',''))), props.user.username)}}/>
          <GrRotateRight style={{position: 'relative', top: '0'}} onClick={() => {rotateItem(props.draggable.current, object, props.handleUpdateCurrent, props.user.username, 45)}}/>
          <GrRotateLeft style={{position: 'relative', top: '0px'}} onClick={() => {rotateItem(props.draggable.current, object, props.handleUpdateCurrent, props.user.username, -45)}}/>
          <AiOutlineArrowUp style={{position: 'relative', top: '0px'}} onClick={() => {zIndexItem(props.draggable.current, object, props.handleUpdateCurrent, props.user.username, 'up')}}/>
          <AiOutlineArrowDown style={{position: 'relative', top: '0px'}} onClick={() => {zIndexItem(props.draggable.current, object, props.handleUpdateCurrent, props.user.username, 'down')}}/>
          </div>
          </>:
          <></>}
        </div>
      )
  } else {
        return(
      <div>
      </div>
      )
  }

}


const mapStateToProps = state => ({
    draggable: state.draggable,
    envOptions: state.envOptions,
    user: state.user,
    editEnv: state.editEnv,
    draggableItems: state.draggableItems
});

export default connect(mapStateToProps,{handleUpdateCurrent, editTokens})(DraggableBox)