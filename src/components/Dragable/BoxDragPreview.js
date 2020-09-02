import React, { memo } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';

const BoxDragPreview = memo((props) => {

    let rotate = 'rotate(' + String(Number(props.rotation) - 7) + 'deg)';

  return (
    <div style={{display: 'inline-block', transform: rotate, WebkitTransform: rotate, opacity: '.5'}}>
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