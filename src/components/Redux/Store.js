import {createStore,combineReducers} from 'redux';
import quiztempdata from './Reducer'

const reducers = combineReducers({
    quiztempdata
})

export const store=createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())