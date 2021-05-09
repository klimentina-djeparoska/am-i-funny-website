import {
    createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { apiMiddleware } from 'redux-api-middleware';
import reducers from './reducers';

const makeStore = () => createStore(
    combineReducers(reducers),
    {},
    compose(
        applyMiddleware(
            apiMiddleware,
        ),
    ),
);

const wrapper = createWrapper(makeStore, { debug: true });

export default wrapper;
