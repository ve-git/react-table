import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Table from '../components/Table';
import * as PageActions from '../actions/TableActions';
import colsCount from '../components/setup';

class App extends Component {
  constructor(props){
    super(props);
    const { loadTable } = this.props.tableActions;
    this.loadTable = loadTable.bind(this);
    this.setColWidth = this.setColWidth.bind(this);
    this.state = {colsWidth:[]}
  }

// функция должна усьтанавливать щирину ячеек,  
  setColWidth(elem, colNum){
    if (!elem) return;
    console.log('colNum='+colNum);
    elem.style.backgroundColor = 'red';
    if (colNum < 2){
      elem.width = 300;
    } else {
      elem.width = 0;
    }
    console.log('elem.offsetWidth =' + elem.offsetWidth);
    
  }
/*
  componentWillReceiveProps(nextProps) {
    console.log('App.componentWillReceiveProps');
  }  
*/ 
  componentDidMount(){
    this.loadTable(1);
    //this.props.dispatch(this.loadTable(1)); // Так не работает!!!
  };

  render() {
    const data = this.props.data;
    if (data.fetching) {  return (<div> Загрузка страницы N {data.pageNum}</div> ); }
    else if (data.error){ return (<div> {data.error}</div>); } 
    else if (!data.cells) { return false; }  
    else { return (<Table data={data} setColWidth={this.setColWidth}/>);}
  };
};

function mapStateToProps(state) {
  return {
    data: state.table
    //,colWidth:state.cols // это на потом!
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tableActions: bindActionCreators(PageActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


/*

Состояния при работе с мышью
- номер активного столбца (появляется при подходе к границы, пустеет при отходе от)
- режим изменения (0,1,2) – нет, готов, изменяется
- начальная ширина последнего изменяемого элемента
- координаты шапки

2.	Mouseмove 
2.1.	Если режим равен «нет». При перемещении – смотреть координаты шапки Если находимся где-то промежду, то определяем, находимся ли вблизи границы элементов. Если находимся, то меняем форму курсора, возможно, режим изменения «готов». Иначе – обычный курсор, режим изменения «нет»
2.2.	Если режим «изменяется» –изменяем ширину изменяемой колонки. Фиксируем, естественно, эту ширину.
3.	Mousedown – режим «готов», то переходим в режим «изменяется» определяем, какой по счету столбец изменяется, запоминаем ту ширину, которая была и номер.
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