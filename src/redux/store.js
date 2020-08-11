import { combineReducers, createStore, applyMiddleware } from "redux";
import loginReducer from "./reducers/loginReducer";
import addPasteReducer from "./reducers/addPasteReducer";
import getPasteReducer from "./reducers/getPasteReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  loginReducer,
  addPasteReducer,
  getPasteReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };
