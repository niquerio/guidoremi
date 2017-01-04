import React from "react";
import Branch from "../components/tree/Branch";
import TreeStore from "../stores/TreeStore";

export default class Tree extends React.Component {
  constructor(){
    super();
    this.getTree = this.getTree.bind(this);
    this.state = {
      tree: TreeStore.getState(),
    };
  }
  componentWillMount(){
    this.listener = TreeStore.addListener(this.getTree ) 
  }

  componentWillUnmount(){
    this.listener.remove();
  }

  getTree(){
    this.setState({
      tree: TreeStore.getState(),
    });      
  }
  render() {
    const {tree} = this.state;
    const BranchComponents = tree.map((branch,idx)=>{
      return <Branch key={idx} leaves={branch}/>
    });
    return (
      <div>
      <h1>Skills</h1>
      <ul>{BranchComponents}</ul>
      </div>
    );
  }
}
