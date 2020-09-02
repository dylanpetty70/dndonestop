import React, { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import {MdDelete} from 'react-icons/md';
import {connect} from 'react-redux';
import {handleUpdateCurrent} from '../../actions/draggable';
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
  const { id, left, top, object, scale } = props
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: object, id: id, left, top, title: object, scale: scale },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  })
  if(props.draggable.items){
        return (
        <div ref={drag} style={getStyles(left, top, isDragging)}>
          {ReactHtmlParser(props.draggable.items[object].title.replace(/32/g, String(props.draggable.scale * props.scale)))}
	      <MdDelete  onClick={() => {props.handleUpdateCurrent(props.envOptions.current, props.draggable.current.filter((x,i) => i !== Number(props.id.replace('id',''))), this.props.user.username)}}/>
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
    envOptions: state.envOptions
});

export default connect(mapStateToProps,{handleUpdateCurrent})(DraggableBox)