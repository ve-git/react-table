import React, { Component } from 'react';
import axios from 'axios';
import setup from './setup';
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
/* Сначала вызову промис и обработаю его, в самом конце - вызов setState*/
//http://export.rbc.ru/free/cb.0/free.fcgi?
    axios({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts/1'
    }).then((response) => {
      console.log('i am here!');
      /*
      console.log('response');
      for (let key in response) {
        console.log('key='+key+' response[key]='+response[key]);
      };
      */
      console.log('response[data]');
      for (let key in response.data) {
        console.log('key='+key+' response.data[key]='+response.data[key]);
      };
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
  }
}

/*
    axios({
      method: 'get',
      url: 'https://api.vk.com/method/groups.get',
      params: {
        access_token: accessToken,
        v: '5.64',
        count: '1'
      }
    }).then((response) => {
      if (!response.data.response.count) {
        throw new Error('╨ö╨░╨╜╨╜╤ï╨╡ ╨╜╨╡ ╨┐╨╛╨╗╤â╤ç╨╡╨╜╤ï. ' + response.data.error + ' : ' + response.data.error_description);
      }
      groupId = response.data.response.items[0];
      res
*/
export default App;
