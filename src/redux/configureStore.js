import {
  createStore, combineReducers, compose, applyMiddleware,
} from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import coinReducer from './coinsRe/coins';
import detailsReducer from './details/details';

const reducer = combineReducers({
  coinReducer,
  detailsReducer,
  // additional reducers could be added here
});

const composed = compose(applyMiddleware(thunkMiddleware, logger));

const store = createStore(
  reducer,
  composed,
);

export default store;
