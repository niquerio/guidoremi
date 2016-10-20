import React from "react";

import QuestionStore from "../stores/QuestionStore";
import Choice from "../components/interval_question/Choice";
import AnswerStore from "../stores/AnswerStore";

export default class IntervalQuestion extends React.Component {
  constructor(){
    super();
    this.state = {
      question: null, 
      selected: null,
    };
  }
  componentWillMount(){
    this.setState({question: QuestionStore.getNewQuestion(this.props.params.qg)})
  }
  changeSelected(selected){
    this.setState({selected})
  }
  submit(e){
    if(e.target.textContent == "Submit"){
      if(this.state.selected){
        var result, correct 
        ({result, correct} = AnswerStore.getCorrect(this.state.selected,this.props.params.qg))
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
    const {choices} = this.state.question
    const {question} = this.state
    const ChoiceComponents = choices.map((choice)=>{
      return <Choice key={choice.id} choice={choice} changeSelected={this.changeSelected.bind(this)}/>; 
    }); 
    return(<div>
      <h1>{question.prompt}</h1>
      <div class="radio">
      {ChoiceComponents} 
      </div>
      <button id="submit" onClick={this.submit.bind(this)}class="btn btn-default">Submit</button>
      <p id="result"></p>
    </div>)
  }
  
}
