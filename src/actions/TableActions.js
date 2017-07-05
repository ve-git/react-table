import {LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE} from '../constants/Table';
import {fillTableFromArray} from '../components/setup';
import axios from 'axios';

export function loadTable(pageNum=1) {
  // Interpreted by the thunk middleware:
  return function (dispatch, getState) {
    let { table } = getState();
    if (table[pageNum]) {
      // There is cached data! Don't do anything.
      return;
    }

    dispatch({
      type: LOAD_REQUEST,
      pageNum: pageNum
    });

    let cells = [];
    let rowsCount=4, colsCount=10;
    let newWords = [];
    let words = [];
    const maxWordsCount = colsCount * rowsCount;

    // TODO вынести в отдельный модуль. 
    // Пока не могу вызвать dispatch из callback-функции, поэтому и не вынес.
    const loop = () =>
      axios({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/posts/'+pageNum
      })
      .then(response => {
        newWords = (response.data.body).split(/\s/);
        words = words.concat(newWords);
        
        if ((newWords.length===0)||(words.length>=maxWordsCount)){
          return words;
        } else {
          return loop();
        }
      });


    loop().then((words) => {
      if (words.length) {
        fillTableFromArray(cells, 10, 4, words);
        dispatch({
          type: LOAD_SUCCESS,
          pageNum: pageNum,
          payload: cells
        });
      } else {
        dispatch({
          type: LOAD_FAILURE,
          pageNum: pageNum,
          error: 'Сервер не вернул данных!'
        });
      }
    }).catch((e)=>{
      dispatch({
        type: LOAD_FAILURE,
        pageNum: pageNum,
        error: 'Ошибка ' + e.name + ':' + e.message + '\n' + e.stack
      });
    });
  };
};
