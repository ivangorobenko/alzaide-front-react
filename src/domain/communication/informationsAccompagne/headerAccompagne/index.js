import {dateHeureDuMomentSelector} from "../../../../store/rootReducer";
import {connect} from "react-redux";
import {HeaderAccompagne} from "./HeaderAccompagne";

const mapStateToProps = state => ({
    time: dateHeureDuMomentSelector(state),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAccompagne);
