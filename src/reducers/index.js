import { combineReducers } from 'redux';
import table from './table';
import cols from './cols';

export default combineReducers({
  table,
  cols
});