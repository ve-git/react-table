import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Table from '../components/Table';
import * as TableActions from '../actions/TableActions';
import * as ColsActions from '../actions/ColsActions';
//import {colsCount} from '../components/setup';

class App extends Component {
  constructor(props){
    super(props);
    const { loadTable } = this.props.tableActions;
    this.loadTable = loadTable.bind(this);

    //this.setColWidth = this.setColWidth.bind(this);
    this.colsElementInit = this.props.colsActions.colsElementInit.bind(this);
    this.colsMouseMove = this.props.colsActions.colsMouseMove.bind(this);
    this.colsMouseDown = this.props.colsActions.colsMouseDown.bind(this);
    this.colsMouseUp = this.props.colsActions.colsMouseUp.bind(this);
    //this.state = {colElements:[]};
  }

// функция должна устанавливать щирину ячеек, 
/*
  setColWidth(elem, colNum){
    if (!elem) return;
    elem.style.backgroundColor = 'red';
    this.colsElementInit(elem, colNum);
    if (colNum === colsCount){

    }
    console.log('colNum='+colNum);
    elem.style.backgroundColor = 'red';
    if (colNum < 2){
      elem.width = 300;
    } else {
      elem.width = 0;
    }
    console.log('elem.offsetWidth =' + elem.offsetWidth);
  }
*/

  componentDidUpdate(prevProps, prevState){
    console.log('App.componentDidUpdate');
  }
/*
  componentWillReceiveProps(nextProps) {
    console.log('App.componentWillReceiveProps');
  }  
*/ 
  componentDidMount(){
    this.loadTable(1);
    //this.props.dispatch(this.loadTable(1)); // Так не работает!!!
  };

  render() {
    const data = this.props.data;
    if (data.fetching) {  return (<div> Загрузка страницы N {data.pageNum}</div> ); }
    else if (data.error){ return (<div> {data.error}</div>); } 
    else if (!data.cells) { return false; }  
    else { return (
      <Table 
        data={data} 
        colsElementInit={this.colsElementInit}
        colsMouseMove={this.colsMouseMove}
        colsMouseDown={this.colsMouseDown}
        colsMouseUp={this.colsMouseUp}
      />);}
  };
};

function mapStateToProps(state) {
  return {
    data: state.table
    //,colWidth:state.cols // это на потом!
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tableActions: bindActionCreators(TableActions, dispatch),
    colsActions: bindActionCreators(ColsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


