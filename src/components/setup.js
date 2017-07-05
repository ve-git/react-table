//import axios from 'axios';
export const colsCount = 4;

export const fillTableFromArray = function(table, rowsCount, colsCount, source){
  let elemCount = source.length;
  let i, j; 
  let k = 0;
  for (i=0; i<rowsCount; ++i){
    table[i] = [];
    for (j=0; j<colsCount; ++j){
      if (k === elemCount){ break;}
      table[i][j] = source[k];
      ++k;
    }
    if (k === elemCount){ break;}
  }
};

/*
export const getExternalData = function(rowsCount=4, colsCount=10, pageNum='1', callback, callbackError){
  let newWords = [];
  let words = [];
  const maxWordsCount = colsCount * rowsCount;

  const loop = () =>
    axios({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts/1'
    })
    .then(response => {
      newWords = (response.data.body).split(/\s/);
      words = words.concat(newWords);
        
      if ((newWords.length===0)||(words.length>=maxWordsCount)){
        return words;
      }else{
        return loop();
      }
    });

  loop().then(() => {
    callback(words);
  }).catch(error => {
    callbackError(error);
  });
};
*/

