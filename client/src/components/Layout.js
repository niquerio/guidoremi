import React from 'react';
import Header from './layout/Header';

export default class Layout extends React.Component{
  render(){
    const containerStyle = {
      marginTop: "60px"
    };
    return(
      <div>
        <Header />
        <div className="container" style={containerStyle}> 
          {this.props.children}
        </div>
      </div>
    )
  }
}

