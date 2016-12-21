import Dispatcher from '../../dispatcher'
import QuestionStore from '../QuestionStore'

describe('QuestionStore', function(){

  beforeEach(function(){
    this.state = QuestionStore.getInitialState();

    this.dispatch = action => {
      this.state = QuestionStore.reduce(this.state, action);
    };
    this.receiveQuestion = {
      type: 'RECEIVE_QUESTION',
      question: {
        prompt: 'Prompt'
      } 
    }
  });


  it('initializes with no question', function(){
    expect(this.state.isEmpty()).toEqual(true);
  });
  it('receives an question', function(){
    expect(this.state.isEmpty()).toEqual(true);
    this.dispatch( this.receiveQuestion );

    expect(this.state.get('prompt')).toEqual('Prompt')
  });
  it('clears question', function(){
    this.dispatch( this.receiveQuestion );
    expect(this.state.get('prompt')).toEqual('Prompt')

    this.dispatch({
      type: 'CLEAR_QUESTION',
    });

    expect(this.state.isEmpty()).toEqual(true)
    
  });
  

});



