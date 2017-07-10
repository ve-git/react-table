import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Wrapper from '../components/Wrapper';
import * as TableActions from '../actions/TableActions';
import * as ColsActions from '../actions/ColsActions';
//import {colsMouseMove} from '../actions/ColsActions';
//import {colsCount} from '../components/setup';

class App extends Component {
  constructor(props){
    super(props);
    const { loadTable } = this.props.tableActions;
    this.loadTable = loadTable.bind(this);

console.log('this.props.store');
console.log(this.props.store);

    //this.setColWidth = this.setColWidth.bind(this);
    this.colsElementInit = this.props.colsActions.colsElementInit.bind(this);
    //this.colsMouseMove = this.props.colsActions.colsMouseMove.bind(this, this.props.store);
    //this.colsMouseMove = colsMouseMove.bind(this, this.props.store);
    this.colsMouseMove = this.props.colsActions.colsMouseMove.bind(this);
    this.colsMouseDown = this.props.colsActions.colsMouseDown.bind(this);
    this.colsMouseUp = this.props.colsActions.colsMouseUp.bind(this);
    //this.colsMouseOut = this.props.colsActions.colsMouseOut.bind(this, this.props.store);
    this.colsMouseOut = this.props.colsActions.colsMouseOut.bind(this);
    //this.state = {colElements:[]};
  }

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
      <Wrapper
        data={data} 
        colsElementInit={this.colsElementInit}
        colsMouseMove={this.colsMouseMove}
        colsMouseDown={this.colsMouseDown}
        colsMouseUp={this.colsMouseUp}
        colsMouseOut={this.colsMouseOut}
        colsMouseOver={this.colsMouseOver}
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


