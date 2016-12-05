import React from "react";
//import {Button} from 'react-bootstrap';

export default class Score extends React.Component {
  render(){
    const {current_streak} = this.props.score
    const {highest_streak} = this.props.score
    const {complete} = this.props.score
    return(
      <div>
        Current Streak: {current_streak}
        {'   |   '}
        Highest Streak: {highest_streak}
        {'   |   '}
        Complete?: {complete}
      </div>
    ) 
  }
}
