import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TableBody extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.string)
  }
  
  render() {
    const { data } = this.props;
    let colNames = data.map((item, index) => {
      return (
        <th key={index}>{item}</th>
      );
    });
    return (
      <tr>{colNames}</tr>
    );  
  };
};
