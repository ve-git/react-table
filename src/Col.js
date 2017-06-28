import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Col extends Component {
  static propTypes = {
    data: PropTypes.string.isRequired
  };

  render() {
    const { data } = this.props;

    return (
      <td> 
        {data} 
      </td>
    );
  };  
}
