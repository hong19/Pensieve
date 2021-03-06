import React from 'react';
import {connect} from "react-redux";
import classnames from 'classnames';
import styles from "./styles.module.css";
import PanelJump from '../PanelJump.jsx';
import ViewerBulb from '../ViewerBulb.jsx';
import DraftDisplay from '../../../Component/Draft/DraftDisplay.jsx';

const styleMiddle = {
  boxPanelInteraction: {
    display: 'inline-block',
    height: '100%',
    position: 'relative',
    boxSizing: 'border-box',
  },
  boxMessage: {
    boxSizing: 'border-box',
    padding: '1rem 0.7rem 0'
  },
  textMessage: {
    fontSize: '1.2rem',
    letterSpacing: '0.1rem',
    fontStyle: 'italic',
    color: '#adadad',
    cursor: 'default'
  }
}

class ViewerBlock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      message: false
    };
    this.boxContent = React.createRef();
    this._set_stateDefault = ()=>{this.setState({message: false})};
    this._set_BlockMessage = this._set_BlockMessage.bind(this);
    this._handleWheel_boxContent = (event)=>{event.stopPropagation();};
    this.style = {
      Com_ViewerBlock_: {
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        overflowY: 'auto'
      },
      Com_ViewerBlock_content_: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginBottom:'27px'
      },
      Com_ViewerBlock_panel_: {
        width: '100%',
        height: '2.1rem',
        boxSizing: 'border-box',
        margin: '1.2rem 0px 1.8rem',
      },
    };
  }

  _set_BlockMessage(message){
    this.setState({message: message});
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevProps.markKey !== this.props.markKey){
      this._set_stateDefault();
    }
  }

  componentDidMount(){
    this.boxContent.current.addEventListener('wheel', this._handleWheel_boxContent, {passive: false})
    //because the modern browser set the 'passive' property of addEventListener default to true,
    //so we could only add listener like this way to set the 'passive' manually.
    //and becuase we preventDefault in LayerScroll, the scroll will totally be ignore
    //so we need to stopPropagation if there is a scroll box in any child of LayerScroll
  }

  componentWillUnmount(){
    this.boxContent.current.removeEventListener('wheel',this._handleWheel_boxContent);
  }

  render(){
    const downToMdidline = this.props.downToMdidline;
    const toCircleLeft = this.props.toCircleLeft;// both props come from OpenedMark
    //we use these two cosnt to tune the position of whole <div> for not protruding out the view

    return(
      <div
        style={this.style.Com_ViewerBlock_}>
        <div
          ref={this.boxContent}
          style={Object.assign({}, this.style.Com_ViewerBlock_content_)}>
          <div
            style={{
              width: '100%',
              height: this.props.downToMdidline? (100 -this.props.inBlockHeight) +'vh': (this.props.inBlockHeight-69+4)+'vh'
            }}></div>
          <div
            className={classnames(styles.boxContentDraft, styles.fontContentDraft)}>
            <DraftDisplay
              editorState={this.props.markData.editorContent}/>
          </div>
          <div
            className={classnames(styles.boxPanelJump, styles.fontPanelJump)}>
            <PanelJump
              marksLength={this.props.marksLength}
              currentSerial={this.props.currentSerial}
              _set_markJump={this.props._set_markJump}/>
          </div>
        </div>
        <div
          className={classnames(styles.boxInteraction)}
          style={Object.assign(
            {},
            {
              height: this.props.downToMdidline? (this.props.inBlockHeight- 57)+'vh': (100 -this.props.inBlockHeight+14-4)+'vh'
            }
          )}>
          <div
            style={Object.assign({},this.style.Com_ViewerBlock_panel_)}>
            <div
              style={Object.assign(
                {},
                styleMiddle.boxPanelInteraction,
                {marginLeft: '69%',float: 'left'}
              )}>
              <ViewerBulb
                markKey={this.props.markKey}
                _set_BlockMessage={this._set_BlockMessage}/>
            </div>
          </div>
          {
            this.state.message &&
            <div
              style={styleMiddle.boxMessage}>
              <span style={styleMiddle.textMessage}>{this.state.message}</span>
            </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    userInfo: state.userInfo,
    unitCurrent: state.unitCurrent,
    unitSubmitting: state.unitSubmitting
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewerBlock);
