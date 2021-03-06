import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import {connect} from "react-redux";
import cxBind from 'classnames/bind';
import FrontCognition from './Front_Cognition.jsx';
import FrontProfile from './Front_Profile.jsx';
import NavSelf from './component/NavSelf.jsx';

class Front extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.style={
      Self_pages_Front_NavSelf: {
        display:'inline-block',
        minWidth: '285px',
        maxWidth: '360px',
        position: 'fixed',
        bottom: '0%',
        left: '19%',
        boxSizing: 'border-box'
      }
    }
  }

  render(){
    //let cx = cxBind.bind(styles);
    return(
      <Router
        basename={"/user"}>
        <div>
          <Route path="/cognition" render={(props)=> <FrontCognition {...props}/>}/>
          <Route path="/profile" render={(props)=> <FrontProfile {...props}/>}/>
          <div
            className={"selfFront-fixedBottomBox-height"}
            style={this.style.Self_pages_Front_NavSelf}>
            <NavSelf {...this.props}/>
          </div>
        </div>
      </Router>
    )
  }
}

export default connect()(Front);
