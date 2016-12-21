import AnswerStore from '../AnswerStore'

describe('AnswerStore', function(){

  beforeEach(function(){
    this.state = AnswerStore.getInitialState();

    this.dispatch = action => {
      this.state = AnswerStore.reduce(this.state, action);
    };
  });


  it('initializes with no answer', function(){
    expect(this.state.isEmpty()).toEqual(true);
  });
  it('receives an answer', function(){
    expect(this.state.isEmpty()).toEqual(true);
    this.dispatch({
      type: 'RECEIVE_ANSWER',
      answer: {
        correct: true
      } 
    });
    expect(this.state.get('correct')).toEqual(true)
  });
  it('clears answer', function(){
    this.dispatch({
      type: 'RECEIVE_ANSWER',
      answer: {
        correct: true
      } 
    });
    expect(this.state.get('correct')).toEqual(true)

    this.dispatch({
      type: 'CLEAR_ANSWER',
    });

    expect(this.state.isEmpty()).toEqual(true)
    
  });
  

});



