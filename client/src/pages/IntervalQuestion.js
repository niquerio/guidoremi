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
    console.log('show result')
  }

  changeSelected(selected){
    this.setState({selected})
  }

  submit(e){
    if(e.target.textContent === "Submit"){
      if(this.state.selected){
        console.log('check_id')
        AnswerActions.checkAnswer(this.state.question.id, this.state.selected)
        var result, correct 
        //({result, correct} = AnswerStore.getCorrect(this.state.selected,this.props.params.qg))
        $('#submit').text('Next Question') 
        $('input[name=choicesRadio]').attr('disabled','disabled')
        if(result){
          $('#result').text('Correct!')
        }else{
          var correctChoice = $.grep(this.state.question.choices, 
            function(e){ 
              return e.id === correct
          })
          $('#result').text('Incorrect. The correct answer was ' + correctChoice[0].name)
        }
        
      }
    }
    else{
      this.setState({
        question: QuestionStore.getNewQuestion(this.props.params.qg),
        selected: null
      })
      $('#submit').text('Submit') 
      $('input[name=choicesRadio]').removeAttr('disabled').prop('checked',false);
      $('#result').text('')
      
    }
  }

  render() {
    if(this.state.question){
      const {choices} = this.state.question
      const {question} = this.state
      const ChoiceComponents = choices.map((choice)=>{
        return <Choice key={choice.id} choice={choice} changeSelected={this.changeSelected.bind(this)}/>; 
      }); 
      return(<div>
        <h1>{question.prompt}</h1>
        <div className="radio">
        {ChoiceComponents} 
        </div>
        <Button id="submit" onClick={this.submit.bind(this)}>Submit</Button>
        <p id="result"></p>
      </div>)
    }else{
      return null
    }
  } 
}
