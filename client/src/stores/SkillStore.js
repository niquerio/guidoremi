import {EventEmitter} from "events";
import dispatcher from '../dispatcher';
import * as SkillActions from  '../actions/SkillActions'

class SkillStore extends EventEmitter{
  constructor(){
    super();
    this.skills = []
    console.log('getting skills')
    SkillActions.getSkills()
  }

  getSkill(slug) {
    console.log('blah')
    var s = null;
    for (var i = 0; i < this.skills.length; i++){
      if(this.skills[i].slug === slug){
        s = this.skills[i]
        break;
      }
    }
    return s;
  }
  handleActions(action){
    switch(action.type){
      case "RECEIVE_SKILLS": {
        this.skills = action.skills
        this.emit("change")
        break
      }
      default: {
        break
      }
    }
  }
}

const skillStore = new SkillStore()
dispatcher.register(skillStore.handleActions.bind(skillStore));

export default skillStore;
