import React from "react";
import {Button} from 'react-bootstrap';

import QuestionStore from "../stores/QuestionStore";
import * as QuestionActions from "../actions/QuestionActions";
import Choice from "../components/interval_question/Choice";
import Score from "../components/interval_question/Score";
import * as AnswerActions from "../actions/AnswerActions";
import AnswerStore from "../stores/AnswerStore";
import SkillStore from "../stores/SkillStore";
import _ from 'lodash'

export default class IntervalQuestion extends React.Component {
  constructor(){
    super();
    this.getQuestion = this.getQuestion.bind(this);
    this.showResult = this.showResult.bind(this);
    this.getScore = this.getScore.bind(this);
    this.state = {
      score: {},
      question: null, 
      selected: null,
      correct_answer: null,
      result: null,
    };
  }
  componentWillMount(){
    this.getScore();
    QuestionActions.getNewQuestion(this.props.params.qg)
    this.questionListener = QuestionStore.addListener(this.getQuestion)
    SkillStore.on('change', this.getScore)
    this.answerListener = AnswerStore.addListener(this.showResult)
  }
  componentWillUnmount(){
    SkillStore.removeListener('change', this.getScore)
    this.questionListener.remove();
    this.answerListener.remove();
    QuestionActions.clear();
    AnswerActions.clear();
  }

  getScore(){
    var score = SkillStore.getScore(this.props.params.qg)
    this.setState({
      score: score,
    });
    
  }

  getQuestion(){
    this.setState({question: QuestionStore.getState() });
  }

  showResult(){
    var answer = AnswerStore.getState()
    this.setState({
      result: answer.get('result'),
      correct_answer: answer.get('correct_answer'),
    });
  }

  changeSelected(selected){
    this.setState({selected})
  }

  submit(e){
    if(e.target.textContent === "Submit"){
      if(this.state.selected){
        AnswerActions.checkAnswer(this.state.question.get('id'), this.state.selected)
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
      const {question} = this.state
      const choices = question.get('choices')
      const {correct_answer} = this.state
      const {score} = this.state
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
          var correct_choice = _.findIndex(choices, 
            function(e){ 
              return e.id === parseInt(correct_answer, 10)
          })
          result_text = 'Incorrect. The correct answer was ' + choices[correct_choice].name
        }
      }

      const ChoiceComponents = choices.map((choice)=>{
        return <Choice answer_mode={answer_mode} key={choice.get('id')} choice={choice} changeSelected={this.changeSelected.bind(this)}/>; 
      }); 
      return(<div>
        <Score score={score}/>
        <h1>{question.get('prompt')}</h1>
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
