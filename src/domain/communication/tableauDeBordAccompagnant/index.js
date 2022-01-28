import {connect} from "react-redux";
import {
    envoyerMessage,
    getMessages,
    recupererAlerte,
    supprimerMessage
} from "../../../store/communication/communication";
import {TableauDeBordAccompagnant} from "./TableauDeBordAccompagnant";
import {alerteFeatureSwitchSelector, alerteSelector, messagesSelector} from "../../../store/rootReducer";

const mapStateToProps = state => ({
    messages: messagesSelector(state),
    alerte: alerteSelector(state),
    alerteFeatureActive: alerteFeatureSwitchSelector(state)
});
const mapDispatchToProps = dispatch => (
    {
        getMessages: () => dispatch(getMessages()),
        recupererAlerte: () => dispatch(recupererAlerte()),
        envoyerMessage: message => dispatch(envoyerMessage(message)),
        supprimerMessage: id =>dispatch(supprimerMessage(id))
    });

export default connect(mapStateToProps, mapDispatchToProps)(TableauDeBordAccompagnant);
