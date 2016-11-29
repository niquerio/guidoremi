import {EventEmitter} from "events";
//import * as UserActions from '../actions/UserActions'
import dispatcher from '../dispatcher';
import PubSub from 'pubsub-js';
import _ from 'lodash'

class UserStore extends EventEmitter{
  constructor(){
    super();
    this.user = {}
    var self = this
    PubSub.subscribe('auth.validation.success', function(ev, user) {
      self.handleActions({
        type: 'RECEIVE_USER',
        user: user
      });
    });
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
