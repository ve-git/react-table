import React, { Component } from 'react';
import setup from './setup';
import Table from './table';

class App extends Component {
  render() {
    return (
      <Table data={setup}/>
    );
  }
}

export default App;
