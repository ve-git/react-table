import {COLS_ELEMENT_INIT, 
  COLS_INIT_STARTED, COLS_INIT_FINISHED, 
  COLS_MOUSEMOVE, 
  COLS_MOUSEDOWN, COLS_MOUSEUP, COLS_MOUSEOUT, COLS_MOUSEOVER} from '../constants/Cols';
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

      dispatch({ 
        type: COLS_INIT_FINISHED,
        colRight,
        headCoords
      });
    }
  };
}    

export function colsMouseMove(event) {
  return function (dispatch, getState) {
    //event.preventDefault;
    const { cols } = getState(); 
    let {activeColNum, changingState, elements} = cols;
    const x = event.pageX;

    if ((cols.changingState === 0) || (cols.changingState === 1)){
      let found = false;
      let newChangingState = 0;
      let newActiveColNum = -1;
      
      for (let i=0; i<colsCount; ++i){
        if (Math.abs(x - cols.colRight[i]) < 10) {
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
  console.log('colsMouseDown Пробую зайти!');  
  return function (dispatch, getState) {
    //event.preventDefault;
    const { cols } = getState(); 
    console.log('colsMouseDown Пробую зайти!');
    if (cols.changingState !== 1) return;
    console.log('Зашел!!!!!');
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

export function colsMouseUp(event) {
console.log('colsMouseUp Пробую зайти!');   
  return function (dispatch, getState) {
    //event.preventDefault;
    const { cols } = getState(); 
    
    if (cols.changingState !== 2) return;
   
    //курсор находится у правой границы, так что изменения не требуется
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
      headCoords,
      colRight
    });
    //colsMouseMove(event);
  };
}    

/*
const initialState = {
  elements: [],
  colRight: [],
  headCoords: {left:0, top:0, width:0, height:0},
  activeColNum: -1,  
  changingState: -2, // 0 - none, 1 - ready, 2 - is changing, -2 - initial, -1 - colsInit started
  savedWidth: 0  // width of active column before changing
}; 
*/

/*

Состояния при работе с мышью
- номер активного столбца (появляется при подходе к границы, пустеет при отходе от)
- режим изменения (0,1,2) – нет, готов, изменяется
- начальная ширина последнего изменяемого элемента
- координаты шапки

2.	Mouseмove 
2.1.	Если режим равен «нет». При перемещении – смотреть координаты шапки 
Если находимся где-то промежду, то определяем, находимся ли вблизи границы элементов. 
Если находимся, то меняем форму курсора, возможно, режим изменения «готов». 
Иначе – обычный курсор, режим изменения «нет»
2.2.	Если режим «изменяется» –изменяем ширину изменяемой колонки. Фиксируем, 
естественно, эту ширину.
3.	Mousedown – режим «готов», то переходим в режим «изменяется» определяем, 
какой по счету столбец изменяется, запоминаем ту ширину, которая была и номер.
4.	Mouseup – если режим был «изменяется», режим становится «нет»  и курсор обычный (А если надо – mousemove сделает «готов»). И начальная ширина очищается. А у столбца, который изменялся – последняя на момент изменений.
5.	Mouseout – если режим «изменяется», то возвращаем старое значение изменяемому столбцу
6.	Mouseover – если режим «изменяется», то снова устанавливаем ширину, которую сохранили для элемента.



mousedown
    Кнопка мыши нажата над элементом.
mouseup
    Кнопка мыши отпущена над элементом.
mouseover
    Мышь появилась над элементом.
mouseout
    Мышь ушла с элемента.
mousemove
    Каждое движение мыши над элементом генерирует это событие.


*/


/*
const initialState = {
  elements: [],
  colLeft: [],
  headCoords: {left:0, top:0, width:0, height:0},
  activeColNum: -1,  
  changingState: -2, // 0 - none, 1 - ready, 2 - is changing, -2 - initial, -1 - colsInit started
  startWidth: 0  // width of active column before changing
}; 
*/
