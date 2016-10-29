import React from 'react';
import {shallow} from 'enzyme';
import Home from '../Home'

describe('Home page', function(){
  it('renders Welcome Component if unauthenticated', function(){
    let page = shallow(<Home/>)
    expect(page.html()).toContain('Welcome')
  });
  it('renders Tree if authenticated', function(){
    let page = shallow(<Home/>)
    expect(page.setState({authenticated:true}).html()).toContain('Skills')
  });
});
