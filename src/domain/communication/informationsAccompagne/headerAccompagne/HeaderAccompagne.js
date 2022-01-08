import {useTheme} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import moment from "moment";
import 'moment/locale/fr';

import React from "react";

moment.locale('fr');

const useStyles = makeStyles(theme =>
    ({
        container: {
            height:"240px",
            width: "100%",
            backgroundColor: "#223f7a",
            color: "white",
            zIndex: theme.zIndex.drawer + 1,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
        },
    }));


export const HeaderAccompagne = ({time}) => {
    const classes = useStyles(useTheme());
    const dateDuMoment = moment(time).format("dddd, Do MMMM  YYYY");
    const heureDuMoment = moment(time).format("LT");

    return <div className={classes.container}>
            <h2>{dateDuMoment}</h2>
            <h2>{heureDuMoment}</h2>
    </div>
        ;
};
