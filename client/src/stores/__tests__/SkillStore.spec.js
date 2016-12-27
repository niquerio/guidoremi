import Dispatcher from '../../dispatcher'
import SkillStore from '../SkillStore'

describe('SkillStore', function(){

  beforeEach(function(){
    this.state = SkillStore.getInitialState();

    this.dispatch = action => {
      this.state = SkillStore.reduce(this.state, action);
    };

    this.receiveSkills = {
      type: 'RECEIVE_SKILLS',
      skills:     
        [
          {
            "slug": "so-mi",
            "name": "So Mi",
            "question_generators": [
              {
                "slug": "so-mi-1",
                "name": "So Mi 1",
                "complete": false,
                "current_streak": 0,
                "highest_streak": 0
              },
              {
                "slug": "so-mi-2",
                "name": "So Mi 2",
                "complete": false,
                "current_streak": 0,
                "highest_streak": 0
              },
              {
                "slug": "so-mi-3",
                "name": "So Mi 3",
                "complete": false,
                "current_streak": 0,
                "highest_streak": 0
              }
            ]
          },
        ]

}

    this.updateScore = {
      type: 'UPDATE_SCORE',
      skill_slug: 'so-mi',
      qg_slug: 'so-mi-1',
      score: {
        'complete': true,
        'current_streak': 10,
        'highest_streak': 10,
      } 
    }
  });



  it('initializes with no skills', function(){
    expect(this.state.isEmpty()).toEqual(true);
  });
  it('receives skills', function(){
    expect(this.state.isEmpty()).toEqual(true);
    this.dispatch( this.receiveSkills );

    expect(this.state.getIn([0,'question_generators',0,'slug'])).toEqual('so-mi-1')
  });

  it('updates the score', function(){
    this.dispatch( this.receiveSkills );
    expect(this.state.getIn([0,'question_generators',0,'current_streak'])).toEqual(0)

    this.dispatch(this.updateScore);

    expect(this.state.getIn([0,'question_generators',0,'current_streak'])).toEqual(10)
    
  });

  it('gets the score', function(){
    Dispatcher.dispatch(this.receiveSkills);
    expect(SkillStore.getScore('so-mi-1').count()).toEqual(3);
    
    
  });
  

});



