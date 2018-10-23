import React from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';
import cxBind from 'classnames/bind';
import UnitModal from './UnitModal.jsx';
import ResModal from './ResModal.jsx';
import ModalBox from './ModalBox.jsx';
import ModalBackground from './ModalBackground.jsx';

export default class Unit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      axios: false,
      close: false,
      mode: this.props.unitMode?this.props.unitMode:false,
      unitSet: {
        coverSrc: null,
        beneathSrc: null,
        coverMarksObj: null,
        beneathMarksObj: null,
        refsArr: null,
        nouns: null,
        authorBasic: null,
        identity: null
      }
    };
    this._close_modal_Unit = this._close_modal_Unit.bind(this);
    this.unitId = this.props.match.params.id;
    this.axiosSource = axios.CancelToken.source();
    this.unitInit = this.props._construct_UnitInit(this.props.match, this.props.location);
    this._set_axios = (bool) => {this.setState((prevState, props)=>{return {axios: bool};})};
    this._set_Modalmode = (mode)=>{this.setState((prevState, props)=>{return {mode: mode}})};
    this._axios_getUnitData = () => {
      return axios.get('/router/unit/general/mount?unitName=unitName_'+this.unitId, {
        headers: {
          'charset': 'utf-8',
          'token': window.localStorage['token']
        }
      })
    };
    this._axios_getUnitImg = (layer)=>{
      return axios.get('/router/img/'+this.unitInit[layer]+'?type=unitSingle', {
        headers: {
          'token': window.localStorage['token']
        }
      })
    };
    this.style={

    };
  }

  _close_modal_Unit(){
    this.setState((prevState, props)=>{
      return {
        close: true
      }
    })
  }

  componentDidMount(){
    const self = this;
    let beneathify = !!this.unitInit['pic_layer1'];
    let axiosArr = [this._axios_getUnitData(),this._axios_getUnitImg('pic_layer0')];
    if(beneathify){axiosArr.push(this._axios_getUnitImg('pic_layer1'))};
    axios.all(axiosArr).then(
      axios.spread(function(resData, resImgCover, resImgBeneath){
        let resObj = JSON.parse(resData.data);
        let keysArr = Object.keys(resObj.main.marksObj);
        let [coverMarksObj, beneathMarksObj] = [{}, {}];
        keysArr.forEach(function(key, index){
          if(resObj.main.marksObj[key].layer==0){
            coverMarksObj[key]=resObj.main.marksObj[key]
          }else{
            beneathMarksObj[key]=resObj.main.marksObj[key]
          }
        })

        self.setState({
          axios: false,
          unitSet: {
            coverSrc: resImgCover.data,
            beneathSrc: beneathify?resImgBeneath.data:null,
            coverMarksObj: coverMarksObj,
            beneathMarksObj: beneathMarksObj,
            refsArr: resObj.main.refsArr,
            nouns: resObj.main.nouns,
            authorBasic: resObj.main.authorBasic,
            identity: resObj.main.identity
          }
        });
      })
    ).catch(function (thrown) {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled: ', thrown.message);
      } else {
        console.log(thrown);
        self.setState({axios: false});
        alert("Failed, please try again later");
      }
    });
  }

  componentWillUnmount(){
    if(this.state.axios){
      this.axiosSource.cancel("component will unmount.")
    }
  }

  render(){
    //let cx = cxBind.bind(styles);
    if(this.state.close){return <Redirect to={this.props.location.state.from}/>}

    return(
      <ModalBox containerId="root">
        <ModalBackground onClose={this._close_modal_Unit} style={{position: "fixed"}}>
          <ResModal
            unitId={this.unitId}
            mode={this.state.mode}
            _set_axios={this._set_axios}
            _set_Modalmode={this._set_Modalmode}/>
          <UnitModal
            unitId={this.unitId}
            mode={this.state.mode}
            unitInit={this.unitInit}
            unitSet= {this.state.unitSet}
            _set_Modalmode={this._set_Modalmode}
            _close_modal_Unit={this._close_modal_Unit}
            _refer_von_unit={this.props._refer_von_unit}/>
        </ModalBackground>
      </ModalBox>
    )
  }
}
