import React from 'react'
import {connect} from 'react-redux';
import {handleUpdateModuleCurrent} from '../../actions/modules';
import {handleUpdateBox} from '../../actions/box';
import {editTokens} from '../../actions/editEnv';
import ReactHtmlParser from 'react-html-parser';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

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
  const { left, top, object, rotation } = props


  const style = () => {
    let rotate = 'rotate('+ Number(rotation) + 'deg)';
    return {
        transform: rotate,
        WebkitTransform: rotate
	}
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

  if(props.draggableItems && props.link === '' ){
        return (
        <div style={getStyles(left, top, props.cover)}>
        {(props.conditions && props.player) ? <OverlayTrigger
            key={props.object+'overlay'}
            placement={'top'}
            overlay={
                <Tooltip id={'tooltip'+props.object}>
                    {tooltip()}
                </Tooltip>
            }
        >
          <div style={style()} onClick={() => {props.handleUpdateBox({id: Number(props.id.replace('id', '')), rotation: props.rotation, object: props.object, scale: props.scale})}}>
          {ReactHtmlParser(props.draggableItems[object].title.replace(/32/g, String(Number(props.module.environment.scale) * Number(props.scale))))}
          </div>
        </OverlayTrigger> 
        :
          <div style={style()} onClick={() => {props.handleUpdateBox({id: Number(props.id.replace('id', '')), rotation: props.rotation, object: props.object, scale: props.scale})}}>
          {ReactHtmlParser(props.draggableItems[object].title.replace(/32/g, String(Number(props.module.environment.scale) * Number(props.scale))))}
          </div>
          }
	      
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