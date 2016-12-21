import Dispatcher from '../../dispatcher'
import UserStore from '../UserStore'

describe('UserStore', function(){

  beforeEach(function(){
    this.state = UserStore.getInitialState();

    this.dispatch = action => {
      this.state = UserStore.reduce(this.state, action);
    };
  });


  it('initializes with no user', function(){
    expect(this.state.isEmpty()).toEqual(true);
  });
  it('receives a user', function(){
    expect(this.state.isEmpty()).toEqual(true);
    this.dispatch({
      type: 'RECEIVE_USER',
      user: {
        email: 'blah@example.com'
      } 
    });
    expect(this.state.get('email')).toEqual('blah@example.com')
  });
  it('signs out a user', function(){
    this.dispatch({
      type: 'RECEIVE_USER',
      user: {
        email: 'blah@example.com'
      } 
    });
    expect(this.state.get('email')).toEqual('blah@example.com')

    this.dispatch({
      type: 'SIGN_OUT_USER'
    });

    expect(this.state.isEmpty()).toEqual(true)
    
  });
  describe('signedIn()', function(){
    beforeEach(function(){
      Dispatcher.dispatch({
        type: 'SIGN_OUT_USER'
      });
    });
    it('returns true if user is signed in', function(){
        Dispatcher.dispatch({
          type: 'RECEIVE_USER',
          user: {
            email: 'blah@example.com'
          } 
        });
        expect(UserStore.signedIn()).toEqual(true)
    });
    it('signedIn() returns false if user is not signed in', function(){
        expect(UserStore.signedIn()).toEqual(false)
    });
  });
  

});



