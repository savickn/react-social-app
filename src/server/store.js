
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import createMemoryHistory from 'history/createMemoryHistory';

import reducers from '../client/reducers';

const sagaMiddleware = createSagaMiddleware();
const history = createMemoryHistory();

const reduxMiddlewares = [
  routerMiddleware(history),
  sagaMiddleware,
];

export default (initialState = {}) => {
  const store = createStore(
    combineReducers({
      //router: connectRouter(),
      ...reducers
    }),
    initialState,
    compose(applyMiddleware(...reduxMiddlewares)),
  );

  store.runSaga = sagaMiddleware.run;

  store.close = () => store.dispatch(END);

  return store;
};