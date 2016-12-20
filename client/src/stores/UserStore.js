import {ReduceStore} from 'flux/utils';
import dispatcher from '../dispatcher';
import _ from 'lodash'

class UserStore extends ReduceStore{
  constructor(){
    super(dispatcher);
  }

  getInitialState(){
    return {};
  }

  getState(){
    return _.clone(this._state, true) 
  }


  signedIn(){
    return !(_.isEmpty(this._state))
  }

  reduce(state, action){
    switch(action.type){
      case "RECEIVE_USER":{
        return _.clone(action.user, true);
      }
      case "SIGN_OUT_USER":{
        
        return {}
      }
      default: {
        return state;
      }
    }
  }
}


const userStore = new UserStore()

export default userStore;
