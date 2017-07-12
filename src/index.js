import React from 'react';
import ReactDOM from 'react-dom';
import CustomTable from './containers/CustomTable';
import './styles/index.css';           // <-- импорт стилей
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom';

const store = configureStore();

const About = () => (
  <div>
    <p> My homework of React study </p>
  </div>
);

const PageBody = () => (
  <main>
    <Switch>
      <Route exact path='/' component={CustomTable}/>
      <Route path='/about' component={About}/>
    </Switch>
  </main>
);

const PageHeader = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Main Page</Link></li>
        <li><Link to='/about'>About</Link></li>
      </ul>
    </nav>
  </header>
);

const App = () => (
  <div>
    <PageHeader />
    <PageBody />
  </div>
);
 
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <div className='CustomTable'>
        <App/>
      </div>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
