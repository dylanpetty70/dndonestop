import React, { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import {MdDelete} from 'react-icons/md';
import {GrRotateRight, GrRotateLeft} from 'react-icons/gr';
import {AiOutlineArrowUp, AiOutlineArrowDown} from 'react-icons/ai';
import {connect} from 'react-redux';
import {handleUpdateModuleCurrent} from '../../actions/modules';
import {handleUpdateBox} from '../../actions/box';
import {editTokens} from '../../actions/editEnv';
import ReactHtmlParser from 'react-html-parser';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function getStyles(left, top, isDragging, cover) {
  const transform = `translate3d(${left}px, ${top}px, 0)`
  const tempO = (cover) ? .3 : 1;
  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: (isDragging) ? 0 : tempO,
    height: isDragging ? 0 : '',
  }
}


const DraggableBox = (props) => {
  const { id, left, top, object, scale, rotation, conditions, player } = props
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: object, id: id, left, top, title: object, scale: scale, rotation: rotation, conditions, player },
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

  const rotateItem = (all, object, function1, amount) => {
    for(let i = 0; i < all.length; i++){
      if(i === Number(props.id.replace('id',''))){
        all[i].rotation = Number(all[i].rotation) + amount;
	  }
	}

    function1(props.module.key, props.module.envKey, all);
  }

  const zIndexItem = (all, object, function1, position) => {
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
    function1(props.module.key, props.module.envKey, temp);
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

  if(props.draggableItems){
        let width = String(Number(props.module.environment.scale) * Number(props.scale));
        let topLink = String(-Number(props.module.environment.scale) * Number(props.scale)* 7/10) + 'px';
        let widthLink = String(Number(props.module.environment.scale) * Number(props.scale)*2/3) + 'px';
        return (
        <div ref={drag} style={getStyles(left, top, isDragging, props.cover)}>
        {(props.conditions) ? <OverlayTrigger
            key={props.object+'overlay'}
            placement={'top'}
            overlay={
                <Tooltip id={'tooltip'+props.object}>
                    {tooltip()}
                </Tooltip>
            }
        >
          <div key={props.id} style={style()} onClick={() => {props.handleUpdateBox({id: Number(props.id.replace('id', '')), rotation: props.rotation, object: props.object, scale: props.scale, player: props.player})}}>
          {ReactHtmlParser(props.draggableItems[object].title.replace(/32/g, String(Number(props.module.environment.scale) * Number(props.scale))))}
          </div>
        </OverlayTrigger> 
        :
          <div key={props.id} style={style()} onClick={() => {props.handleUpdateBox({id: Number(props.id.replace('id', '')), rotation: props.rotation, object: props.object, scale: props.scale, player: props.player})}}>
          {ReactHtmlParser(props.draggableItems[object].title.replace(/32/g, String(Number(props.module.environment.scale) * Number(props.scale))))}
          </div>
          }
          {(props.link !== '') ? <p style={{fontSize: '12px', position: 'relative', top: topLink, overflowX: 'auto', width: widthLink, backgroundColor: '#E0D3AF', margin: 'auto', display: 'block'}}>{props.link}</p> : <></>}
	      {(props.editEnv.tokens) ? <>
          <div style={{width: {width}}}>
          <MdDelete color={props.envOptions.color} style={{position: 'relative', top: '0'}} onClick={() => {props.handleUpdateModuleCurrent(props.module.key, props.module.envKey, props.module.environment.items.filter((x,i) => i !== Number(props.id.replace('id',''))))}}/>
          <GrRotateRight color={props.envOptions.color} style={{position: 'relative', top: '0'}} onClick={() => {rotateItem(props.module.environment.items, object, props.handleUpdateModuleCurrent, 45)}}/>
          <GrRotateLeft color={props.envOptions.color} style={{position: 'relative', top: '0px'}} onClick={() => {rotateItem(props.module.environment.items, object, props.handleUpdateModuleCurrent, -45)}}/>
          <AiOutlineArrowUp color={props.envOptions.color} style={{position: 'relative', top: '0px'}} onClick={() => {zIndexItem(props.module.environment.items, object, props.handleUpdateModuleCurrent, 'up')}}/>
          <AiOutlineArrowDown color={props.envOptions.color} style={{position: 'relative', top: '0px'}} onClick={() => {zIndexItem(props.module.environment.items, object, props.handleUpdateModuleCurrent, 'down')}}/>
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

export default connect(mapStateToProps,{handleUpdateModuleCurrent, editTokens, handleUpdateBox})(DraggableBox)