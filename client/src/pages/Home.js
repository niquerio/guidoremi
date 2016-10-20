import React from "react";
import Auth from 'j-toker';
import _ from 'lodash';
import { browserHistory} from "react-router";
import { Row, Col, Button } from 'react-bootstrap';
import FieldGroup from '../components/home/FieldGroup';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
  }

  handleInputChange(ev) {
    var nextState = _.cloneDeep(this.state);
    nextState[ev.target.name] = ev.target.value;
    this.setState(nextState);
  }
  handleSignIn() {
    var self = this
    Auth.emailSignIn({
      email: this.state.email,
      password: this.state.password 
    }).then(function(resp){
      self.setState({
          email: '',
          password: '',
      }); 
      browserHistory.push('/tree') 
    })
  }

  render() {
    return(
      <Row>
        <Col sm={6} md={3}>
          <form>
          <FieldGroup
            id='email'
            name='email'
            type='email'
            label='Email address'
            placeholder='Enter email'
            onChange={this.handleInputChange.bind(this)}
          />
          <FieldGroup
            id='password'
            name='password'
            type='password'
            label='Password'
            onChange={this.handleInputChange.bind(this)}
          />
          <Button onClick={this.handleSignIn.bind(this)}>Sign In</Button>
        </form>
        </Col>
      </Row>
    )
  }
}
