import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from './Table';


export default class Wrapper extends Component {

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
    colsMouseOut: PropTypes.func.isRequired,
    colsMouseOver: PropTypes.func.isRequired
  }

  render() {
    const data = this.props.data;
    return (
      <div id='wrapper'
        onMouseMove={this.props.colsMouseMove}
        onMouseDown={this.props.colsMouseDown}
        onMouseUp={this.props.colsMouseUp}
        onMouseOut={this.props.colsMouseOut}
      >  
        <Table
          data={data} 
          colsElementInit={this.props.colsElementInit}
        />
      </div>  
    );
  };
};

