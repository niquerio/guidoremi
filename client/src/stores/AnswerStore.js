import {EventEmitter} from "events";

class AnswerStore extends EventEmitter{
  constructor(){
    super();
    this.answers = 
      { 
        'so-mi': 
          {
            correct_answer: 1,
          },
        'so-la': 
          {
            correct_answer: 3,
          },
        'mi-la': 
          {
            correct_answer: 6,
          }
    }  
  }

  getCorrect(answer,slug) {
    var correct = this.answers[slug.slice(0,-2)].correct_answer 
    return { result: correct == answer, correct: correct}
  }
}

const answerStore = new AnswerStore

export default answerStore;
