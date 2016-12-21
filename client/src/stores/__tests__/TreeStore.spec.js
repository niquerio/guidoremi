import TreeStore from '../TreeStore'

describe('TreeStore', function(){

  beforeEach(function(){
    this.state = TreeStore.getInitialState();

    this.dispatch = action => {
      this.state = TreeStore.reduce(this.state, action);
    };
    this.receiveTree = {
      type: 'RECEIVE_TREE',
      tree: [
        [
          {
            "slug": "so-mi",
            "name": "So Mi",
            "total": 3,
            "complete": 0
          },
          {
            "slug": "so-la",
            "name": "So La",
            "total": 3,
            "complete": 0
          }
        ],
        [
          {
            "slug": "mi-la",
            "name": "Mi La",
            "total": 3,
            "complete": 0
          }
        ]
      ]    
    }

    this.updateLeaf = {
      type: 'UPDATE_LEAF',
      slug: 'so-la',
      skill_score: {
        'complete': 1,
      } 
    }
  });



  it('initializes with no tree', function(){
    expect(this.state.isEmpty()).toEqual(true);
  });
  it('receives an tree', function(){
    expect(this.state.isEmpty()).toEqual(true);
    this.dispatch( this.receiveTree );

    expect(this.state.getIn([0,0,'slug'])).toEqual('so-mi')
  });
  it('updates the score', function(){
    this.dispatch( this.receiveTree );
    expect(this.state.getIn([0,1,'complete'])).toEqual(0)

    this.dispatch(this.updateLeaf);

    expect(this.state.getIn([0,1,'complete'])).toEqual(1)
    
  });
  

});



