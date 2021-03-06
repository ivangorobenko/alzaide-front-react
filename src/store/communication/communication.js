export const DATE_HEURE_DU_MOMENT_MIS_A_JOUR = 'DATE_HEURE_DU_MOMENT_MIS_A_JOUR';
export const MESSAGES_RECUPERES = 'MESSAGES_RECUPERES';
export const ALERTE_RECUPEREE = 'ALERTE_RECUPEREE';
export const ALERTE_ACCOMPAGNANT_ENVOYEE = 'ALERTE_ACCOMPAGNANT_ENVOYEE';
export const TACHES_QUOTIDIENNES_RECUPEREES = 'TACHES_QUOTIDIENNES_RECUPEREES';

export const mettreAJourDateHeureDuMoment =
    () =>
        (dispatch, getState, {timer}) => {
            dispatch({type: DATE_HEURE_DU_MOMENT_MIS_A_JOUR, data: {timestamp: timer.now()}});
        };


export const getMessages =
    () =>
        (dispatch, getState, {httpClient}) => {
            httpClient.get("/messages").then(messages => {
                dispatch({type: MESSAGES_RECUPERES, data: {messages}});
            });
        };

export const recupererAlerte =
    () =>
        (dispatch, getState, {httpClient}) => {
            httpClient.get("/alerte").then((alerte) => {
                dispatch({
                    type: ALERTE_RECUPEREE,
                    data: {alerte: Object.keys(alerte).length === 0 ? undefined : alerte}
                });
            });
        };

export const recupererTachesQuotidiennes =
    () =>
        (dispatch, getState, {httpClient}) => {
            httpClient.get("/tache-quotidienne").then((tachesQuotidiennes) => {
                dispatch({
                    type: TACHES_QUOTIDIENNES_RECUPEREES,
                    data: {tachesQuotidiennes: Object.keys(tachesQuotidiennes).length === 0 ? undefined : tachesQuotidiennes}
                });
            });
        };

export const validerTacheQuotidienne =
    (tache) =>
        (dispatch, getState, {httpClient}) => {
            httpClient.post("/tache-quotidienne", {typeTache: tache.type}).then(() => {
                dispatch(recupererTachesQuotidiennes())
            });
        };

export const envoyerMessage =
    (message) =>
        (dispatch, getState, {httpClient}) => {
            httpClient.put("/message", {message}).then(() => {
                dispatch(getMessages());
            });
        };

export const supprimerMessage =
    (id) =>
        (dispatch, getState, {httpClient}) => {
            httpClient.delete("/messages/" + id).then(() => {
                dispatch(getMessages());
            });
        };

export const alerterAccompagnant =
    () =>
        (dispatch, getState, {httpClient, timer, geoLocationService}) => {
            const options = {
                enableHighAccuracy: true,
                timeout: 100,
                maximumAge: 0
            };
            const envoyerAlerteSansLieu = () => {
                envoyerAlerte(httpClient, timer, dispatch, {latitude: 0, longitude: 0});
            };
            const envoyerALerteAvecLieu = pos => {
                envoyerAlerte(httpClient, timer, dispatch, {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                });
            };
            geoLocationService.getGeoLocation(envoyerALerteAvecLieu, envoyerAlerteSansLieu, options);
        };


const envoyerAlerte = (httpClient, timer, dispatch, lieu) => {
    httpClient.put("/alerte", {
        alerte: {
            lieu,
            timestamp: timer.now()
        }
    }).then(() => {
        dispatch({
            type: ALERTE_ACCOMPAGNANT_ENVOYEE, data: {
                alerte: {
                    lieu, timestamp: timer.now()
                }
            }
        });
    });
};

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case DATE_HEURE_DU_MOMENT_MIS_A_JOUR:
            return {...state, dateHeureDuMoment: action.data.timestamp}
        case MESSAGES_RECUPERES:
            return {...state, messages: action.data.messages}
        case ALERTE_ACCOMPAGNANT_ENVOYEE:
            return {...state, alerte: action.data.alerte}
        case ALERTE_RECUPEREE:
            return {...state, alerte: action.data.alerte}
        case TACHES_QUOTIDIENNES_RECUPEREES:
            return {...state, tachesQuotidiennes: action.data.tachesQuotidiennes}
        default:
            return state
    }
}

export const dateHeureDuMomentSelector = state => state.dateHeureDuMoment;
export const messagesSelector = state => state.messages;
export const alerteSelector = state => state.alerte;
export const tachesQuotidiennesSelector = state => state.tachesQuotidiennes;
