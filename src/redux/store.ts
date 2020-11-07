import {createStore} from 'redux';

import {reducer} from './reducer';

export type IAppState = ReturnType<typeof reducer>;

export const store = createStore(reducer);