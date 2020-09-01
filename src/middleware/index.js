import {applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';


export default applyMiddleware(thunk, promiseMiddleware);