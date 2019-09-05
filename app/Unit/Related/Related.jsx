import React from 'react';
import {
  Link,
  Redirect,
  Route,
  withRouter
} from 'react-router-dom';
import {connect} from "react-redux";
import classnames from 'classnames';
import styles from "./styles.module.css";
import RelatedList from '../RelatedList/RelatedList.jsx';
import RelatedOrigin from '../RelatedOrigin/RelatedOrigin.jsx';

const styleMiddle = {

}

class Related extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.style={

    }
  }

  componentDidUpdate(prevProps, prevState, snapshot){

  }

  componentDidMount(){

  }

  componentWillUnmount(){

  }

  render(){
    let params = new URLSearchParams(this.props.location.search); //we need value in URL query
    this.unitId = params.get('unitId');

    return(
      <div
        className={classnames(styles.comRelated)}>
        <div
          className={classnames(styles.boxTop)}>
          <RelatedOrigin
            {...this.props}/>
        </div>
        <div
          className={classnames(styles.boxList)}>
          <RelatedList
            {...this.props}
            unitId={this.unitId}/>
        </div>
        <div
          className={styles.footer}>
        </div>
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

  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Related));