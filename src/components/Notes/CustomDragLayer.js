import React, {Component} from 'react'
import { useDragLayer } from 'react-dnd'
import BoxDragPreview from './BoxDragPreview'
import { connect } from 'react-redux';
import {handleGrabDraggable} from '../../actions/draggable';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 10000,
  left: '0px',
  width: '83vw',
  height: '100vh',
  margin: '5px',
  top: '0px'
}

class CustomDragLayer extends Component {

   constructor(props){
		super(props);
        this.state = {items: []}
        this.getItemStyles = this.getItemStyles.bind(this);
        this.mainRender = this.mainRender.bind(this);
	}

    componentDidMount(){
    }


    getItemStyles() {
      if (!this.props.initialOffset || !this.props.currentOffset) {
        return {
          display: 'none',
        }
      }
      let { x, y } = this.props.currentOffset
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
                <BoxDragPreview title={this.props.itemType} item={this.props.item}/>
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
      return(<CustomDragLayer itemType={itemType} isDragging={isDragging} item={item} initialOffset={initialOffset} currentOffset={currentOffset} notepads={props.notepads} notesOptions={props.notesOptions} />)
}

const mapStateToProps = state => {
	return{
        notepads: state.notepads,
        notesOptions: state.notesOptions
	}
}

export default connect(mapStateToProps, {handleGrabDraggable})(DragLayer);

