import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Col from './Col';

export default class Row extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  render() {
    const { data } = this.props;
    let cols = data.map(
      (item, index) => <Col key={index} data={item} /> 
    );
    
    return (
      <tr>
        {cols}
      </tr>    
    );  
  };
}

/*
Итак, нужно изменять ширину колонок.
И имеется особенность – если в колонку что-то не умещается, то она примет такую щирину, которая ей удобна.

document.querySelector('#root tr').childNodes[0].offsetWidth
document.querySelector('#root tr').childNodes[0].offsetLeft

Примерный план работ:

1.	Изначально устанавливаю некоторую ширину.
2.	После перериcовки <th> послылаю ссылку на него родительскому элементу. Не <td>, потому что строк много, а строка заголовка одна. С

*/