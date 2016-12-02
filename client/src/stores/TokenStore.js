import {EventEmitter} from "events";
import dispatcher from '../dispatcher';

class TokenStore extends EventEmitter{
  constructor(){
    super();
    this.header = {}
  }

  getHeader(){
    return this.header
  }
  handleActions(action){
    switch(action.type){
      case "RECEIVE_HEADER": {
        this.header = action.header
        break
      }
      default: {
        break
      }
    }
  }
}
const tokenStore = new TokenStore()
dispatcher.register(tokenStore.handleActions.bind(tokenStore));

export default tokenStore;
