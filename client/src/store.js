import { createStore, applyMiddleware } from 'redux'
import authReducer from './authReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


const middleWare = [thunk]

const intialstate = {}
const store = createStore(
    authReducer,
    intialstate,
    composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;