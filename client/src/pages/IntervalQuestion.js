import React from "react";
import {Button} from 'react-bootstrap';

import QuestionStore from "../stores/QuestionStore";
import * as QuestionActions from "../actions/QuestionActions";
import Choice from "../components/interval_question/Choice";
import * as AnswerActions from "../actions/AnswerActions";
import AnswerStore from "../stores/AnswerStore";
import $ from 'jquery'

export default class IntervalQuestion extends React.Component {
  constructor(){
    super();
    this.getQuestion = this.getQuestion.bind(this);
    this.showResult = this.showResult.bind(this);
    this.state = {
      question: null, 
      selected: null,
      correct_answer: null,
      result: null,
    };
  }
  componentWillMount(){
    QuestionActions.getNewQuestion(this.props.params.qg)
    QuestionStore.on('change', this.getQuestion)
    AnswerStore.on('change', this.showResult)
  }
  componentWillUnmount(){
    QuestionStore.removeListener('change', this.getQuestion)
    AnswerStore.removeListener('change', this.showResult)
    QuestionActions.clear();
    AnswerActions.clear();
  }

  getQuestion(){
    this.setState({question: QuestionStore.getQuestion() });
  }

  showResult(){
    var answer = AnswerStore.getAnswer()
    this.setState({
      result: answer.result,
      correct_answer: answer.correct_answer,
    });
  }

  changeSelected(selected){
    this.setState({selected})
  }

  submit(e){
    if(e.target.textContent === "Submit"){
      if(this.state.selected){
        AnswerActions.checkAnswer(this.state.question.id, this.state.selected)
      }
    }
    else{
      this.setState({
        question: null,
        selected: null,
        correct_answer: null,
        result: null,
      })
      QuestionActions.getNewQuestion(this.props.params.qg);
    }
  }

  render() {
    if(this.state.question){
      const {choices} = this.state.question
      const {question} = this.state
      const {correct_answer} = this.state
      const answer_mode = correct_answer != null;

      var result_text = '', button_text = '';
      if( correct_answer) {
        button_text = 'Next Question' 
      }else{ 
        button_text = 'Submit';
      }
      if (correct_answer){
        if (this.state.result){
          result_text = 'Correct!'
        }else{
          var correct_choice = $.grep(this.state.question.choices, 
            function(e){ 
              return e.id === parseInt(correct_answer, 10)
          })
          result_text = 'Incorrect. The correct answer was ' + correct_choice[0].name
        }
      }

      
      const ChoiceComponents = choices.map((choice)=>{
        return <Choice answer_mode={answer_mode} key={choice.id} choice={choice} changeSelected={this.changeSelected.bind(this)}/>; 
      }); 
      return(<div>
        <h1>{question.prompt}</h1>
        <div className="radio">
        {ChoiceComponents} 
        </div>
        <Button id="submit" onClick={this.submit.bind(this)}>{button_text}</Button>
        <p id="result">{result_text}</p>
      </div>)
    }else{
      return null
    }
  } 
}
