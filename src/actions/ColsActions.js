import {COLS_ELEMENT_INIT, 
  COLS_INIT_STARTED, COLS_INIT_FINISHED, 
  COLS_MOUSEMOVE, 
  COLS_MOUSEDOWN, COLS_MOUSEUP, COLS_MOUSEOUT} from '../constants/Cols';
import {colsCount} from '../components/setup';


export function colsElementInit(element, num) {
  return function (dispatch, getState) {
    if (!element) { return; }
    dispatch({
      type: COLS_ELEMENT_INIT, 
      element, 
      num
    });
    if (num === colsCount-1) {
      dispatch({ 
        type: COLS_INIT_STARTED
      });
      const { cols } = getState(); 

      // Определим размеры родительского элемента (<tr>)
      const parentNode = cols.elements[0].parentNode;
      const headCoords = {
        left: parentNode.offsetLeft,
        top: parentNode.offsetTop,
        width: parentNode.offsetWidth,
        height: parentNode.offsetHeight
      };


      // Определим величину colRight
      let colRight = [];
      for (let i=1; i<colsCount; ++i){
        colRight[i-1] = cols.elements[i].offsetLeft;
      }
      colRight[colsCount-1] = headCoords.left + headCoords.width;

      let elTable = cols.elements[0].parentNode.parentNode.parentNode; 
      let bottom = elTable.offsetTop + elTable.offsetHeight;

      dispatch({ 
        type: COLS_INIT_FINISHED,
        colRight,
        bottom
      });
    }
  };
}    

export function colsMouseMove(event) {
  event.preventDefault();
  return function (dispatch, getState) {
    const { cols } = getState(); 
    let {activeColNum, changingState, elements, wrapper} = cols;
    const x = event.pageX;

    if ((cols.changingState === 0) || (cols.changingState === 1)){
      let found = false;
      let newChangingState = 0;
      let newActiveColNum = -1;
      
      for (let i=0; i<colsCount; ++i){
        if (Math.abs(x - cols.colRight[i]) < 20) {
          found = true;
          newActiveColNum = i;  
          newChangingState = 1;
          break;
        }
      }
      if (found){
        cols.elements[0].parentNode.parentNode.parentNode.style.cursor='w-resize';
      }
      else{
        cols.elements[0].parentNode.parentNode.parentNode.style.cursor='auto';
      }
      if ((activeColNum !== newActiveColNum) || (changingState||newChangingState)){
        dispatch({ 
          type: COLS_MOUSEMOVE,
          activeColNum: newActiveColNum,
          changingState: newChangingState
        });
      }
    } else if (cols.changingState === 2) {
      console.log('colsMouseMove Меняю ширину столбца ' + activeColNum );
      console.log('colsMouseMove Сохраненная ширина  ' + cols.savedWidth );
      console.log('colsMouseMove Дельта  ' + (x - cols.colRight[activeColNum]) );
      cols.elements[activeColNum].width = x - cols.colRight[activeColNum] + cols.savedWidth;
    }
  };
}    

export function colsMouseDown(event) {
  event.preventDefault();
  return function (dispatch, getState) {
    const { cols } = getState(); 
    if (cols.changingState !== 1) return;
    let { activeColNum } = cols;
    let savedWidth;
    if (activeColNum===0){
      savedWidth=cols.colRight[0];
    } else {
      savedWidth = cols.colRight[activeColNum] - cols.colRight[activeColNum-1];
    }
    console.log('colsMouseDown сохраненная ширина = '+ savedWidth);
    dispatch({ 
      type: COLS_MOUSEDOWN,
      changingState: 2,
      savedWidth
    });
  };
}    

function recalcState(cols, actionType, dispatch){
  cols.elements[0].parentNode.parentNode.parentNode.style.cursor='auto';
  const parentNode = cols.elements[0].parentNode;
  const headCoords = {
    left: parentNode.offsetLeft,
    top: parentNode.offsetTop,
    width: parentNode.offsetWidth,
    height: parentNode.offsetHeight
  };
  let colRight = [];
  for (let i=1; i<colsCount; ++i){
    colRight[i-1] = cols.elements[i].offsetLeft;
  }
  colRight[colsCount-1] = headCoords.left + headCoords.width;

  dispatch({ 
    type: COLS_MOUSEUP,
    colRight
  });
}

export function colsMouseUp(event) {
  event.preventDefault();
  return function (dispatch, getState) {
    const { cols } = getState(); 
    if (cols.changingState !== 2) return;
    recalcState(cols, COLS_MOUSEUP, dispatch);

  };
}    

export function colsMouseOut(event) {
  return function (dispatch, getState) {
    const { cols } = getState(); 
    const y = event.pageY;
    if (y < cols.bottom) return;  //Некорректный вызов события
    if (cols.changingState !== 2) return;
    recalcState(cols, COLS_MOUSEOUT, dispatch);
  };
}    
