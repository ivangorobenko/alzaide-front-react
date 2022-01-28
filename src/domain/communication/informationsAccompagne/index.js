import {connect} from "react-redux";
import {alerterAccompagnant, getMessages, recupererAlerte} from "../../../store/communication/communication";
import {InformationsAccompagne} from "./InformationsAccompagne";
import {alerteSelector, messagesSelector,alerteFeatureSwitchSelector} from "../../../store/rootReducer";

const mapStateToProps = state => ({
    messages: messagesSelector(state),
    alerte: alerteSelector(state),
    alerteFeatureActive: alerteFeatureSwitchSelector(state)
});
const mapDispatchToProps = dispatch => ({
    getMessages: () => dispatch(getMessages()),
    alerterAccompagnant: () => dispatch(alerterAccompagnant()),
    recupererAlerte: () => dispatch(recupererAlerte()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InformationsAccompagne);
