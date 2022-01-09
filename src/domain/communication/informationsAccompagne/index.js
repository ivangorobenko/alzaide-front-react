import {connect} from "react-redux";
import {alerterAccompagnant, getMessages} from "../../../store/communication/communication";
import {InformationsAccompagne} from "./InformationsAccompagne";
import {alerteSelector, messagesSelector} from "../../../store/rootReducer";

const mapStateToProps = state => ({
    messages: messagesSelector(state),
    alerte: alerteSelector(state)
});
const mapDispatchToProps = dispatch => ({
    getMessages: () => dispatch(getMessages()),
    alerterAccompagnant: () => dispatch(alerterAccompagnant())
});

export default connect(mapStateToProps, mapDispatchToProps)(InformationsAccompagne);
