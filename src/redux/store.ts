import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import {reducer} from './reducer';

export type IAppState = ReturnType<typeof reducer>;

export const store = createStore(reducer, applyMiddleware(thunk));