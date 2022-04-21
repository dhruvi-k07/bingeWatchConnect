import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import reducers from "../reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk, promise];

const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
