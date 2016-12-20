import React from 'react';
import Header from './layout/Header';
import UserStore from '../stores/UserStore';

export default class Layout extends React.Component{
  constructor(props) {
    super(props);
    
    this.state = {authenticated: UserStore.signedIn()};
  }
  componentWillMount(){
    UserStore.addListener( () => {
      this.setState({authenticated: UserStore.signedIn()});      
    });
  }
  componentWillUnmount(){
  }
  getAuth(ev, user){
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
        <Header router={this.props.router} authenticated={this.state.authenticated}/>
        <div className="container" style={containerStyle}> 
          {this.props.children}
        </div>
      </div>
    )
  }
}

