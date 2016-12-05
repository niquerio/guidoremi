import React from "react";
import { Link } from "react-router";
import Complete from './Complete';

export default class Skill extends React.Component {
  render(){
    const {skill} = this.props;
    return(
      <li><Complete complete={skill.complete}/><Link to={`/skills/${this.props.branch}/${skill.slug}`}>{skill.name}</Link>
        {'  '} Highest Streak: {' '} {skill.highest_streak} 
        {'   |  '} Current  Streak: {' '} {skill.current_streak} 
      </li> 
    )
  }
}
