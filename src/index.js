import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './styles/index.css';           // <-- импорт стилей
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();


ReactDOM.render(
  <Provider store={store}>
    <div className='app'> {/* обернули все в .app */}
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);

//registerServiceWorker();
