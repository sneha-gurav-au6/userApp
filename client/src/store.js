import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./redux/reducers/userReducer";
import thunk from "redux-thunk";

// export default store;
const store = createStore(
    userReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
export default store;
