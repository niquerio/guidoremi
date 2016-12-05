import React from "react";

export default class Skill extends React.Component {
  render(){
    const {complete} = this.props;
    
    if(complete){
      return(
        <span className='glyphicon glyphicon-ok'></span>
      )
    }else{
      return(
        <span className='glyphicon glyphicon-unchecked'></span>
      )
    }
  }
}
