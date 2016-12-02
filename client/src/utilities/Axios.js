import Axios from 'axios'
import _ from 'lodash'
import Cookies from 'js-cookie'

function updateCookie(headers){
  var newCookie = {
    'access-token': headers['access-token'],
    'expiry': headers['expiry'],
    'client': headers['client'],
    'token-type': headers['token-type'],
    'uid': headers['uid'],
  }

  if(newCookie['access-token']){
    Cookies.set('authHeaders', newCookie);
  }
}


var myAxios = Axios.create() 

myAxios.interceptors.request.use(function(config){
  _.merge(config['headers']['common'], Cookies.getJSON('authHeaders'))
  return config
})

myAxios.interceptors.response.use(function(resp){
  updateCookie(resp.headers)
  return resp
},function(error){
  updateCookie(error.response.headers)
  return Promise.reject(error) 
});

export default myAxios;
