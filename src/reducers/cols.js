import {COLS_ELEMENT_INIT, COLS_INIT_STARTED, COLS_INIT_FINISHED, 
  COLS_MOUSEMOVE, COLS_MOUSEDOWN, COLS_MOUSEUP, COLS_MOUSEOUT} from '../constants/Cols';

const initialState = {
  elements: [],
  colRight: [],
  bottom: 0,
  //headCoords: {left:0, top:0, width:0, height:0},
  activeColNum: -1,  
  changingState: -2, // 0 - none (colsInit finished), 1 - ready, 2 - is changing, 
                     //-2 - initial, -1 - colsInit started
  savedWidth: 0  // width of active column before changing
};

export default function cols(state = initialState, action) {
  console.log('action.type = ' + action.type);
  switch (action.type) {
  case COLS_ELEMENT_INIT: {
    let elements = state.elements.slice();
    elements[action.num] = action.element;
    return { ...state, elements };
  }
  case COLS_INIT_STARTED: {
    return { ...state, changingState: -1};
  }
  case COLS_INIT_FINISHED: {
    return { ...state, colRight: action.colRight, bottom: action.bottom, changingState: 0, };
  }
  case COLS_MOUSEMOVE: {
    return { ...state, activeColNum: action.activeColNum, changingState: action.changingState};
  }
  case COLS_MOUSEDOWN: {
    return { ...state, changingState: 2, savedWidth:action.savedWidth};
  }
  case COLS_MOUSEUP: {
    return { ...state, changingState: 0, colRight: action.colRight};
  }
  case COLS_MOUSEOUT: {
    console.log(COLS_MOUSEOUT);
    return { ...state, changingState: 0, colRight: action.colRight};
  }
  default:
    return state;
  }
}

