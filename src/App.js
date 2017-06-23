import React, { Component } from 'react';
import './App.css';
import Table from './table';
import setup from './setup';

class App extends Component {
  render() {
    return (
      <Table data={setup}/>
    );
  }
}

export default App;
