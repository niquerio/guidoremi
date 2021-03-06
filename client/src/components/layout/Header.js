import React from 'react';
import UserNav from './UserNav';
import { Link } from "react-router";
import { Nav, Navbar, NavItem  } from 'react-bootstrap';

export default class Header extends React.Component{
  render(){
    return(
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to='' className='navbar-brand'>GuiDoReMi</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem>About</NavItem>
        </Nav>
      <UserNav authenticated={this.props.authenticated}/>
      </Navbar.Collapse>
    </Navbar>
    )
  }
}

