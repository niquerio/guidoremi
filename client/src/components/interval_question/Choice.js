import React from "react";
import {Button} from 'react-bootstrap';

export default class Choice extends React.Component {
  playMidi(){
    window.MIDI.Player.loadFile(this.props.choice.midi, function(){
      window.MIDI.Player.stop();
      window.MIDI.Player.resume();
    });
  }
  handleChange(e){
    const selected = e.target.value
    this.props.changeSelected(selected);
  }
  render(){
    const {choice} = this.props;
    const {answer_mode} = this.props;
    var inputStyle = {
      margin: '0px',
      verticalAlign: 'middle',
      position: 'relative',
    }
    return(
    <label className="radio-inline">
     <input onChange={this.handleChange.bind(this)} type="radio" style={inputStyle} name="choicesRadio" id={choice.id} value={choice.id} disabled={answer_mode}/> {choice.name}  <Button onClick={this.playMidi.bind(this)} >
  <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
</Button>
    </label> 
    )
  }
}
