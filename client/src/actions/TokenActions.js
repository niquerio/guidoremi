import Cookies from 'js-cookie'

export function updateCookie(request){
  var newCookie = {
    'access-token': request.getResponseHeader('access-token'),
    'expiry': request.getResponseHeader('expiry'),
    'client': request.getResponseHeader('client'),
    'token-type': request.getResponseHeader('token-type'),
    'uid': request.getResponseHeader('uid'),
  }

  if(newCookie['access-token']){
    Cookies.set('authHeaders', newCookie);
  }
}

