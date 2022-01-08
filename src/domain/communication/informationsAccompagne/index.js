import {connect} from "react-redux";
import {getMessages} from "../../../store/communication/communication";
import {InformationsAccompagne} from "./InformationsAccompagne";
import {messagesSelector} from "../../../store/rootReducer";

const mapStateToProps = state => ({
    messages: messagesSelector(state),
});
const mapDispatchToProps = dispatch => ({getMessages: () => dispatch(getMessages())});

export default connect(mapStateToProps, mapDispatchToProps)(InformationsAccompagne);
