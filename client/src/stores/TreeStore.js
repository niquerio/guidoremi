import {EventEmitter} from "events";
import dispatcher from '../dispatcher';
import UserStore from './UserStore';
import * as TreeActions from  '../actions/TreeActions'

class TreeStore extends EventEmitter{
  constructor(){
    super();
    this.tree = []
    this._reloadTree(); 
    var self = this
    UserStore.on("change", () => {
      self._reloadTree(); 
    });
  }
  _reloadTree() {
    if(UserStore.signedIn()){
      TreeActions.getTree()
    }
    else{
      this.tree = []
    }
  } 
  getTree() {
    return this.tree
  }

  handleActions(action){
    switch(action.type){
      case "RECEIVE_TREE": {
        this.tree = action.tree
        this.emit("change")
        break
      }
      default: {
        break
      }
    }
  }
}

const treeStore = new TreeStore()
dispatcher.register(treeStore.handleActions.bind(treeStore));

export default treeStore;
