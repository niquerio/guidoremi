jest.enableAutomock()
jest.dontMock('../UserStore');

import dispatcher from '../../dispatcher';
import UserStore from '../UserStore'

describe('UserStore', function(){
  var actionReceiveUser = {
    action: {
      type: 'RECEIVE_USER',
      user: {
        email: 'blah@example.com'
      } 
    }
  };
  var callback;

  beforeEach(function(){
    callback = dispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function(){
    expect(dispatcher.register.mock.calls.length).toBe(1);
  });
  it('initializes with no user', function(){
    var user = UserStore.getUser();
    expect(user).toEqual({});
  });
  it('receives a user', function(){
    callback(actionReceiveUser);
    var user = UserStore.getUser()
    expect(user.email).toEqual('blah@example.com')
  });

});



