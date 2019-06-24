import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  constructor() {
    super();
    this.state = {
     
    }
  }

  render() {
    return (
      <div>        
        <h1>{this.props.something}</h1>
       
      </div>
    )
  }
}

export default Input;