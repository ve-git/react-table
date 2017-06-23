import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableCaption from './table-caption';
import TableBody from './table-body';

export default class Table extends Component {
  static propTypes = {
    data: PropTypes.shape({
      caption: PropTypes.string,  
      colNames: PropTypes.arrayOf(PropTypes.string),
      cells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
    }).isRequired
  }
  
  render() {
    const { caption, colNames, cells } = this.props.data;
    const bodyData = {colNames: colNames, cells: cells}; // TODO поискать другой способ
    const TableCaptionPlaceholder = caption? <TableCaption data={caption} />: null;
    return (
      <table>
        {TableCaptionPlaceholder}
        <TableBody data={bodyData}/>
      </table>
    );  
  };
};
