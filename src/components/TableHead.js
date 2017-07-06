import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TableHead extends Component {
  constructor(props){
    super(props);
    this.cols = [];
    this.colsElementInit = this.props.colsElementInit.bind(this);
    this.myFunction = this.myFunction.bind(this);
  }

  myFunction(event){
    console.log('Вызвано!');
  };

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.string),
    colsElementInit: PropTypes.func.isRequired,
    colsMouseMove: PropTypes.func.isRequired,
    colsMouseDown: PropTypes.func.isRequired,
    colsMouseUp: PropTypes.func.isRequired,
    
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

/*
        onMouseMove={this.props.colsMouseMove}
        onMouseDown={this.props.colsMouseDown}
        onMouseUp={this.props.colsMouseUp}

*/

    return (
      <thead 
      >
        <tr
        >
          {colNames}
        </tr>
      </thead>
    );  
  };

};

/*
Итак, нужно изменять ширину колонок.
И имеется особенность – если в колонку что-то не умещается, то она примет такую щирину, которая ей удобна.

document.querySelector('#root tr').childNodes[0].offsetWidth
document.querySelector('#root tr').childNodes[0].offsetLeft
document.querySelector('#root thead tr').childNodes[0]
document.querySelector('#root thead tr').childNodes[0].style.borderLeftWidth
document.querySelector('#root thead tr').childNodes[0].style.paddingLeftWidth - не нужно

Примерный план работ:

1.	Изначально устанавливаю некоторую ширину.
2.	После перериcовки <th> послылаю ссылку на него родительскому элементу. Не <td>, потому что строк много, а строка заголовка одна. С

*/