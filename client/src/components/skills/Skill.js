import React from "react";
import { Link } from "react-router";
import Complete from './Complete';

export default class Skill extends React.Component {
  render(){
    const {skill} = this.props;
    return(
      <li><Complete complete={skill.get('complete')}/><Link to={`/skills/${this.props.branch}/${skill.get('slug')}`}>{skill.get('name')}</Link>
        {'  '} Highest Streak: {' '} {skill.get('highest_streak')} 
        {'   |  '} Current  Streak: {' '} {skill.get('current_streak')} 
      </li> 
    )
  }
}
