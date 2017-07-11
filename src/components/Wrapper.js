import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import {colsCount} from '../components/setup';

export default class Wrapper extends Component {

  constructor(props){
    super(props);
    this.state = {
      colParams: {
        elements: [],
        colRight: [],
        bottom: 0,
        activeColNum: -1,  
        changingState: -1, // 0 - none (colsInit finished), 1 - ready, 2 - is changing, 
                           //-1 - initial
        savedWidth: 0  // width of active column before changing
      },
      dummy: 0
    };
    this.colsElementInit = this.colsElementInit.bind(this);
    this.colsMouseMove = this.colsMouseMove.bind(this);
    this.colsMouseDown = this.colsMouseDown.bind(this);
    this.colsMouseUp = this.colsMouseUp.bind(this);
    this.colsMouseOut = this.colsMouseOut.bind(this);
    this.setAddress = this.setAddress.bind(this);
  }  

  static propTypes = {
    data: PropTypes.shape({
      caption: PropTypes.string,  
      colNames: PropTypes.arrayOf(PropTypes.string),
      cells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
    }).isRequired
  }

  colsElementInit(element) {
    if (this.state.colParams.changingState === 0) return;   
    let colParams = {...this.state.colParams};
    if (!element) { return; }
    for(let i=0; i<element.children.length; i++) {
      colParams.elements[i] = element.children[i];    
    }

    const headCoords = {
      left: element.offsetLeft,
      top: element.offsetTop,
      width: element.offsetWidth,
      height: element.offsetHeight
    };

    // Определим величину colRight
    colParams.colRight = [];
    for (let i=1; i<colsCount; ++i){
      colParams.colRight[i-1] = colParams.elements[i].offsetLeft;
    }
    colParams.colRight[colsCount-1] = headCoords.left + headCoords.width;

    let elTable = colParams.elements[0].parentNode.parentNode.parentNode; 
    colParams.bottom = elTable.offsetTop + elTable.offsetHeight;
    colParams.changingState = 0;
    this.setState({colParams});
  };

  colsMouseMove(event) {
    event.preventDefault();
    let colParams = {...this.state.colParams};
    let {activeColNum, changingState} = colParams;
    const x = event.pageX;

    if ((colParams.changingState === 0) || (colParams.changingState === 1)){
      let found = false;
      let newChangingState = 0;
      let newActiveColNum = -1;
      
      for (let i=0; i<colsCount; ++i){
        if (Math.abs(x - colParams.colRight[i]) < 20) {
          found = true;
          newActiveColNum = i;  
          newChangingState = 1;
          break;
        }
      }
      if (found){
        colParams.elements[0].parentNode.parentNode.parentNode.style.cursor='w-resize';
      }
      else{
        colParams.elements[0].parentNode.parentNode.parentNode.style.cursor='auto';
      }
      if ((activeColNum !== newActiveColNum) || (changingState||newChangingState)){
        colParams.activeColNum = newActiveColNum;
        colParams.changingState = newChangingState;
        this.setState({colParams});

      }
    } else if (colParams.changingState === 2) {
      //TODO избежать ненужного копирования стейта  
      colParams.elements[activeColNum].width = x - colParams.colRight[activeColNum] + colParams.savedWidth;
    }
  };


  colsMouseDown(event) {
    event.preventDefault();
    let colParams = {...this.state.colParams};
    if (colParams.changingState !== 1) return;
    let { activeColNum } = colParams;
    if (activeColNum===0){
      colParams.savedWidth=colParams.colRight[0];
    } else {
      colParams.savedWidth = colParams.colRight[activeColNum] - colParams.colRight[activeColNum-1];
    }
    colParams.changingState = 2;
    this.setState({colParams});
  }

  recalcState(colParams){
    colParams.elements[0].parentNode.parentNode.parentNode.style.cursor='auto';
    const parentNode = colParams.elements[0].parentNode;
    const headCoords = {
      left: parentNode.offsetLeft,
      top: parentNode.offsetTop,
      width: parentNode.offsetWidth,
      height: parentNode.offsetHeight
    };
    colParams.colRight = [];
    for (let i=1; i<colsCount; ++i){
      colParams.colRight[i-1] = colParams.elements[i].offsetLeft;
    }
    colParams.colRight[colsCount-1] = headCoords.left + headCoords.width;
    colParams.changingState = 0;
    this.setState({colParams});
  }

  colsMouseUp(event) {
    event.preventDefault();
    let colParams = {...this.state.colParams};
    if (colParams.changingState !== 2) return;
    this.recalcState(colParams);
  }    

  colsMouseOut(event) {
    let colParams = {...this.state.colParams};
    const y = event.pageY;
    if (y < colParams.bottom) return;  //Некорректный вызов события
    if (colParams.changingState !== 2) return;
    this.recalcState(colParams);
  }    

  setAddress(elem){
    this.address = elem;
  }

  componentDidMount(){
    console.log('componentDidMount');
    //                 /div    /table     /thead       /tr
    let element = this.address.children[0].children[1].children[0];
    this.colsElementInit(element);
  }

  shouldComponentUpdate(nextProps, nextState){
    return false;
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

