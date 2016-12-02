import dispatcher from '../dispatcher';
import Axios from '../utilities/Axios';

export function getTree(){
  Axios.get('/api/v1/tree').then(function(resp){
    dispatcher.dispatch({type: "RECEIVE_TREE",
      tree: resp.data
    })
  });
  
}
