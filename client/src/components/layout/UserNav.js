import React from 'react';
import { withRouter } from "react-router";
import * as UserActions from '../../actions/UserActions'

class UserNav extends React.Component{
  handleSignOut(){
    UserActions.signOutUser();

    this.props.router.push('/')
    
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
export default withRouter(UserNav) 
