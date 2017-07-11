import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import {colsCount} from '../components/setup';

export default class Wrapper extends Component {
  constructor(props){
    super(props);
    this.params = {
      elTable: null,  
      elements: [],
      colRight: [],
      bottom: 0,
      activeColNum: -1,  
      changingState: -1, // 0 - none (colsInit finished), 1 - ready, 2 - is changing, 
                         //-1 - initial
      savedWidth: 0  // width of active column before changing
    };
    this.colsElementInit = this.colsElementInit.bind(this);
    this.colsMouseMove = this.colsMouseMove.bind(this);
    this.colsMouseDown = this.colsMouseDown.bind(this);
    this.colsMouseUp = this.colsMouseUp.bind(this);
    this.colsMouseOut = this.colsMouseOut.bind(this);
    this.setAddress = this.setAddress.bind(this);
    this.recalcColRight = this.recalcColRight.bind(this);
    this.recalcState = this.recalcState.bind(this);
  }  

  static propTypes = {
    data: PropTypes.shape({
      caption: PropTypes.string,  
      colNames: PropTypes.arrayOf(PropTypes.string),
      cells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
    }).isRequired
  }

  componentDidMount(){
    this.colsElementInit();
  }

  recalcColRight(){
    let params =  this.params;
    let elTr = params.elTable.children[1].children[0]; // /table/thead/tr      
    for(let i=0; i<elTr.children.length; i++) {
      params.elements[i] = elTr.children[i];    
    }
    params.colRight = [];
    for (let i=1; i<colsCount; ++i){
      params.colRight[i-1] = params.elements[i].offsetLeft;
    }
    params.colRight[colsCount-1] = elTr.offsetLeft + elTr.offsetWidth;
  }

  colsElementInit() {
    let params =  this.params;
    params.elTable = this.address.children[0]; // /div/table
    params.bottom = params.elTable.offsetTop + params.elTable.offsetHeight;
    this.recalcColRight();
    params.changingState = 0;
  };

  colsMouseMove(event) {
    event.preventDefault();
    let params =  this.params;
    let {activeColNum, changingState} = params;
    const x = event.pageX;

    if ((params.changingState === 0) || (params.changingState === 1)){
      let found = false;
      let newChangingState = 0;
      let newActiveColNum = -1;
      
      for (let i=0; i<colsCount; ++i){
        if (Math.abs(x - params.colRight[i]) < 20) {
          found = true;
          newActiveColNum = i;  
          newChangingState = 1;
          break;
        }
      }
      if (found){
        params.elTable.style.cursor='w-resize';
      }
      else{
        params.elTable.style.cursor='auto';
      }
      if ((activeColNum !== newActiveColNum) || (changingState !== newChangingState)){
        params.activeColNum = newActiveColNum;
        params.changingState = newChangingState;
      }
    } else if (params.changingState === 2) {
      params.elements[activeColNum].width = x - params.colRight[activeColNum] + params.savedWidth;
    }
  };

  colsMouseDown(event) {
    event.preventDefault();
    let params =  this.params;
    if (params.changingState !== 1) return;
    let { activeColNum } = params;
    if (activeColNum===0){
      params.savedWidth=params.colRight[0];
    } else {
      params.savedWidth = params.colRight[activeColNum] - params.colRight[activeColNum-1];
    }
    params.changingState = 2;
  }

  recalcState(){
    let params =  this.params;
    params.elTable.style.cursor='auto';
    this.recalcColRight();
    params.changingState = 0;
  }

  colsMouseUp(event) {
    event.preventDefault();
    if (this.params.changingState !== 2) return;
    this.recalcState();
  }    

  colsMouseOut(event) {
    const y = event.pageY;
    if (y < this.params.bottom) return;  //Некорректный вызов события
    if (this.params.changingState !== 2) return;
    this.recalcState();
  }    

  setAddress(elem){
    this.address = elem;
  }
 
  render() {
    console.log('render Wrapper');
    const data = this.props.data;
    return (
      <div 
        id='wrapper'
        onMouseMove={this.colsMouseMove}
        onMouseDown={this.colsMouseDown}
        onMouseUp={this.colsMouseUp}
        onMouseOut={this.colsMouseOut}
        ref={(elem) => {this.setAddress(elem);}}
      >  
        <Table
          data={data} 
        />
      </div>  
    );
  };
};
