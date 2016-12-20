import Dispatcher from '../../dispatcher'
import AnswerStore from '../AnswerStore'

describe('AnswerStore', function(){

  beforeEach(function(){
    this.state = AnswerStore.getInitialState();

    this.dispatch = action => {
      this.state = AnswerStore.reduce(this.state, action);
    };
  });


  it('initializes with no answer', function(){
    expect(this.state).toEqual({});
  });
  it('receives an answer', function(){
    expect(this.state).toEqual({});
    this.dispatch({
      type: 'RECEIVE_ANSWER',
      answer: {
        correct: true
      } 
    });
    expect(this.state.correct).toEqual(true)
  });
  it('clears answer', function(){
    this.dispatch({
      type: 'RECEIVE_ANSWER',
      answer: {
        correct: true
      } 
    });
    expect(this.state.correct).toEqual(true)

    this.dispatch({
      type: 'CLEAR_ANSWER',
    });

    expect(this.state).toEqual({})
    
  });
  

});



