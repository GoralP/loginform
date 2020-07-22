import { combineReducers, createStore, applyMiddleware } from "redux";
import loginReducer from "./reducers";
import thunk from "redux-thunk";

const rootReducer = combineReducers({ loginReducer });

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };
