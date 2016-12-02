import React from "react";
import Branch from "../components/tree/Branch";
import TreeStore from "../stores/TreeStore";

export default class Tree extends React.Component {
  constructor(){
    super();
    this.getTree = this.getTree.bind(this);
    this.state = {
      tree: TreeStore.getTree(),
    };
  }
  componentWillMount(){
    TreeStore.on("change", this.getTree ) 
  }

  componentWillUnmount(){
    TreeStore.removeListener("change", this.getTree) 
  }

  getTree(){
    this.setState({
      tree: TreeStore.getTree(),
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
