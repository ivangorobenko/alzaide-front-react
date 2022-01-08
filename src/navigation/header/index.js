import {dateHeureDuMomentSelector} from "../../store/rootReducer";
import {connect} from "react-redux";
import {Header} from "./Header";

const mapStateToProps = state => ({
    time: dateHeureDuMomentSelector(state),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
