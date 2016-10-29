const TreeStore = jest.genMockFromModule('TreeStore');
let mockTree = Array.create(null);
function __setMockTree(newMockTree){
  mockTree = JSON.parse(JSON.stringify(newMockTree));
}

function getTree(){
  return mockTree
}
TreeStore.__setMockTree = __setMockTree;
TreeStore.getTree = getTree;

module.exports = TreeStore;
