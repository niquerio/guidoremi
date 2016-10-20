import React from "react";

export default class Choice extends React.Component {
  playMidi(){
    MIDI.Player.loadFile(this.props.choice.midi, function(){
      MIDI.Player.stop();
      MIDI.Player.resume();
    });
  }
  handleChange(e){
    const selected = e.target.value
    this.props.changeSelected(selected);
  }
  render(){
    const {choice} = this.props;
    var inputStyle = {
      margin: '0px',
      verticalAlign: 'middle',
      position: 'relative',
    }
    return(
    <label class="radio-inline">
     <input onChange={this.handleChange.bind(this)} type="radio" style={inputStyle} name="choicesRadio" id={choice.id} value={choice.id} /> {choice.name}  <button onClick={this.playMidi.bind(this)} type="button"  class="btn btn-default btn-lg">
  <span class="glyphicon glyphicon-play" aria-hidden="true"></span>
</button>
    </label> 
    )
  }
}
