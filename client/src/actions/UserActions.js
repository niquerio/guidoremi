import dispatcher from '../dispatcher';
import Axios from '../utilities/Axios';

export function validateToken(){
  dispatcher.dispatch({type: 'VALIDATE_TOKEN'});
  return new Promise(function(resolve,reject){
    Axios.get('/auth/validate_token')
    .then(function(resp){
      dispatcher.dispatch({type: "RECEIVE_USER",
        user: resp.data
      })
      resolve(resp)
    }).catch(function(error){
      reject(error); 
    });
  });

}

export function emailSignIn(login){
  dispatcher.dispatch({type: 'SIGNING_IN_USER'});
  return new Promise(function(resolve,reject){
    Axios.post('/auth/sign_in',login)
      .then(function(resp){
        dispatcher.dispatch({type: "RECEIVE_USER",
          user: resp.data
        })
        resolve(resp)
      }).catch(function(error){
        reject(error)
      });
  });
}

export function signOutUser(){
  return new Promise(function(resolve,reject){
    Axios.delete('/auth/sign_out')
      .then(function(resp){
        dispatcher.dispatch({type: "SIGN_OUT_USER" })
        resolve(resp)
      }).catch(function(error){
        reject(error)
      });
      
  });
}
