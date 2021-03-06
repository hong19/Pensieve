import { combineReducers } from 'redux';
import {
  MOUNT_USERINFO,
  SET_UNITCURRENT,
  SET_UNITINSPIRED,
  UNIT_SUBMITTING_SWITCH,
  UNIT_AXIOSINSPIRE_SWITCH,
  UPDATE_NOUNSBASIC,
  UPDATE_USERSBASIC,
  AXIOS_SWITCH
} from '../constants/typesGeneral.js';
import {
  UPDATE_USERSHEET,
  UPDATE_ACCOUNTSET,
  SET_COGNITION_BELLNOTIFY,
  SET_COGNITION_LISTNOTIFY,
  SETTING_SUBMITTING_SWITCH
} from '../constants/typesSelfFront.js';
import {
  initGlobal,
  initUnit,
  initSetting,
  initNouns,
  initUsers,
  initSelfFrontGeneral
} from '../constants/states.js';

//this is a temp management, in case one day we will seperate the reducer like the initstate
const initialGeneral = Object.assign({}, initGlobal, initUnit, initSetting, initNouns, initUsers, initSelfFrontGeneral);

function pageSelfFront(state = initialGeneral, action){
  switch (action.type) {
    case MOUNT_USERINFO:
      return Object.assign({}, state, {
        userInfo: action.userInfo
      })
      break;
    case SET_UNITCURRENT:
      return Object.assign({}, state, {
        unitCurrent: action.unitCurrent
      })
      break;
    case SET_UNITINSPIRED:
      return Object.assign({}, state, {
        unitCurrent: {...state.unitCurrent, ...action.nextMarksInteraction}
      })
      break;
    case UNIT_SUBMITTING_SWITCH:
      return Object.assign({}, state, {
        unitSubmitting: action.unitSubmitting
      })
      break;
    case UNIT_AXIOSINSPIRE_SWITCH:
      return Object.assign({}, state, {
        unitAxiosInspire: action.unitAxiosInspire
      })
      break;
    case UPDATE_USERSHEET:
      return Object.assign({}, state, {
        userSheet: action.userSheet,
        accountSet: action.accountSet
      })
      break;
    case UPDATE_ACCOUNTSET:
      return Object.assign({}, state, {
        accountSet: action.accountSet
      })
      break;
    case SET_COGNITION_BELLNOTIFY:
      return Object.assign({}, state, {
        cognition: {...state.cognition, bellNotify: action.bellNotify}
      })
      break;
    case SET_COGNITION_LISTNOTIFY:
      return Object.assign({}, state, {
        cognition: {...state.cognition, listNotify: action.listNotify}
      })
      break;
    case SETTING_SUBMITTING_SWITCH:
        return Object.assign({}, state, {
        settingSubmitting: action.settingSubmitting
      })
      break;
    case UPDATE_NOUNSBASIC:
      return Object.assign({}, state, {
        nounsBasic: {...state.nounsBasic, ...action.newFetch}
      })
      break;
    case UPDATE_USERSBASIC:
      return Object.assign({}, state, {
        usersBasic: {...state.usersBasic, ...action.newFetch}
      })
      break;
    case AXIOS_SWITCH:
      return Object.assign({}, state, {
        axios: action.status
      })
      break;
    default:
      return state
  }
}

export default pageSelfFront
