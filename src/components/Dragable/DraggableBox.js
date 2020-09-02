import React, { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import {MdDelete} from 'react-icons/md';
import {GrRotateRight} from 'react-icons/gr';
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

  const rotateItem = (all, object, function1, user) => {
    for(let i = 0; i < all.length; i++){
      if(i === Number(props.id.replace('id',''))){
        all[i].rotation = Number(all[i].rotation) + 45;
	  }
	}

    function1(props.envOptions.current, all, user);
  }

  if(props.draggable.items){
        return (
        <div ref={drag} style={getStyles(left, top, isDragging)}>
          <div style={style()}>
          {ReactHtmlParser(props.draggable.items[object].title.replace(/32/g, String(props.draggable.scale * props.scale)))}
	      {(props.editEnv.tokens) ? <><MdDelete style={{position: 'absolute', top: '0'}} onClick={() => {props.handleUpdateCurrent(props.envOptions.current, props.draggable.current.filter((x,i) => i !== Number(props.id.replace('id',''))), props.user.username)}}/>
          <GrRotateRight style={{position: 'absolute', bottom: '0'}} onClick={() => {rotateItem(props.draggable.current, object, props.handleUpdateCurrent, props.user.username)}}/>
          </>:
          <></>}
          </div>
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
    editEnv: state.editEnv
});

export default connect(mapStateToProps,{handleUpdateCurrent, editTokens})(DraggableBox)