import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
} from '../_actions/types';


export default function(state={},action){
  switch(action.type){
    case LOGIN_USER:
      return { ...state, loginSucces: action.payload }
    case AUTH_USER:
      return {...state, userData: action.payload }
    default:
      return state;
  }
}