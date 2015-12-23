'use strict';
import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import Reflux from 'reflux';
import {Button, Nav, Navbar, NavItem} from 'react-bootstrap';

export default React.createClass({
  render() {
    return (
      <Navbar inverse={false} fixedTop={true}>
        <Navbar.Header>
          <Navbar.Brand>Demographic Analysis</Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem>Facial Recognition with AI</NavItem>
        </Nav>
      </Navbar>
    )
  }
})
