import React from 'react';
import {shallow} from 'enzyme';
import Tree from '../Tree'

describe('Tree Component', function(){
  const MOCK_TREE = [       
        [ {slug: 'so-mi', name: 'So Mi' },{slug: 'so-la', name: 'So La' }],
        [ {slug: 'mi-la', name: 'Mi La' }],
      ]


  it('renders tree data',function(){
//    require('TreeStore').__setMockTree(MOCK_TREE); 
    let page = shallow(<Tree/>)
    let ul_second_branch = page.find('ul').children().last()
    expect(ul_second_branch.html()).toContain('Mi La')
  });
});
