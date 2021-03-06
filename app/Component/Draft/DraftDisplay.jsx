import React from 'react';
import {Editor, EditorState,convertToRaw, convertFromRaw} from 'draft-js';
import styles from "./styleDisplay.module.css";

export default class DraftDisplay extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.changeEditorState = (editorState) => {}; //no use, just for component requirement. 
    this._draft_blockClass = this._draft_blockClass.bind(this);
    this.style={
      Com_DraftDisplay_: {
        width: '100%',
        height: '100%',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }
    }
  }

  _draft_blockClass(contentBlock){
    return styles.markDisplayBlock;
  }

  render(){
    //let cx = cxBind.bind(styles);
    let editorState= this.props.editorState?EditorState.createWithContent(convertFromRaw(this.props.editorState)):EditorState.createEmpty();
    //we put the editorState here, because it's 'Display' and readOnly, we won't change any content
    //second, the displaying content should update follow it's parent---like editing.

    return(
      <div
        style={this.style.Com_DraftDisplay_}>
        <Editor
          ref={(element)=>{this.contentEditor = element;}}
          editorState={editorState}
          onChange={this.changeEditorState}
          blockStyleFn={this._draft_blockClass}
          readOnly/>
      </div>
    )
  }
}
