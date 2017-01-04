import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';
import dispatcher from '../dispatcher';
import UserStore from './UserStore';
import * as TreeActions from  '../actions/TreeActions'

class TreeStore extends ReduceStore{
  constructor(){
    super(dispatcher);
    this._reloadTree(); 
    var self = this
    UserStore.addListener(() => {
      self._reloadTree(); 
    });
  }

  getInitialState(){
    return Immutable.List();
  }

//Private Functions
  _reloadTree() {
    if(UserStore.signedIn()){
      TreeActions.getTree()
    }
    //Need Clear Tree Action
  } 


//Public Functions

//Handle Dispatched Actions
  reduce(state, action){
    switch(action.type){
      case "RECEIVE_TREE": {
        return Immutable.fromJS(action.tree)
      }
      case "UPDATE_LEAF": {
        var index = [-1,-1]
        index[0] = state.findIndex(function(item){
          index[1] = item.findIndex(function(leaf){   
            return leaf.get('slug') === action.slug 
          });
          return index[1] >= 0
        });

        return state.mergeIn(index, Immutable.fromJS(action.skill_score)); 
      }
      default: {
        return state;
      }
    }
  }

}

const treeStore = new TreeStore()

export default treeStore;
