import React, { memo } from 'react';
import { connect } from 'react-redux';
import colors from './Colors';

const BoxDragPreview = memo((props) => {
        let noteWidth = Number(props.item.width) * 9.8;
        let noteHeight = Number(props.item.height) * 9.8;
	
  return (
        <div style={{display: 'inline-block', opacity: '.5', position: 'absolute'}}>
			<img src={'/images/postit/'+colors[props.title]+'.png'}  style={{width: noteWidth, height: noteHeight, bottom: '0'}} alt='note'/>
		</div>
  )
})

const mapStateToProps = state => {
	return{
        
	}
}

export default connect(mapStateToProps)(BoxDragPreview);