import dispatcher from '../dispatcher';
import Auth from 'j-toker';

export function getUser(){
  dispatcher.dispatch({type: 'RECEIVE_USER',
    user: Auth.user
  }); 
}

export function signOutUser(){
  dispatcher.dispatch({type: 'SIGN_OUT_USER'});
}
