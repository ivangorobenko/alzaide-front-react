import {getMessages, recupererAlerte} from "./communication";
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "../rootReducer";
import thunk from "redux-thunk";

describe('Communication reducer', function () {
    it(`doit pouvoir récupérer des messages pour l'accompagné et alimenter le store`, async function () {
        //GIVEN
        let resolveToCall = () => undefined;
        const messages = [{
            id: '6280e1b8-918d-4919-80c4-ca0d73f083f9',
            contenu: 'J\'arrive dans 30 mins',
            timestamp: 1641803883425
        }];
        const store = createStore(
            rootReducer,
            {},
            applyMiddleware(
                thunk.withExtraArgument({
                    httpClient: {
                        get: () => {
                            return new Promise((resolve) => {
                                resolveToCall = () => resolve(messages);
                            });
                        },
                    },
                })
            )
        );
        //WHEN
        store.dispatch(getMessages());
        await resolveToCall();

        //THEN
        const state = store.getState();
        expect(state.communication.messages).toEqual(messages)
    });
    it(`doit pouvoir récupérer une alerte et alimenter le store`, async function () {
        //GIVEN
        let resolveToCall = () => undefined;

        const alerte = {
            _lieu: {
                latitude: 43.5995185,
                longitude: 1.453145
            },
            _timestamp: 1641826935960,
        };
        const store = createStore(
            rootReducer,
            {},
            applyMiddleware(
                thunk.withExtraArgument({
                    httpClient: {
                        get: () => {
                            return new Promise((resolve) => {
                                resolveToCall = () => resolve(alerte);
                            });
                        },
                    },
                })
            )
        );
        //WHEN
        store.dispatch(recupererAlerte());
        await resolveToCall();

        //THEN
        const state = store.getState();
        expect(state.communication.alerte).toEqual(alerte)
    });
});
