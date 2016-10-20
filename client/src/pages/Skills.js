import React from "react";
import Skill from '../components/skills/Skill';

import SkillStore from "../stores/SkillStore";
export default class Skills extends React.Component {
  constructor(){
    super();
    this.state = {
      skill: null 
    };
  }
  componentWillMount(){
    this.setState({skill: SkillStore.getSkill(this.props.params.skill)})
  }
  render() {
    const {name} = this.state.skill
    const {question_generators} = this.state.skill
    const SkillComponents = question_generators.map((qg, idx)=>{
      return <Skill key={idx} skill={qg} branch={this.props.params.skill}/>; 
    }); 
    return (
      <div>
      <h1>{name}</h1>
      <ul>{SkillComponents}</ul>
      </div>
    )    
  }
}
