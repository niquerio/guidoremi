import {EventEmitter} from "events";
import dispatcher from '../dispatcher';

class QuestionStore extends EventEmitter{
  constructor(){
    super();
    this.question = {}
      
  }

  getQuestion() {
    return this.question
  }

  handleActions(action){
    switch(action.type){
      case "RECEIVE_QUESTION": {
        this.question = action.question
        this.emit("change")
        break
      }
      default: {
        break
      }
    }
  }
}

const questionStore = new QuestionStore();
dispatcher.register(questionStore.handleActions.bind(questionStore));

export default questionStore;
