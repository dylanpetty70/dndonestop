import React, { memo } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';

const BoxDragPreview = memo((props) => {
  return (
    <div style={{display: 'inline-block', transform: 'rotate(-7deg)', WebkitTransform: 'rotate(-7deg)', opacity: '.5'}}>
      <div>{ReactHtmlParser(props.title.replace(/32/g, String(props.draggable.scale * props.scale)))}</div>
    </div>
  )
})

const mapStateToProps = state => {
	return{
        draggable: state.draggable
	}
}

export default connect(mapStateToProps,)(BoxDragPreview);