import {createStore,applyMiddleware} from 'redux'
import {counter} from "./reducers"
import thunk from "redux-thunk";

const store = createStore(
    counter,
    applyMiddleware(thunk)
)
export default store