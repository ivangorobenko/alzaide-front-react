export const FEATURE_SWITCH_LOADED = 'FEATURE_SWITCH_LOADED';




export const loadFeatureSwitches =
    (featureSwitches) =>
        (dispatch) => {
            dispatch({type: FEATURE_SWITCH_LOADED, data: {featureSwitches}});
        };



export const reducer = (state = {}, action) => {
    switch (action.type) {
        case FEATURE_SWITCH_LOADED:
            return {...state, featureSwitches: action.data.featureSwitches}
        default:
            return state
    }
}

export const alerteFeatureSwitchSelector = state => state.featureSwitches.alerte;
