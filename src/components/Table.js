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
    }).isRequired
  }

  render() {
    console.log('render Table');
    
    const { caption, colNames, cells } = this.props.data;
    const tableCaptionPlaceholder = caption? <TableCaption data={caption} />: null;
    const tableHeadPlaceholder = (colNames.length)? 
      <TableHead 
        data={colNames} 
      /> 
      : null; 

    /* Наверное, можно и так! Я про onMouseOut ниже по тексту*/
    // onMouseOut={this.props.colsMouseUp}
    return (
      <table>
        {tableCaptionPlaceholder}
        {tableHeadPlaceholder}
        <TableBody data={cells}/>
      </table>
    );  
  };
};

