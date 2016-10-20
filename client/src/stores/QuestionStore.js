import {EventEmitter} from "events";

class QuestionStore extends EventEmitter{
  constructor(){
    super();
    this.question = 
      { 
        'so-mi': 
          {
            'prompt': 'Which is So-Mi?',
            'choices': 
              [ 
                {id: 1, name: 'A', midi:'data:;base64,TVRoZAAAAAYAAQACAeBNVHJrAAAAGwD/BAAA/1EDD0JAAP8DCEV4ZXJjaXNlAP8vAE1UcmsAAAAuAP8EFEFjb3VzdGljIEdyYW5kIFBpYW5vAJA7f4NggDt/AJA4f4NggDh/AP8vAA=='},
                {id: 2, name: 'B', midi: 'data:;base64,TVRoZAAAAAYAAQACAeBNVHJrAAAAGwD/BAAA/1EDD0JAAP8DCEV4ZXJjaXNlAP8vAE1UcmsAAAAuAP8EFEFjb3VzdGljIEdyYW5kIFBpYW5vAJA7f4NggDt/AJA7f4NggDt/AP8vAA=='},
              ],
          },
         'so-la': {
            'prompt': 'Which is So-La?',
            'choices': 
              [ 
                {id: 3, name: 'A', midi:'data:;base64,TVRoZAAAAAYAAQACAeBNVHJrAAAAGwD/BAAA/1EDD0JAAP8DCEV4ZXJjaXNlAP8vAE1UcmsAAAAuAP8EFEFjb3VzdGljIEdyYW5kIFBpYW5vAJA6f4NggDp/AJA8f4NggDx/AP8vAA=='},
                {id: 4, name: 'B', midi: 'data:;base64,TVRoZAAAAAYAAQACAeBNVHJrAAAAGwD/BAAA/1EDD0JAAP8DCEV4ZXJjaXNlAP8vAE1UcmsAAAAuAP8EFEFjb3VzdGljIEdyYW5kIFBpYW5vAJA6f4NggDp/AJBGf4NggEZ/AP8vAA=='},
              ],
          },
         'mi-la': {
            'prompt': 'Which is Mi-La?',
            'choices': 
              [ 
                {id: 5, name: 'A', midi:'data:;base64,TVRoZAAAAAYAAQACAeBNVHJrAAAAGwD/BAAA/1EDD0JAAP8DCEV4ZXJjaXNlAP8vAE1UcmsAAAAuAP8EFEFjb3VzdGljIEdyYW5kIFBpYW5vAJA1f4NggDV/AJA/f4NggD9/AP8vAA=='},
                {id: 6, name: 'B', midi: 'data:;base64,TVRoZAAAAAYAAQACAeBNVHJrAAAAGwD/BAAA/1EDD0JAAP8DCEV4ZXJjaXNlAP8vAE1UcmsAAAAuAP8EFEFjb3VzdGljIEdyYW5kIFBpYW5vAJA0f4NggDR/AJA5f4NggDl/AP8vAA=='},
              ],
          },
    }  
  }

  getNewQuestion(slug) {
    return this.question[slug.slice(0,-2)]
  }
}

const questionStore = new QuestionStore

export default questionStore;
