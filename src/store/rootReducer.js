import {combineReducers} from "redux";
import * as communication from "./communication/communication";
import * as ui from "./ui/ui";

export const rootReducer = combineReducers({
    communication: communication.reducer,
    ui: ui.reducer,
});

export const dateHeureDuMomentSelector = state => communication.dateHeureDuMomentSelector(state.communication);
export const messagesSelector = state => communication.messagesSelector(state.communication);
export const alerteSelector = state => communication.alerteSelector(state.communication);
export const tachesQuotidiennesSelector = state => communication.tachesQuotidiennesSelector(state.communication);
export const alerteFeatureSwitchSelector = state => ui.alerteFeatureSwitchSelector(state.ui);
