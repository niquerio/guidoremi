import React from "react";
import { Link } from "react-router";

export default class Skill extends React.Component {
  render(){
    const {skill} = this.props;
    return(
      <li><Link to={`/skills/${this.props.branch}/${skill.slug}`}>{skill.name}</Link></li> 
    )
  }
}
