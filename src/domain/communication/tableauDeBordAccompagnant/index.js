import {connect} from "react-redux";
import {
    envoyerMessage,
    getMessages,
    recupererAlerte,
    supprimerMessage
} from "../../../store/communication/communication";
import {TableauDeBordAccompagnant} from "./TableauDeBordAccompagnant";
import {alerteSelector, messagesSelector} from "../../../store/rootReducer";

const mapStateToProps = state => ({
    messages: messagesSelector(state),
    alerte: alerteSelector(state)
});
const mapDispatchToProps = dispatch => (
    {
        getMessages: () => dispatch(getMessages()),
        recupererAlerte: () => dispatch(recupererAlerte()),
        envoyerMessage: message => dispatch(envoyerMessage(message)),
        supprimerMessage: id =>dispatch(supprimerMessage(id))
    });

export default connect(mapStateToProps, mapDispatchToProps)(TableauDeBordAccompagnant);
