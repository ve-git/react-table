import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from './Row';

export default class TableBody extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
  };
  
  render() {
    const cells = this.props.data;
    let rows = cells.map(
      (item, index) => <Row key={index} data={item} />
    );
    return (
      <tbody>
        {rows}
      </tbody>
    );
  };
};
