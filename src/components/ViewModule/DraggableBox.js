import React, { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend';
import {MdDelete} from 'react-icons/md';
import {GrRotateRight, GrRotateLeft} from 'react-icons/gr';
import {connect} from 'react-redux';
import {handleModuleUpdateItem, handleModuleDeleteItem} from '../../actions/modules';
import {handleUpdateBox} from '../../actions/box';
import {editTokens} from '../../actions/editEnv';
import ReactHtmlParser from 'react-html-parser';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {withRouter} from 'react-router-dom';

function getStyles(left, top) {
  const transform = `translate3d(${left}px, ${top}px, 0)`
  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
  }
}

const DraggableBox = (props) => {
  const { id, left, top, object, scale, rotation, conditions, player} = props
    const [{ isDragging }, drag, preview] = useDrag({
    item: { type: String(player), id: id, left, top, title: object, scale: scale, rotation: rotation, conditions },
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
    let data = props.module.environment.items[props.id];
    data.rotation = Number(data.rotation) + amount;
    function1(props.match.params.key, props.module.envKey, props.id, data);
  }


  const tooltip = () => {
        let temp = [];
      if(props.conditions){
              for(var key in props.conditions){
                temp.push(
                    <p key={key}><strong>{key+ ': '}</strong>{props.conditions[key]}<br/></p>
			    )
	      }
          return (<div style={{textAlign: 'left'}} key={key}>{temp.map((l) => {return l})}</div>);
      } else {
            return (<></>);
      }

  }

  if(props.draggableItems && props.link === '' ){
        let width = String(Number(props.module.environment.scale) * Number(props.scale));
        return (
        <div ref={drag} style={getStyles(left, top, isDragging, props.cover)}>
        {(props.conditions && props.player) ? <OverlayTrigger
            key={props.object+'overlay'}
            placement={'top'}
            overlay={
                <Tooltip id={'tooltip'+props.object}>
                    {tooltip()}
                </Tooltip>
            }
        >
          <div key={props.id} style={style()} onClick={() => {props.handleUpdateBox({id: props.id, rotation: props.rotation, object: props.object, scale: props.scale, player: props.player})}}>
          {ReactHtmlParser(props.draggableItems[object].title.replace(/32/g, String(Number(props.module.environment.scale) * Number(props.scale))))}
          </div>
        </OverlayTrigger> 
        :
          <div key={props.id} style={style()} onClick={() => {props.handleUpdateBox({id: props.id, rotation: props.rotation, object: props.object, scale: props.scale, player: props.player})}}>
          {ReactHtmlParser(props.draggableItems[object].title.replace(/32/g, String(Number(props.module.environment.scale) * Number(props.scale))))}
          </div>
          }
          {(props.editEnv.tokens && props.player) ? <>
          <div style={{width: {width}}}>
          <MdDelete color={props.envOptions.color} style={{position: 'relative', top: '0'}} onClick={() => {props.handleModuleDeleteItem(props.match.params.key, props.module.envKey, props.id)}}/>
          <GrRotateRight color={props.envOptions.color} style={{position: 'relative', top: '0'}} onClick={() => {rotateItem(props.handleModuleUpdateItem, 45)}}/>
          <GrRotateLeft color={props.envOptions.color} style={{position: 'relative', top: '0px'}} onClick={() => {rotateItem(props.handleModuleUpdateItem, -45)}}/>
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
    envOptions: state.envOptions,
    editEnv: state.editEnv,
    draggableItems: state.draggableItems,
    module: state.module
});

export default withRouter(connect(mapStateToProps,{editTokens, handleUpdateBox, handleModuleDeleteItem, handleModuleUpdateItem})(DraggableBox));