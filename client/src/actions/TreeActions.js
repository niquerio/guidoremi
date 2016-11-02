import dispatcher from '../dispatcher';
import $ from 'jquery'

export function getTree(){
  dispatcher.dispatch({type: 'FETCH_TREE'});
  $.getJSON('./api/v1/tree').done(function(resp){
    dispatcher.dispatch({type: "RECEIVE_TREE",
      tree: resp
    })
  });
  
}
