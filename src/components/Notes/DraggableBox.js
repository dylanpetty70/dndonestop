import React, { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import {MdDelete} from 'react-icons/md';
import {FaArrowsAlt, FaCompressArrowsAlt} from 'react-icons/fa';
import {BiSave} from 'react-icons/bi';
import {connect} from 'react-redux';
import {handleUpdateNote, handleDeleteNote} from '../../actions/notes';
import colors from './Colors';
import Form from 'react-bootstrap/Form'

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
  const {id, left, top, object, height, width, title, body, campaign, notepad, subnotepad } = props
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: String(object), key: id, left, top, object: object, height, width, title, body, campaign, notepad, subnotepad },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  })

    const handleDeleteNote = () => {
        props.handleDeleteNote(props.campaign, props.notepad, props.subnotepad, props.id); 
    }
    const handleResizeNote = (input) => {
        let height = Number(props.height);
        let width = Number(props.width);
       if(input === 'high'){
                height += 3; 
                width += 3; 
	   } else {
            if(Number(height) > 3){
                height -= 3; 
                width -= 3; 
            }
	   }
       let data = {
                    object: props.object, 
                    pLeft: props.left, 
                    pTop: props.top, 
                    height: height, 
                    width: width, 
                    title: props.title, 
                    body: props.body, 
                    campaign: props.campaign, 
                    notepad: props.notepad, 
                    subnotepad: props.subnotepad,
                    key: props.id
                    }

       props.handleUpdateNote(props.campaign, props.notepad, props.subnotepad, props.id, data);
	}

    const handleSaveNote = () => {
        let title = document.getElementById('textTitle' + props.id).value;
        let body = document.getElementById('textBody' + props.id).value;
        console.log(props)
        let data = {
                object: props.object, 
                pLeft: props.left, 
                pTop: props.top, 
                height: props.height, 
                width: props.width, 
                title: title, 
                body: body, 
                campaign: props.campaign, 
                notepad: props.notepad, 
                subnotepad: props.subnotepad,
                    key: props.id
        }

        props.handleUpdateNote(props.campaign, props.notepad, props.subnotepad, props.id, data);
	}

        let noteWidth = Number(props.width) * 9.8;
        let noteHeight = Number(props.height) * 9.8;

        let textHeight = Number(noteHeight) * (77/98);
        let textWidth = Number(noteWidth) * (75/98);
        let textTop = Number(noteHeight) * (-85/98);
        let textLeft = (Number(noteWidth) * (7/98));

        let tackTop = (Number(noteHeight) * (-165/98)) -8;
        let tackLeft = (Number(noteWidth) * (38/98)) - 3;

        let buttonTop = (Number(noteHeight) * (-83/98)) - 28;
        let buttonLeft = (Number(noteWidth) * (8/98)) + 2;

        let rows = Math.floor(Number(noteHeight)/50)

        let maxHeight = noteHeight;
        return (
        <div ref={drag} style={getStyles(left, top, isDragging)}>
            <div style={{maxHeight: maxHeight}}>
			<img src={'images/postit/'+colors[object]+'.png'} style={{width: noteWidth, height: noteHeight, bottom: '0'}} alt='note'/>
            <div style={{position: 'relative', top: textTop, left: textLeft, width: textWidth, height: textHeight, overflow: 'hidden', transform: 'rotate(-8deg)',WebkitTransform: 'rotate(-8deg)'}}>
                <Form>
                    <Form.Control
                        id={'textTitle' + props.id}
                        type="text"
                        placeholder="Title"
                        defaultValue={props.title}
                        style={{backgroundColor: 'transparent', border: '0', whiteSpace: 'nowrap', fontWeight: 'bold'}}
                      />
                    <Form.Control
                        id={'textBody' + props.id}
                        type="text"
                        as="textarea"
                        placeholder="Body"
                        defaultValue={props.body}
                        rows={rows}
                        style={{backgroundColor: 'transparent', border: '0', position: 'relative', height: '100%', resize: 'none'}}
                      />
                </Form>
            </div>
			<img src={'images/postit/thumbtack.png'} style={{position: 'relative', width: '20px', height: '30px', left: tackLeft, top: tackTop}} alt="tack"/>
            <div>
              <div style={{position: 'relative', top: buttonTop, left: buttonLeft, transform: 'rotate(-8deg)', WebkitTransform: 'rotate(-8deg)'}}>
	          <MdDelete style={{marginRight: '5px'}} onClick={() => {handleDeleteNote()}}/>
              <FaArrowsAlt style={{marginRight: '5px'}} onClick={() => {handleResizeNote('high')}}/>
              <FaCompressArrowsAlt style={{marginRight: '5px'}} onClick={() => {handleResizeNote('low')}}/>
              <BiSave style={{marginRight: '5px'}} onClick={() => {handleSaveNote()}}/>
              </div>
            </div>
            </div>
        </div>
      )

}


const mapStateToProps = state => ({
    notepads: state.notepads,
    notesOptions: state.notesOptions
});

export default connect(mapStateToProps,{handleUpdateNote, handleDeleteNote})(DraggableBox)