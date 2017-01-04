import {ReduceStore} from "flux/utils";
import dispatcher from '../dispatcher';
import Immutable from 'immutable';

class QuestionStore extends ReduceStore{
  constructor(){
    super(dispatcher);
      
  }

  getInitialState() {
    return Immutable.Map();
  }

  reduce(state, action){
    switch(action.type){
      case "RECEIVE_QUESTION": {
        return Immutable.fromJS(action.question)
      }
      case "CLEAR_QUESTION": {
        return state.clear();
      }
      default: {
        return state;
      }
    }
  }
}

const questionStore = new QuestionStore();

export default questionStore;
