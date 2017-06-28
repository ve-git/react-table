import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TableBody extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.string)
  }

  render() {
    const { data } = this.props;
    let colNames = data.map(
      (item, index) => <th key={index}>{item}</th>
    );

    return (
      <thead>
        <tr>{colNames}</tr>
      </thead>
    );  
  };

};