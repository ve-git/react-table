import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TableHead extends Component {
  constructor(props){
    super(props);
    this.cols = [];
  }

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.string)
  }

  render() {
    console.log('renderTableHead');
    const { data } = this.props;
    let colNames = data.map(
      (item, index) => 
        <th 
          key={index} 
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

