import React from 'react';
import { Link } from "react-router";

export default class Leaf extends React.Component{
  render(){
    const {leaf} = this.props;
    return(
      <li><Link to={`/skills/${leaf.slug}`}>{leaf.name}</Link></li> 
    )
  }
}
