import {EventEmitter} from "events";

class SkillStore extends EventEmitter{
  constructor(){
    super();
    this.skills = 
      { 
        'so-mi': 
          {
            name: 'So Mi',
            question_generators: 
              [ 
                {slug: 'so-mi-1', name: 'So Mi Level 1'},
                {slug: 'so-mi-2', name: 'So Mi Level 2'},
                {slug: 'so-mi-3', name: 'So Mi Level 3'},
              ],
          },
        'so-la': 
          {
            name: 'So La',
            question_generators: 
            [ 
              {slug: 'so-la-1', name: 'So La Level 1'},
              {slug: 'so-la-2', name: 'So La Level 2'},
              {slug: 'so-la-3', name: 'So La Level 3'},
            ],
          },
        'mi-la': 
          {
            name: 'Mi La',
            question_generators: 
            [ 
              {slug: 'mi-la-1', name: 'Mi La Level 1'},
              {slug: 'mi-la-2', name: 'Mi La Level 2'},
              {slug: 'mi-la-3', name: 'Mi La Level 3'},
            ],
          }
    }  
  }

  getSkill(slug) {
    return this.skills[slug]
  }
}

const skillStore = new SkillStore

export default skillStore;
