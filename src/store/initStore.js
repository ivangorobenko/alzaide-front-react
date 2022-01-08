import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {axiosHttpClient} from "./dependencies/axiosHttpClient";
import {nativeTimer} from "./dependencies/nativeTimer";
import {rootReducer} from "./rootReducer";

const initialiseDependencies = () => ({
    httpClient: axiosHttpClient,
    timer: nativeTimer,
});
export const initStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ;
    return createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk.withExtraArgument({...initialiseDependencies()})))
    );
};
