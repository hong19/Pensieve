import React from 'react';
import {
  Route,
  Link,
  withRouter
} from 'react-router-dom';
import {connect} from "react-redux";
import Sheet from './component/Sheet.jsx';
import NavFrontShelf from './component/NavFront/NavFrontShelf.jsx';
import MaskProcessing from '../Component/MaskProcessing.jsx';

const styleMiddle ={
  spanReturn: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    fontSize: '1.54rem',
    fontWeight: '400',
    letterSpacing: '0.18rem',
    color: '#ff7a5f'
  },
  linkPlain: {
    textDecoration: 'none',
    cursor: 'pointer'
  }
}

class FrontProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.style={
      Front_Profile_: {
        width: '100%',
        height: '100%',
        position: 'static',
        top: '0%',
        left: '0%'
      },
      Front_Profile_return_: {
        position: 'fixed',
        bottom: '0%',
        left: '70%',
        boxSizing: 'border-box',
        cursor: 'pointer'
      },
      Front_Profile_scroll_: {
        width: '72%',
        position: 'absolute',
        top: '2%',
        left: '18%',
        boxSizing: 'border-box'
      },
      Front_Profile_nav_: {
        width: '9%',
        height: '30%',
        position: 'absolute',
        top: '32%',
        left: '5%',
        boxSizing: 'border-box',
        padding: '0 0.5vw',
        borderRight: 'solid 1px #909090',
        textAlign: 'right',
        fontSize: '1.4rem',
        letterSpacing: '0.15rem'
      },
      Front_Profile_nav_span: {
        display: 'inline-block',
        width: '100%',
        position: 'relative',
        float: 'right',
        boxSizing: 'border-box',
        padding: '0 0.2vw',
        margin: '0.2vh 0',
        cursor: 'pointer'
      },
      Front_Profile_backPlane_top: {
        width: '100%',
        height: '1%',
        position: 'fixed',
        top: '0',
        left: '0',
        backgroundColor: '#FFFFFF'
      },
      Front_Profile_backPlane_bottom: {
        width: '100%',
        position: 'fixed',
        bottom: '0',
        left: '0',
        backgroundColor: '#FFFFFF'
      },
      Front_Profile_backPlane_nav_Front: {
        width: '32%',
        height: '100%',
        position: 'absolute',
        bottom: '0',
        right: '0',
        boxSizing: 'border-box',
        backgroundColor: '#d3deda'
      }
    }
  }

  render(){
    //let cx = cxBind.bind(styles);
    return(
      <div
        style={this.style.Front_Profile_}>
        <div
          style={this.style.Front_Profile_scroll_}>
          <Route path={this.props.match.path+"/sheet"} render={(props)=> <Sheet {...props}/>}/>
        </div>
        <div style={this.style.Front_Profile_backPlane_top}></div>
        <div
          className={'selfFront-fixedBottomBox-height'}
          style={this.style.Front_Profile_backPlane_bottom}>
          <div
            style={this.style.Front_Profile_backPlane_nav_Front}>
          </div>
        </div>
        <div
          className={'selfFront-fixedBottomBox-height'}
          style={Object.assign({},this.style.Front_Profile_return_, styleMiddle.spanReturn)}>
          <Link
            to={this.props.location.state.from}
            style={styleMiddle.linkPlain}>
            <div
              className={'verticalAlignChild'}
              style={cursor: 'pointer'}>
              {"back"}
            </div>
          </Link>
        </div>
        <div
          style={this.style.Front_Profile_nav_}>
          <span style={this.style.Front_Profile_nav_span}>{"about "}</span>
          <span style={this.style.Front_Profile_nav_span}>{"binders "}</span>
        </div>
        {
          (this.props.settingSubmitting || this.props.axios) &&
          <MaskProcessing/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    userInfo: state.userInfo,
    settingSubmitting: state.settingSubmitting,
    axios: state.axios
  }
}
export default withRouter(connect(
  mapStateToProps,
  null
)(FrontProfile));
