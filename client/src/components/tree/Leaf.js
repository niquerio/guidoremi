import React from 'react';
import { Link } from "react-router";

export default class Leaf extends React.Component{
  render(){
    const {leaf} = this.props;
    return(
      <li><Link to={`/skills/${leaf.get('slug')}`}>{leaf.get('name')}</Link>  
      {'  '}{leaf.get('complete')}/{leaf.get('total')}
      </li> 
    )
  }
}
