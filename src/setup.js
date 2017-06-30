/*
const setup = function(callback){
  return ({
    caption: 'Заголовок',
    colNames: ['I', 'II', 'III', 'IV'],
    cells: [
      ['1', '2', '3'],
      ['4', '5', '6', 'extra'],
      ['7', '8', '9'],
      ['10', '11', '12']
    ]
  }
  );
};
*/

exports.fillTableFromArray = function(table, rowsCount, colsCount, source){
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
