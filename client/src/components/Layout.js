import React from 'react';
import Header from './layout/Header';
import PubSub from 'pubsub-js'

export default class Layout extends React.Component{
  constructor(props) {
    super(props);
    this.state = {authenticated: false};
    this.getAuth = this.getAuth.bind(this);
  }
  componentWillMount(){
    PubSub.subscribe('auth.validation.success', this.getAuth); 
    PubSub.subscribe('auth.signOut.success', this.getAuth); 
  }
  componentWillUnmount(){
    PubSub.unsubscribe('auth.validation.success');
    PubSub.unsubscribe('auth.signOut.success', this.getAuth);
  }
  getAuth(ev, user){
    console.log('should remove button')
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
    const containerStyle = {
      marginTop: "30px"
    };
    return(
      <div>
        <Header authenticated={this.state.authenticated}/>
        <div className="container" style={containerStyle}> 
          {this.props.children}
        </div>
      </div>
    )
  }
}

