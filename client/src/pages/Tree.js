import React from "react";
import Branch from "../components/tree/Branch";
import TreeStore from "../stores/TreeStore";
import Auth from 'j-toker';

export default class Tree extends React.Component {
  constructor(){
    super();
    this.state = {
      tree: TreeStore.getTree(),
    };
  }
  render() {
    window.Auth = Auth;
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
