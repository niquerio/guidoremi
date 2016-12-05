import {EventEmitter} from "events";
import dispatcher from '../dispatcher';
import UserStore from './UserStore';
import * as SkillActions from  '../actions/SkillActions'
import _ from 'lodash'

class SkillStore extends EventEmitter{
  constructor(){
    super();
    this.skills = []
    this._reloadSkills(); 
    var self = this
    UserStore.on("change", () => {
      self._reloadSkills(); 
    });
  }

  _reloadSkills(){
    if(UserStore.signedIn()){
      SkillActions.getSkills()
    }
    else{
      this.skills = []
    }
  }
  getSkill(slug) {
    return _.find(this.skills, {slug: slug});
    //var s = {};
    //for (var i = 0; i < this.skills.length; i++){
    //  if(this.skills[i].slug === slug){
    //    s = this.skills[i]
    //    break;
    //  }
    //}
    //return s;
  }

  getScore(slug){
    console.log('getScore')
    var qgs = _.map(this.skills, 'question_generators')
    var merged = [].concat.apply([], qgs);
    var qg = _.find(merged, {'slug': slug}) 
    return _.pick(qg, ['complete', 'current_streak', 'highest_streak']);
  }
  handleActions(action){
    switch(action.type){
      case "RECEIVE_SKILLS": {
        this.skills = action.skills
        this.emit("change")
        break
      }
      case "UPDATE_SCORE": {
        var index = _.indexOf(this.skills, _.find(this.skills, {slug: action.slug}));
        _.assign(this.skills[index], action.score);
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
