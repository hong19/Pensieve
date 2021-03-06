import { combineReducers } from 'redux';
import {
  MOUNT_USERINFO,
  SET_UNITCURRENT,
  SET_UNITINSPIRED,
  UNIT_SUBMITTING_SWITCH,
  UNIT_AXIOSINSPIRE_SWITCH,
  UPDATE_NOUNSBASIC,
  UPDATE_USERSBASIC
} from '../constants/typesGeneral.js';
import {
  SET_COSMIC_TITLE,
} from '../constants/typesCosmic.js';
import {
  initGlobal,
  initCosmicGeneral,
  initUnit,
  initNouns,
  initUsers
} from '../constants/states.js';

//this is a temp management, in case one day we will seperate the reducer like the initstate
const initialGeneral = Object.assign({}, initGlobal, initCosmicGeneral, initUnit, initNouns, initUsers);

function pageWithin(state = initialGeneral, action){
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
    case SET_COSMIC_TITLE:
      return Object.assign({}, state, {
        mainTitle: action.ratio
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
    default:
      return state
  }
}

export default pageWithin
