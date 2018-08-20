import { createStore } from 'redux';
import reducer from '../reducers/reducer.js';

const initialState = {};

const store = createStore(reducer, initialState, window.devToolsExtension &&
window.devToolsExtension());

export default store;
