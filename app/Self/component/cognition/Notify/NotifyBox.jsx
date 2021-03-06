import React from 'react';
import {connect} from "react-redux";
import {
  Link,
  withRouter,
} from 'react-router-dom';
import {
  handleNotifyBox
} from '../../../../redux/actions/cognition.js';

const styleMiddle = {
  boxNotifyBox: {
    width: '100%',
    maxHeight: '900%',
    minHeight: '320%',
    position: 'absolute',
    bottom: '102%',
    left: '0',
    boxSizing: 'border-box',
    boxShadow: '0.056rem -0.16rem 0.21rem -0.06rem',
    borderRadius: '0.21rem',
    backgroundColor: 'white',
    overflow: 'auto'
  },
  boxNotifyItem:{
    display: 'inline-block',
    height: '54px',
    boxSizing: 'border-box',
    margin: '2% 0',
    borderBottom: '1px solid black',
    padding: '2% 3%',
    cursor: 'pointer'
  },
  fontNotifyItem: {
    fontSize: '1.28rem'
  }
};

class NotifyBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.axiosSource = axios.CancelToken.source();
    this._render_NotifyList = this._render_NotifyList.bind(this);
    this.style={

    }
  }

  _render_NotifyList(){
    const self = this;
    let list = this.props.cognition.listNotify.map((item, index)=>{
      //should check item type here to determine which template should be used
      //but for now we only have the notifications for inspired, so, no need
      //(only 'inspired' template now)
      return (
        <div
          key={'key_Notify_item_'+index}
          className={'boxRelativeFull'}
          style={Object.assign({}, styleMiddle.boxNotifyItem, {backgroundColor: (item.status=="untouched")? '#edeed3': 'white'})}>
          <Link
            to={{
              pathname: "/cognition/actions/shareds/unit",
              search: '?theater&unitId='+item.unitId,
              state: {from: "/cognition/actions/shareds"}
            }}
            className={'plainLinkButton'}>
            <div
              style={{
                display: 'inline-block',
                width: '27%',
                height: '100%'
              }}>
              <span
                style={styleMiddle.fontNotifyItem}>{self.props.usersBasic[item.userId].account}</span>
            </div>
            <span
              style={styleMiddle.fontNotifyItem}>{" was inspired by one of your paragraph."}</span>
          </Link>
        </div>
      )
    })
    //and add a footer in the box
    list.push(
      <div
        key={"key_Notify_item_footer"}
        style={{display: 'inline-block', width: '100%', height: '24px', margin:'2% 0px'}}></div>
    );

    return list;
  }

  componentDidMount(){
    this.props._get_NotifyList(this.axiosSource.token);
  }

  componentWillUnmount(){

  }

  render(){
    return(
      <div className={'boxRelativeFull'}>
        <div
          style={styleMiddle.boxNotifyBox}>
          {this._render_NotifyList()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    userInfo: state.userInfo,
    usersBasic: state.usersBasic,
    unitCurrent: state.unitCurrent,
    cognition: state.cognition
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    _get_NotifyList: (cancelToken)=>{dispatch(handleNotifyBox(cancelToken));}
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NotifyBox));
