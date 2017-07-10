import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TableHead extends Component {
  constructor(props){
    super(props);
    this.cols = [];
    this.colsElementInit = this.props.colsElementInit.bind(this);
    console.log('this.colsElementInit');
    console.log(this.colsElementInit);
  }


  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.string),
    colsElementInit: PropTypes.func.isRequired
  }

  render() {
    console.log('renderTableHead');
    const { data } = this.props;
    let colNames = data.map(
      (item, index) => 
        <th 
          key={index} 
          ref={(elem) => {this.colsElementInit(elem, index);}} 
        >
          {item}
        </th>
    );


    return (
      <thead>
        <tr>
          {colNames}
        </tr>
      </thead>
    );  
  };

};

