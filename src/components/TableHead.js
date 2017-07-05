import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TableHead extends Component {
  constructor(props){
    super(props);
    this.cols = [];
    this.setColWidth = this.setColWidth.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
  }

  setColWidth(elem, index) {
    this.props.setColWidth(elem, index);
  } 

  mouseMove(e) {
    console.log(e.clientX+':'+e.clientY);
  } 


  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.string)
  }

  render() {
    console.log('renderTableHead');
    const { data } = this.props;
    let colNames = data.map(
      (item, index) => <th key={index} ref={(elem) => {this.setColWidth(elem, index);}} >{item}</th>
//      (item, index) => <th key={index} ref={(elem) => {;}} >{item}</th>
      
    );

    return (
      <thead onMouseMove={this.mouseMove}>
        <tr>{colNames}</tr>
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