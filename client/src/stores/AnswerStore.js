import {ReduceStore} from 'flux/utils';
import dispatcher from '../dispatcher';
import _ from 'lodash'

class AnswerStore extends ReduceStore{
  constructor(){
    super(dispatcher);
  }

  getInitialState(){
    return {};
  }

  getState(){
    return _.clone(this._state, true) 
  }

  reduce(state, action){
    switch(action.type){
      case "RECEIVE_ANSWER": {
        return _.clone(action.answer, true);
      }
      case "CLEAR_ANSWER": {
        return{}
      }
      default: {
        return state;
      }
    }
  }
}

const answerStore = new AnswerStore()
export default answerStore;
