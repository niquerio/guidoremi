import Immutable from 'immutable'; 
import {ReduceStore} from 'flux/utils';
import dispatcher from '../dispatcher';

class UserStore extends ReduceStore{
  constructor(){
    super(dispatcher);
  }

  getInitialState(){
    return Immutable.Map(); 
  }

  signedIn(){
    return !(this._state.isEmpty())
  }

  reduce(state, action){
    switch(action.type){
      case "RECEIVE_USER":{
        return Immutable.fromJS(action.user)
      }
      case "SIGN_OUT_USER":{
        
        return state.clear();
      }
      default: {
        return state;
      }
    }
  }
}


const userStore = new UserStore()

export default userStore;
