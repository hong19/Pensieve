import {
  SET_SIGNINIT,
  SET_RESCODE,
  AXIOS_SWITCH,
  AXIOS_GET_RES
} from '../constants/typesSign.js';
import {
  initSign
} from '../constants/states.js';
import {errHandler_axiosCatch} from "../../utils/errHandlers.js";

export function setSignInit(){
  return {type: SET_SIGNINIT, initState: initSign}
}

export function setResCode(code){
  return {type: SET_RESCODE, code: code}
}

export function axiosSwitch(bool) {
  return { type: AXIOS_SWITCH, status: bool }
};

export function axiosGetRes(obj) {
  return {type: AXIOS_GET_RES, status: obj.axiosStatus, message: obj.message}
};

export function handleSignUser(submitObj, cancelToken){
  //this actoin creator, could do function return is because we use 'thunk' middleware when create store
  return (dispatch) => {
    dispatch({
      type: AXIOS_SWITCH,
      status: true
    })
    axios.post('/router/login', submitObj, {
      headers: {'charset': 'utf-8'},
      cancelToken: cancelToken
    }).then(function (res) {
      dispatch({
        type: AXIOS_SWITCH,
        status: false
      })
      window.localStorage['token'] = res.data.token; //'access token', used in usual case
      window.localStorage['tokenRefresh'] = res.data.tokenRefresh; //'refresh token', used in case the access token expired
      window.location.assign('/');
    }).catch(function (thrown) {
      if (axios.isCancel(thrown)) {
        dispatch({
          type: AXIOS_SWITCH,
          status: false
        })
        console.log('Request canceled: ', thrown.message);
      } else {
        if (thrown.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          let resConsole = thrown.response.data.console; // to verify the string length, this is neccessary.
          if(resConsole.length>0) console.log(thrown.response.data.console);

          if(thrown.response.data.code == "33") {
            dispatch({
              type: SET_RESCODE,
              code: thrown.response.data.code
            });
          };
          dispatch({
            type:   AXIOS_GET_RES,
            status: false,
            message: thrown.response.data.message
          });
        } else if (thrown.request) {
            // The request was made but no response was received
            // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            dispatch({
              type: AXIOS_SWITCH,
              status: false
            })
            console.log(thrown.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            dispatch({
              type: AXIOS_SWITCH,
              status: false
            })
        }
        console.log('Error: ', thrown.message);
      }
    });
  }
}
