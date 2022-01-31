import {connect} from "react-redux";
import {
    alerterAccompagnant,
    getMessages,
    recupererAlerte,
    recupererTachesQuotidiennes, validerTacheQuotidienne
} from "../../../store/communication/communication";
import {InformationsAccompagne} from "./InformationsAccompagne";
import {
    alerteSelector,
    messagesSelector,
    alerteFeatureSwitchSelector,
    tachesQuotidiennesSelector
} from "../../../store/rootReducer";

const mapStateToProps = state => ({
    messages: messagesSelector(state),
    alerte: alerteSelector(state),
    tachesQuotidiennes: tachesQuotidiennesSelector(state),
    alerteFeatureActive: alerteFeatureSwitchSelector(state)
});
const mapDispatchToProps = dispatch => ({
    getMessages: () => dispatch(getMessages()),
    alerterAccompagnant: () => dispatch(alerterAccompagnant()),
    recupererAlerte: () => dispatch(recupererAlerte()),
    recupererTachesQuotidiennes: () => dispatch(recupererTachesQuotidiennes()),
    validerTacheQuotidienne: (tache)=>dispatch(validerTacheQuotidienne(tache))
});

export default connect(mapStateToProps, mapDispatchToProps)(InformationsAccompagne);
