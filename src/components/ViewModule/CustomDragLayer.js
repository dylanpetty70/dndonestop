import React, {Component} from 'react'
import { useDragLayer } from 'react-dnd'
import BoxDragPreview from './BoxDragPreview'
import  {snapToGrid}  from './snapToGrid';
import { connect } from 'react-redux';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  height: '780px', 
  width: '780px',
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
        ;[x, y] = snapToGrid(x, y, Number(this.props.module.environment.scale))
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
                <BoxDragPreview title={(this.props.draggableItems[this.props.item.title]) ? this.props.draggableItems[this.props.item.title].title : ''} scale={this.props.item.scale} rotation={this.props.item.rotation}/>
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
      let offsetx = '0';
      let offsety = '0';
      if(currentOffset && item){
         offsetx = (currentOffset.x > initialOffset.x) ? 20 : -20;
         offsety = (currentOffset.y > initialOffset.y) ? 20 : -20;
      }

      return(
        <div>
            <CustomDragLayer draggableItems={props.draggableItems} itemType={itemType} isDragging={isDragging} item={item} initialOffset={initialOffset} currentOffset={currentOffset} module={props.module}/>
        
            {(currentOffset && item) ? 
           <div style={{position: 'absolute', left: '780px', top: '95px', height: '10px', zIndex: '10'}}>
                <h4 style={{color: 'white'}}> Distance: {Math.floor(Math.sqrt((Math.pow((currentOffset.x - initialOffset.x + offsetx),2)) + (Math.pow((currentOffset.y - initialOffset.y + offsety),2)))/(props.module.environment.scale))*5} feet </h4>
           </div>
            : <></>}
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

export default connect(mapStateToProps, {})(DragLayer);

