import React from 'react';
import { Link } from 'react-router'
import { Button, Jumbotron } from 'react-bootstrap';

export default class Welcome extends React.Component {
  render(){
    return(
    <Jumbotron>
      Welcome to GuiDoReMi.
      Get started.
      <Link to='/sign_in'><Button bsStyle="primary">Sign In</Button></Link>
    </Jumbotron>
    )
  }
}
