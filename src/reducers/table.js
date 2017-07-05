import {LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE} from '../constants/Table';

const initialState = {
  caption: 'Заголовок',
  colNames: ['I', 'II', 'III', 'IV'],
  cells: [],
  fetching: false,
  pageNum: 0,
  error: ''
};

export default function table(state = initialState, action) {
  switch (action.type) {
  case LOAD_REQUEST:
    return { ...state, fetching: true, pageNum: action.pageNum };
  case LOAD_SUCCESS:
    return { ...state, fetching: false, pageNum: action.pageNum, cells: action.payload};
  case LOAD_FAILURE:
    return { ...state, fetching: false, pageNum: action.pageNum, error: action.error};
  default:
    return state;
  }
}
