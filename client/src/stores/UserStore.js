import {EventEmitter} from "events";
//import * as UserActions from '../actions/UserActions'
import dispatcher from '../dispatcher';
import _ from 'lodash'

class UserStore extends EventEmitter{
  constructor(){
    super();
    this.user = {}
  }


  getUser(){
    return this.user
  }
  signedIn(){
    return !(_.isEmpty(this.user))
  }

  handleActions(action){
    switch(action.type){
      case "RECEIVE_USER":{
        console.log('user_received')
        this.user = _.clone(action.user, true);
        this.emit("change");
        break
      }
      case "SIGN_OUT_USER":{
        this.user = {}
        this.emit("change")
        break
      }
      default: {
        break
      }
    }
  }
}


const userStore = new UserStore()
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
