import {connect} from "react-redux";
import {envoyerMessage, getMessages, supprimerMessage} from "../../../store/communication/communication";
import {TableauDeBordAccompagnant} from "./TableauDeBordAccompagnant";
import {messagesSelector} from "../../../store/rootReducer";

const mapStateToProps = state => ({
    messages: messagesSelector(state),
});
const mapDispatchToProps = dispatch => (
    {
        getMessages: () => dispatch(getMessages()),
        envoyerMessage: message => dispatch(envoyerMessage(message)),
        supprimerMessage: id =>dispatch(supprimerMessage(id))
    });

export default connect(mapStateToProps, mapDispatchToProps)(TableauDeBordAccompagnant);
