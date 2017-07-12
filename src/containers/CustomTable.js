import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Wrapper from '../components/Wrapper';
import * as TableActions from '../actions/TableActions';

class CustomTable extends Component {
  constructor(props){
    super(props);
    const { loadTable } = this.props.tableActions;
    this.loadTable = loadTable.bind(this);
  }

  componentDidMount(){
    this.loadTable(1);
  };

  render() {
    const data = this.props.data;
    if (data.fetching) {  return (<div> Загрузка страницы N {data.pageNum}</div> ); }
    else if (data.error){ return (<div> {data.error}</div>); } 
    else if (!data.cells) { return false; }  
    else { return (
      <Wrapper
        data={data} 
      />);}
  };
};

function mapStateToProps(state) {
  return {
    data: state.table
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tableActions: bindActionCreators(TableActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTable);
