import dispatcher from '../dispatcher';
import Auth from 'j-toker';


export function signOutUser(){
  Auth.signOut();
  dispatcher.dispatch({type: 'SIGN_OUT_USER'});
}
