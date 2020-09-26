import React, { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import {MdDelete} from 'react-icons/md';
import {GrRotateRight, GrRotateLeft} from 'react-icons/gr';
import {connect} from 'react-redux';
import {handleUpdateItem, handleDeleteItem} from '../../actions/draggable';
import {handleUpdateBox} from '../../actions/box';
import {editTokens} from '../../actions/editEnv';
import ReactHtmlParser from 'react-html-parser';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

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
  const { id, left, top, object, scale, rotation, conditions } = props
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: object, id: id, left, top, title: object, scale: scale, rotation: rotation, conditions },
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

  const rotateItem = (function1, amount) => {
    let data = props.draggable.environment.items[props.id];
    data.rotation = Number(data.rotation) + amount;
    function1(props.draggable.key, props.id, data);
  }

  const tooltip = () => {
        let temp = [];
      if(props.conditions){
              for(var key in props.conditions){
                temp.push(
                    <><strong>{key+ ': '}</strong>{props.conditions[key]}<br/></>
			    )
	      }
          return (<p style={{textAlign: 'left'}} key={key}>{temp.map((l) => {return l})}</p>);
      } else {
            return (<></>);
      }

  }

  if(props.draggableItems){
        let width = String(Number(props.draggable.environment.scale) * Number(props.scale));
        return (
        <div ref={drag} style={getStyles(left, top, isDragging)}>
        {(props.conditions) ? <OverlayTrigger
            key={props.object+'overlay'}
            placement={'top'}
            overlay={
                <Tooltip id={'tooltip'+props.object}>
                    {tooltip()}
                </Tooltip>
            }
        >
          <div style={style()} onClick={() => {props.handleUpdateBox({id: props.id, rotation: props.rotation, object: props.object, scale: props.scale})}}>
          {ReactHtmlParser(props.draggableItems[object].title.replace(/32/g, String(Number(props.draggable.environment.scale) * Number(props.scale))))}
          </div>
        </OverlayTrigger> 
        :
          <div style={style()} onClick={() => {props.handleUpdateBox({id: props.id, rotation: props.rotation, object: props.object, scale: props.scale})}}>
          {ReactHtmlParser(props.draggableItems[object].title.replace(/32/g, String(Number(props.draggable.environment.scale) * Number(props.scale))))}
          </div>
          }
	      {(props.editEnv.tokens) ? <>
          <div style={{width: {width}}}>
          <MdDelete color={props.envOptions.color} style={{position: 'relative', top: '0'}} onClick={() => {props.handleDeleteItem(props.draggable.key, props.id)}}/>
          <GrRotateRight color={props.envOptions.color} style={{position: 'relative', top: '0'}} onClick={() => {rotateItem(props.handleUpdateItem, 45)}}/>
          <GrRotateLeft color={props.envOptions.color} style={{position: 'relative', top: '0px'}} onClick={() => {rotateItem(props.handleUpdateItem, -45)}}/>
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
    editEnv: state.editEnv,
    draggableItems: state.draggableItems
});

export default connect(mapStateToProps,{editTokens, handleUpdateBox, handleUpdateItem, handleDeleteItem})(DraggableBox)