import React from 'react';
import {mount} from 'enzyme';
import Welcome from '../Welcome'

describe('Welcome Component', function(){
  it('renders Sign In button',function(){
    let page = mount(<Welcome/>)
    let button = page.find('button')
    expect(button.text()).toBe('Sign In')
  });
});
