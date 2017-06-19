import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from './row';

export default class Table extends Component {
  static propTypes = {
    tableData: PropTypes.shape({
      caption: PropTypes.string,  
      data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
    }).isRequired
  }
  
  render() {
    const { data, caption } = this.props.tableData;
    let rows = data.map((item, index) => {
      return (
        <Row key={index} data={item} />
      );
    });
    return (
      <table>
        {caption? <caption>{caption}</caption>: null}
        <tbody>
          {rows}
        </tbody>
      </table>
    );  
  };
};
