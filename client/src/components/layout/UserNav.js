import React from 'react';
import Auth from 'j-toker';

export default class UserNav extends React.Component{
  handleSignOut(){
    Auth.signOut();
  }
  render(){
    if(this.props.authenticated) {
      return(
      <ul className="nav navbar-nav navbar-right">
        <li><button type="button" className="btn btn-default navbar-btn" onClick={this.handleSignOut.bind(this)}>Sign Out</button> </li>
      </ul>
      )
    }else{
      return null
    }
  }
}
