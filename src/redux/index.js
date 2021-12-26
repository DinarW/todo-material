import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';

import tasksReducer from './reducers/tasks';
import filterReducer from './reducers/filter';

const rootReducer = combineReducers({
  filter: filterReducer,
  tasks: tasksReducer,
});

const log = (store) => (next) => (action) => {
  if (action.type === 'ADD_TASK') {
    axios.post('https://61ba2ba348df2f0017e5a968.mockapi.io/tasks', action.payload);
    setTimeout(() => {
      next(action);
    }, 200);
    return;
  }
  if (action.type === 'DELETE_TASK') {
    axios.delete(`https://61ba2ba348df2f0017e5a968.mockapi.io/tasks/${action.payload}`);
    setTimeout(() => {
      next(action);
    }, 200);
    return;
  }

  return next(action);
};

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, log)));

export default store;
