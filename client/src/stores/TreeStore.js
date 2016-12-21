import {EventEmitter} from "events";
import dispatcher from '../dispatcher';
import UserStore from './UserStore';
import * as TreeActions from  '../actions/TreeActions'
import _ from 'lodash'

class TreeStore extends EventEmitter{
  constructor(){
    super();
    this.tree = []
    this._reloadTree(); 
    var self = this
    UserStore.addListener(() => {
      self._reloadTree(); 
    });
  }

//Private Functions
  _reloadTree() {
    if(UserStore.signedIn()){
      TreeActions.getTree()
    }
    else{
      this.tree = []
    }
  } 


//Public Functions
  getTree() {
    return this.tree
  }

//Handle Dispatched Actions
  handleActions(action){
    switch(action.type){
      case "RECEIVE_TREE": {
        this.tree = action.tree
        this.emit("change")
        break
      }
      case "UPDATE_LEAF": {
        var leafIndex = -1;
        var branchIndex =  _.findIndex(this.tree, function(a){
          leafIndex =  _.findIndex(a, { 'slug': action.slug });
          if (leafIndex > -1){ return true }
        });
        _.assign(this.tree[branchIndex][leafIndex], action.skill_score)
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
