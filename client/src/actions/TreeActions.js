import dispatcher from '../dispatcher';
import Auth from 'j-toker'
import $ from 'jquery'

export function getTree(){
  dispatcher.dispatch({type: 'FETCH_TREE'});
  $.ajax({
    url: '/api/v1/tree',
    type: 'GET',
    dataType: 'json',
    success: function(resp) { 
      dispatcher.dispatch({type: "RECEIVE_TREE",
        tree: resp
      })
    },
    headers: Auth.retrieveData('authHeaders')
  });
  
}
