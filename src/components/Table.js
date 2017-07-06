import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableCaption from './TableCaption';
import TableBody from './TableBody';
import TableHead from './TableHead';


export default class Table extends Component {

  static propTypes = {
    data: PropTypes.shape({
      caption: PropTypes.string,  
      colNames: PropTypes.arrayOf(PropTypes.string),
      cells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
    }).isRequired,
    colsElementInit: PropTypes.func.isRequired,
    colsMouseMove: PropTypes.func.isRequired,
    colsMouseDown: PropTypes.func.isRequired,
    colsMouseUp: PropTypes.func.isRequired,
    colsMouseOut: PropTypes.func.isRequired
  }

  render() {
    const { caption, colNames, cells } = this.props.data;
    const tableCaptionPlaceholder = caption? <TableCaption data={caption} />: null;
    const tableHeadPlaceholder = (colNames.length)? 
      <TableHead 
        data={colNames} 
        colsElementInit={this.props.colsElementInit} 
      /> 
      : null; 

    /* Наверное, можно и так! Я про onMouseOut ниже по тексту*/
    // onMouseOut={this.props.colsMouseUp}
    return (
      <table
        onMouseMove={this.props.colsMouseMove}
        onMouseDown={this.props.colsMouseDown}
        onMouseUp={this.props.colsMouseUp}
      >
        {tableCaptionPlaceholder}
        {tableHeadPlaceholder}
        <TableBody data={cells}/>
      </table>
    );  
  };
};

