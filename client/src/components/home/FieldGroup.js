import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
export default class FieldGroup extends React.Component{
  render(){
    var {id, label, ...props } = this.props
    return(
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
      </FormGroup>
    )
  }
}
