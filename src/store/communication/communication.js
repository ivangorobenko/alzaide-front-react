export const DATE_HEURE_DU_MOMENT_MIS_A_JOUR = 'DATE_HEURE_DU_MOMENT_MIS_A_JOUR';
export const MESSAGES_RECUPERES = 'MESSAGES_RECUPERES';
export const ALERTE_ACCOMPAGNANT_ENVOYEE = 'ALERTE_ACCOMPAGNANT_ENVOYEE';


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
        (dispatch, getState, {httpClient, timer}) => {
            const options = {
                enableHighAccuracy: true,
                timeout: 100,
                maximumAge: 0
            };
            navigator.geolocation.getCurrentPosition(pos => {
                const lieu = {latitude: pos.coords.latitude, longitude: pos.coords.longitude}
                envoyerAlerte(httpClient, timer, dispatch, lieu);
            }, () => {
                const defaultLieu = {latitude: 0, longitude: 0};
                envoyerAlerte(httpClient, timer, dispatch, defaultLieu);
            }, options);
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
        default:
            return state
    }
}

export const dateHeureDuMomentSelector = state => state.dateHeureDuMoment;
export const messagesSelector = state => state.messages;
export const alerteSelector = state => state.alerte;
