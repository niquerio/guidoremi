import {EventEmitter} from "events";
import dispatcher from '../dispatcher';

class AnswerStore extends EventEmitter{
  constructor(){
    super();
    this.answers = {}
  }

  getAnswer(){
    return this.answer
  }

  handleActions(action){
    switch(action.type){
      case "RECEIVE_ANSWER": {
        this.answer = action.answer
        this.emit("change")
        break
      }
      default: {
        break
      }
    }
  }
}

const answerStore = new AnswerStore()
dispatcher.register(answerStore.handleActions.bind(answerStore));
export default answerStore;
