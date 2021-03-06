import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import styles from "./styleNavWalls.module.css";

const commonStyle = {
  align: { //make a frame first, decoupling from parent
    height: '100%',
    position: 'relative',
    boxSizing: 'border-box'
  },
  boxNavButton:{
    display: 'inline-block',
    width: '91.5px',
    height: '100%',
    position: 'relative',
    boxSizing: 'border-box',
    margin: "0px 8px 0px 6px",
  },
  spanButtonNavWalls: {
    top: '48%',
    fontSize: '1.42rem',
    fontWeight: '700',
    letterSpacing: '0.06rem',
  }
}

export default class NavWalls extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.style={

    }
  }

  render(){
    //let cx = cxBind.bind(styles);
    return(
      <div
        style={commonStyle.align}>
        <Link
          to={this.props.match.url+"/embedded/inspireds"}
          className={'plainLinkButton'}
          style={commonStyle.boxNavButton}>
          <div
            className={styles.roundRecBox}
            style={{backgroundColor: this.props.location.pathname.includes("/embedded/") ? "#e6e6e6":'transparent'}}>
            <span
              className={'centerAlignChild'}
              style={Object.assign({}, commonStyle.spanButtonNavWalls, {color: this.props.location.pathname.includes("/embedded/")? "#1a1a1a":'#757575'})}>
              {"inspired"}
            </span>
          </div>
        </Link>
        <Link
          to={this.props.match.url+"/actions/shareds"}
          className={'plainLinkButton'}
          style={commonStyle.boxNavButton}>
          <div
            className={styles.roundRecBox}
            style={{backgroundColor: this.props.location.pathname.includes("/actions/")? "#e6e6e6":'transparent'}}>
            <span
              className={'centerAlignChild'}
              style={Object.assign({}, commonStyle.spanButtonNavWalls, {color: this.props.location.pathname.includes("/actions/")? "#1a1a1a":'#757575'})}>
              {"shareds"}
            </span>
          </div>
        </Link>
      </div>
    )
  }
}
