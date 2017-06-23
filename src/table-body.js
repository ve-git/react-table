import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from './row';
import ColNames from './col-names';

export default class TableBody extends Component {
  static propTypes = {
    data: PropTypes.shape({
      colNames: PropTypes.arrayOf(PropTypes.string),  
      cells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
    }).isRequired
  }
  
  render() {
    const { colNames, cells } = this.props.data;
    let colNamesPlaceHolder = (colNames.length)? <ColNames data={colNames} /> : null; 
    let rows = cells.map((item, index) => {
      return (
        <Row key={index} data={item} />
      );
    });
    return (
      <tbody>
        {colNamesPlaceHolder}  
        {rows}
      </tbody>
    );
  };
};
