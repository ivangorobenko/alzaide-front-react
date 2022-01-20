import {alerterAccompagnant, envoyerMessage, getMessages, recupererAlerte, supprimerMessage} from "./communication";
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "../rootReducer";
import thunk from "redux-thunk";

describe('Communication reducer', function () {
    describe('quand una action de suppression de messages est effectuée', function () {
        it(`doit appeler un service http pour supprimer le message`, async function () {
            //GIVEN
            let calledUrl = undefined;
            const expectedUrl = "/messages/123";

            const store = createStore(
                rootReducer,
                {},
                applyMiddleware(
                    thunk.withExtraArgument({
                        httpClient: {
                            delete: (url) => {
                                calledUrl = url;
                                return new Promise(() => {
                                });
                            },
                        },
                    })
                )
            );

            //WHEN
            store.dispatch(supprimerMessage(123));

            //THEN
            expect(calledUrl).toEqual(expectedUrl)
        });
        it(`doit dispatcher une action de récupération de messages si suppression s'est bien déroulée`, async function () {
            //GIVEN
            let calledUrl = undefined;
            const expectedUrl = "/messages";
            let resolveToCall = () => undefined;


            const store = createStore(
                rootReducer,
                {},
                applyMiddleware(
                    thunk.withExtraArgument({
                        httpClient: {
                            delete: () => {
                                return new Promise((resolve) => {
                                    resolveToCall = () => resolve();
                                });
                            },
                            get: (url) => {
                                calledUrl = url
                                return new Promise(() => {
                                })
                            }
                        },
                    })
                )
            );

            //WHEN
            store.dispatch(supprimerMessage(123));
            await resolveToCall();

            //THEN
            expect(calledUrl).toEqual(expectedUrl)
        });
    });
    describe(`quand una action d'envoie d'un message est effectuée`, function () {
        const message = {
            id: '6280e1b8-918d-4919-80c4-ca0d73f083f9',
            contenu: 'J\'arrive dans 30 mins',
            timestamp: 1641803883425
        };
        it(`doit appeler un service http pour envoyer le message`, async function () {
            //GIVEN
            let calledUrl = undefined;
            let sendBody = {};
            const expectedUrl = "/message";


            const store = createStore(
                rootReducer,
                {},
                applyMiddleware(
                    thunk.withExtraArgument({
                        httpClient: {
                            put: (url, body) => {
                                calledUrl = url;
                                sendBody = body;
                                return new Promise(() => {
                                });
                            },
                        },
                    })
                )
            );
            //WHEN
            store.dispatch(envoyerMessage(message));

            //THEN
            expect(calledUrl).toEqual(expectedUrl)
            expect(sendBody).toEqual({message})

        });
        it(`doit dispatcher une action de récupération de messages si envoie s'est bien déroulée`, async function () {
            //GIVEN
            let calledUrl = undefined;
            const expectedUrl = "/messages";
            let resolveToCall = () => undefined;


            const store = createStore(
                rootReducer,
                {},
                applyMiddleware(
                    thunk.withExtraArgument({
                        httpClient: {
                            put: () => {
                                return new Promise((resolve) => {
                                    resolveToCall = () => resolve();
                                });
                            },
                            get: (url) => {
                                calledUrl = url
                                return new Promise(() => {
                                })
                            }
                        },
                    })
                )
            );

            //WHEN
            store.dispatch(envoyerMessage(message));
            await resolveToCall();

            //THEN
            expect(calledUrl).toEqual(expectedUrl)
        });
    });
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
            lieu: {
                latitude: 43.5995185,
                longitude: 1.453145
            },
            timestamp: 1641826935960,
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
    it(`doit rendre alerte undefined dans le store si aucune alerte n'a été recupérée`, async function () {
        //GIVEN
        let resolveToCall = () => undefined;

        const alerte = {
            lieu: {
                latitude: 43.5995185,
                longitude: 1.453145
            },
            timestamp: 1641826935960,
        };
        const store = createStore(
            rootReducer,
            {alerte},
            applyMiddleware(
                thunk.withExtraArgument({
                    httpClient: {
                        get: () => {
                            return new Promise((resolve) => {
                                resolveToCall = () => resolve({});
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
        expect(state.communication.alerte).toEqual(undefined)
    });
    it(`doit pouvoir lancer une alerte à l'accompagnant et alimenter le store avec cette alerte`, async function () {
        //GIVEN
        let resolveToCall = () => undefined;

        const alerte = {
            lieu: {
                latitude: 1.1,
                longitude: 1.2
            },
            timestamp: 123,
        };
        const store = createStore(
            rootReducer,
            {},
            applyMiddleware(
                thunk.withExtraArgument({
                    httpClient: {
                        put: () => {
                            return new Promise((resolve) => {
                                resolveToCall = () => resolve();
                            });
                        },
                    },
                    geoLocationService: {
                        getGeoLocation: (success) => {
                            success({
                                coords: {
                                    latitude: 1.1,
                                    longitude: 1.2
                                }
                            })
                        }
                    },
                    timer: {
                        now: () => 123
                    }
                })
            )
        );
        //WHEN
        store.dispatch(alerterAccompagnant());
        await resolveToCall();

        //THEN
        const state = store.getState();
        expect(state.communication.alerte).toEqual(alerte)
    });
});
