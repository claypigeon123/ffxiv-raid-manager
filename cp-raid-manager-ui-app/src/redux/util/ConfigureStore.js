import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { appReducer } from "../reducers/AppReducer";

export const configureStore = (preloadedState) => {
    const middlewares = [thunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);

    const store = createStore(appReducer, preloadedState, composedEnhancers);

    return store;
}