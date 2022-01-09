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
            const alerte = {lieu: {latitude: 1.2, longitude: 2.3}, timestamp: timer.now()};
            httpClient.put("/alerte", {alerte}).then(() => {
                dispatch({type: ALERTE_ACCOMPAGNANT_ENVOYEE, data: {alerte}});
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

export const dateHeureDuMomentSelector = state => state.time;
export const messagesSelector = state => state.messages;
export const alerteSelector = state => state.alerte;
