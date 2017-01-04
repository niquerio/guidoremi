import React from "react";
import Skill from '../components/skills/Skill';
import _ from 'lodash';

import SkillStore from "../stores/SkillStore";

export default class Skills extends React.Component {
  constructor(){
    super();
    this.getSkill = this.getSkill.bind(this);
    this.state = {
      skill: {} 
    };
  }
  componentWillMount(){
      this.getSkill();
      this.listener = SkillStore.addListener(this.getSkill);
      //SkillStore.on('change', this.getSkill)
  }
  componentWillUnmount(){
      //SkillStore.removeListener('change', this.getSkill)
      this.listener.remove();
  }

  getSkill(){
    this.setState({
      skill: SkillStore.getSkill(this.props.params.skill)
    })
  }
  render() {
    if(!(_.isEmpty(this.state.skill))){
      const name = this.state.skill.get('name')
      const question_generators = this.state.skill.get('question_generators')
      const SkillComponents = question_generators.map((qg, idx)=>{
        return <Skill key={idx} skill={qg} branch={this.props.params.skill}/>; 
      }); 
      return (
        <div>
        <h1>{name}</h1>
        <ul>{SkillComponents}</ul>
        </div>
      )    
    } else{
      return null;
    }
  }
}
