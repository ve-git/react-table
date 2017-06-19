import React, { Component } from 'react';
import './App.css';
import Table from './table';

const tableData = {
  caption: 'Заголовок',
  data: [
    ['1', '2', '3'],
    ['4', '5', '6', 'extra'],
    ['7', '8', '9'],
    ['10', '11', '12']
  ]
};

class App extends Component {
  render() {
    return (
      <Table tableData={tableData}/>
    );
  }
}

export default App;
