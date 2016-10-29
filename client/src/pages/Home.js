import React from 'react';
import Welcome from '../components/home/Welcome'
import Tree from '../components/home/Tree'
import Auth from 'j-toker';
import PubSub from 'pubsub-js'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {authenticated: false};
    this.getAuth = this.getAuth.bind(this);
  }

  componentWillMount(){
    //this.getAuth(null,Auth.user)
    //PubSub.subscribe('auth.validation.success', this.getAuth); 
    PubSub.subscribe('auth.signOut.success', this.getAuth); 
    var self = this
    Auth.validateToken()
      .then(function(user) {
        self.setState({
          authenticated: true
        })
      }.bind(this))
      .fail(function() {
        self.setState({
          authenticated: false
        })
      });
  }

  componentWillUnmount(){
    //PubSub.unsubscribe('auth.validation.success');
    PubSub.unsubscribe('auth.signOut.success', this.getAuth);
  }
  getAuth(ev, user){
    console.log('called?')
    if(user.signedIn){
      this.setState({
        authenticated: true
      });
    }else{
      this.setState({
        authenticated: false
      });
    }
  }
 
  render(){
    if (this.state.authenticated){
      return(
        <Tree/>
      );
    }else{
      return( <Welcome/> );
    }
  }
}
