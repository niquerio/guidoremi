import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';
import dispatcher from '../dispatcher';
import UserStore from './UserStore';
import * as SkillActions from  '../actions/SkillActions'

import _ from 'lodash'

class SkillStore extends ReduceStore{
  constructor(){
    super(dispatcher);
    this._reloadSkills(); 
    var self = this
    UserStore.addListener(() => {
      self._reloadSkills(); 
    });
  }

  getInitialState(){
    return Immutable.List();
  }

  _reloadSkills(){
    if(UserStore.signedIn()){
      SkillActions.getSkills()
    }
    else{
    //Need Clear Skills Action
//      this.skills = []
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
    var qgs = this._state.reduce(function(list,current){
     return list.concat(current.get('question_generators'))
    }, Immutable.List());
    var qg = qgs.find(function(obj){
      return obj.get('slug') == slug
    });
    function keyIn(...keys) {
      var keySet = Immutable.Set(keys); 
      return function (v, k) {
        return keySet.has(k);
      }
    }
    return qg.filter(keyIn('complete', 'current_streak', 'highest_streak'));

  }

  reduce(state, action){
    switch(action.type){
      case "RECEIVE_SKILLS": {
        return Immutable.fromJS(action.skills)
      }
      case "UPDATE_SCORE": {
        var skill_index = state.findIndex(function(skill){
          return skill.get('slug') == action.skill_slug
        });
       
        var skill = state.get(skill_index)
        var qg_index = skill.get('question_generators').findIndex(function(qg){
          return qg.get('slug') == action.qg_slug
}); 
        return state.mergeIn([skill_index, 'question_generators', qg_index], Immutable.fromJS(action.score));

      } 
      default: {
        return state; 
      }
    }
  }
}

const skillStore = new SkillStore()

export default skillStore;
