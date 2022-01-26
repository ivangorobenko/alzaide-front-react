import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {axiosHttpClient} from "./dependencies/axiosHttpClient";
import {nativeTimer} from "./dependencies/nativeTimer";
import {rootReducer} from "./rootReducer";
import {browserGeolocationService} from "./dependencies/browserGeolocationService";

const initialiseDependencies = () => ({
    httpClient: axiosHttpClient,
    timer: nativeTimer,
    geoLocationService: browserGeolocationService
});
export const initStore = () => {
    const composeEnhancers =
        process.env.NODE_ENV === "production" ? compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk.withExtraArgument({...initialiseDependencies()})))
    );
};
