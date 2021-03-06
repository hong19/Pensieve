import React from 'react';
import {
  Link,
  Redirect,
  Route,
  withRouter
} from 'react-router-dom';
import {connect} from "react-redux";
import classnames from 'classnames';
import styles from "./stylesMainIndex.module.css";
import {
  nailChart,
  separationLine,
  axios_cosmic_IndexList,
  axios_visit_GET_last,
  axios_visit_Index
} from './utils.js';
import MainTitle from '../MainTitle/MainTitle.jsx';
import MainBanner from '../MainBanner/MainBanner.jsx';
import Unit from '../../../Unit/Unit/Unit.jsx';
import {
  handleNounsList,
  handleUsersList
} from "../../../redux/actions/general.js";
import {
  cancelErr,
  uncertainErr
} from '../../../utils/errHandlers.js';

const styleMiddle = {
  boxFooterInfo: {
    alignSelf: 'flex-end',
    margin: '4.2rem 0 1.6rem',
    padding: '2rem 1.2rem 0',
    color: '#ababab'
  },
  spanFooterInfo: {
    display: 'inline-block',
    boxSizing: 'border-block',
    marginRight: '0.42rem'
  },
  textFooterInfo: {
    fontSize: '1.21rem',
    letterSpacing: '0.1rem',
  }
}

class MainIndex extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      axios: false,
      lastVisit: false,
      unitsList: [],
      unitsBasic: {},
      marksBasic: {},
    };
    this.axiosSource = axios.CancelToken.source();
    this._construct_UnitInit = this._construct_UnitInit.bind(this);
    this._render_IndexNails = this._render_IndexNails.bind(this);
    this.style={
      withinCom_MainIndex_scroll_: {
        width: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        boxSizing: 'border-box'
      },
      withinCom_MainIndex_scroll_col_footer: {
        display: 'inline-block',
        width: '100%',
        height: '33vh',
        position: 'relative',
        boxSizing: 'border-box'
      },
    }
  }

  _construct_UnitInit(match, location){
    let unitInit= {marksify: false, initMark: "all", layer: 0};
    return unitInit;
  }

  componentDidMount(){
    const self = this;

    this.setState({axios: true});

    axios_visit_GET_last(self.axiosSource.token) //in the future, method to get basic (user)sheet data would join here
      .then((lastVisitObj)=>{
        self.setState({axios: false});

        //use promise to let the axios.all could be pass to .then even inside a callback
        return new Promise((resolve, reject)=>{
          self.setState((state, props)=>{
            return {
              lastVisit: lastVisitObj.main.lastTime,
              axios: true
            }
          }, ()=>{
            resolve(axios.all([
              axios_cosmic_IndexList(self.axiosSource.token),
              axios_visit_Index(self.axiosSource.token)
            ]));
          })

        });
      })
      .then(axios.spread (function(focusObj) {
        self.setState({axios: false});

        self.props._submit_NounsList_new(focusObj.main.nounsListMix);
        self.props._submit_UsersList_new(focusObj.main.usersList);

        self.setState((prevState, props)=>{
          return({
            axios: false,
            unitsList: focusObj.main.unitsList,
            unitsBasic: focusObj.main.unitsBasic,
            marksBasic: focusObj.main.marksBasic
          });
        });

      })).catch(function (thrown) {
        self.setState({axios: false});
        if (axios.isCancel(thrown)) {
          cancelErr(thrown);
        } else {
          let message = uncertainErr(thrown);
          if(message) alert(message);
        }
      });

  }

  componentWillUnmount(){
    if(this.state.axios){
      this.axiosSource.cancel("component will unmount.")
    }
  }

  _render_IndexNails(){
    this.patternRule = [[0,1],[0,1],2,2,1,1,1];
    let cycleLength = this.patternRule.length;

    let nailsIndex = []; //don't use .map() because we probably need to push twice in one round
    this.state.unitsList.forEach((unitId, index)=>{
      let remainder = index % cycleLength;
      let nailChoice = this.patternRule[remainder];
      if(remainder < 2) nailChoice = Number.isInteger((index+1)/2) ? nailChoice[1] : nailChoice[0];
      //plus 1 t index in isInteger() is for the '0'---would get false for 0/2

      let nail = nailChart(nailChoice, unitId, this);
      nailsIndex.push(nail);
      //diff remainder again for rendering 'separation line'
      let optionalLine = separationLine(remainder, index);
      if(optionalLine) nailsIndex.push(optionalLine);
    })

    return nailsIndex;
  }

  render(){
    return(
      <div>
        <div
          style={this.style.withinCom_MainIndex_scroll_}>
          <div
            className={classnames(styles.boxTop)}>
            <MainTitle
              _refer_von_cosmic={this.props._refer_von_cosmic}/>
            <div
              className={classnames(styles.boxBanner)}>
              <MainBanner
                lastVisit={this.state.lastVisit}
                _refer_von_cosmic={this.props._refer_von_cosmic}/>
            </div>
          </div>
          <div
            className={styles.boxScroll}>
            {this._render_IndexNails()}
            <div
              style={styleMiddle.boxFooterInfo}>
              <span style={Object.assign({}, styleMiddle.spanFooterInfo, styleMiddle.textFooterInfo)}>{"Cornerth."}</span>
              <br></br>
              <br></br>
              <span style={Object.assign({}, styleMiddle.spanFooterInfo, styleMiddle.textFooterInfo)}>{"about"}</span>
              <span style={Object.assign({}, styleMiddle.spanFooterInfo, styleMiddle.textFooterInfo)}>{"．"}</span>
              <span style={Object.assign({}, styleMiddle.spanFooterInfo, styleMiddle.textFooterInfo)}>{"contact"}</span>
              <span style={Object.assign({}, styleMiddle.spanFooterInfo, styleMiddle.textFooterInfo)}>{"．"}</span>
              <span style={Object.assign({}, styleMiddle.spanFooterInfo, styleMiddle.textFooterInfo)}>{"join"}</span>
            </div>
            <div style={this.style.withinCom_MainIndex_scroll_col_footer}></div>
          </div>
        </div>
        <Route
          path={"/unit"}
          render={(props)=> <Unit {...props} _construct_UnitInit={this._construct_UnitInit} _refer_von_unit={this.props._refer_von_cosmic}/>}/>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _submit_NounsList_new: (arr) => { dispatch(handleNounsList(arr)); },
    _submit_UsersList_new: (arr) => { dispatch(handleUsersList(arr)); }
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MainIndex));
