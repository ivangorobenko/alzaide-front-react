import {combineReducers} from "redux";
import * as communication from "./communication/communication";

export const rootReducer = combineReducers({
    communication: communication.reducer,
});

export const dateHeureDuMomentSelector = state => communication.dateHeureDuMomentSelector(state.communication);
export const messagesSelector = state => communication.messagesSelector(state.communication);
