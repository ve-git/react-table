import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Col from './col';

export default class Row extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  render() {
    const { data } = this.props;
    let cols = data.map((item, index) => {
      return (
        <Col key={index} data={item} /> 
      );
    });
    return (
      <tr>
        {cols}
      </tr>    
    );  
  };
}

