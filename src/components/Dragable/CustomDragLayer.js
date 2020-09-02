import React, {Component} from 'react'
import { useDragLayer } from 'react-dnd'
import BoxDragPreview from './BoxDragPreview'
import  {snapToGrid}  from './snapToGrid';
import { connect } from 'react-redux';
import {handleGrabDraggable} from '../../actions/draggable';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  height: '80vh', 
  width: '98vw',
  margin: '5px'
}

class CustomDragLayer extends Component {

   constructor(props){
		super(props);
        this.getItemStyles = this.getItemStyles.bind(this);
        this.mainRender = this.mainRender.bind(this);
	}


    getItemStyles() {
      if (!this.props.initialOffset || !this.props.currentOffset) {
        return {
          display: 'none',
        }
      }
      let { x, y } = this.props.currentOffset
      if (true) {
        x -= this.props.initialOffset.x
        y -= this.props.initialOffset.y
        ;[x, y] = snapToGrid(x, y, this.props.draggable.scale)
        x += this.props.initialOffset.x
        y += this.props.initialOffset.y
      }
      const transform = `translate(${x}px, ${y}px)`
      return {
        transform,
        WebkitTransform: transform,
      }
    }


    mainRender(){
        if (!this.props.isDragging) {
            return null
        } else{
            return(<div style={layerStyles}>
                <div
                style={this.getItemStyles()}
                >
                <BoxDragPreview title={(this.props.draggable.items[this.props.item.type]) ? this.props.draggable.items[this.props.item.type].title : ''} scale={this.props.item.scale} rotation={this.props.item.rotation}/>
                </div>
            </div>)
		}
	}
    
	render(){
		return(
            <div>
                {this.mainRender()}
            </div>
		)
	}
}

const DragLayer = (props) => {
     const {
        itemType,
        isDragging,
        item,
        initialOffset,
        currentOffset,
      } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
      }))
      return(<CustomDragLayer itemType={itemType} isDragging={isDragging} item={item} initialOffset={initialOffset} currentOffset={currentOffset} draggable={props.draggable}/>)
}

const mapStateToProps = state => {
	return{
        draggable: state.draggable,
        envOptions: state.envOptions
	}
}

export default connect(mapStateToProps, {handleGrabDraggable})(DragLayer);

