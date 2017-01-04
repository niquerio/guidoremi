import React from "react";
//import {Button} from 'react-bootstrap';

export default class Score extends React.Component {
  render(){
    const current_streak = this.props.score.get('current_streak')
    const highest_streak = this.props.score.get('highest_streak')
    const complete = this.props.score.get('complete')
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
