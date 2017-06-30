import React, { Component } from 'react';
import axios from 'axios';
import {fillTableFromArray} from './setup';
import Table from './Table';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {}
    };
  }
 
  componentDidMount(){
    console.log('componentDidMount');
    console.log('test start');


    /*
    TODO вынести в отдельный модуль заполнение массива
    из внешнего источника данных и заполнение таблицы
    из этого массива.
    */



    let newWords = [];
    let words = [];
    const colsCount = 4;
    const rowsCount = 10;
    const maxWordsCount = colsCount * rowsCount;

    const loop = () =>
      axios({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/posts/1'
      })
      .then(response => {
        newWords = (response.data.body).split(/\s/);
        words = words.concat(newWords);
        
        if ((newWords.length===0)||(words.length>=maxWordsCount)){
          return words;
        }else{
          return loop();
        }
      });

    loop().then(() => {
      //words.map((value, index) =>  console.log('words['+index+']='+value));
      let newData = {
        caption: 'Заголовок',
        colNames: ['I', 'II', 'III', 'IV'],
        cells: []
      };
      fillTableFromArray(newData.cells, 10, 4, words);
      this.setState({data: newData});
    }).catch(error => {
      console.log(error);
    });
  };

  render() {
    const data = this.state.data;
    if (!data.cells) return false;

    return (
      <Table data={data}/>
    );
  };
};
export default App;
