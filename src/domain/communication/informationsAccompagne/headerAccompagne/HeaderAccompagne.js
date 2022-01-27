import moment from "moment";
import 'moment/locale/fr';

import React from "react";
import './HeaderAccompagne.css';

export const HeaderAccompagne = ({dateHeureDuMoment}) => {
    moment.locale('fr');
    const dateDuMoment = moment(dateHeureDuMoment).format("dddd, Do MMMM  YYYY");
    const heureDuMoment = moment(dateHeureDuMoment).format('LTS');

    return <div className={`header-container`}>
        <h3 className={`jour`}>{dateDuMoment}</h3>
        <h3 className={`heure`}>{heureDuMoment}</h3>
    </div>;
};
