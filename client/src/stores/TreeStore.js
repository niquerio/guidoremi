import {EventEmitter} from "events";

class TreeStore extends EventEmitter{
  constructor(){
    super();
    this.tree = [       
        [ {slug: 'so-mi', name: 'So Mi' },{slug: 'so-la', name: 'So La' }],
        [ {slug: 'mi-la', name: 'Mi La' }],
      ]
  }

  getTree() {
    return this.tree
  }
}

const treeStore = new TreeStore()

export default treeStore;
