import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import store from './store'
import {fetchTodos} from './features/todos/todosSlice'

store.dispatch(fetchTodos({}))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store={store}>
      <App />
    </Provider>
  
);

reportWebVitals();