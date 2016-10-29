import React from 'react';
import Leaf from './Leaf';

export default class Branch extends React.Component{
  render(){
    const { leaves } = this.props;
    const LeafComponents = leaves.map((leaf, idx)=>{
      return <Leaf key={idx} leaf={leaf}/>; 
    }); 
    return(
      <li> <ul>{LeafComponents}</ul> </li>
    )
  }
}
