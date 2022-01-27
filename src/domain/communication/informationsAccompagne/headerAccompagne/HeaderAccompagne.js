import {useTheme} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import moment from "moment";
import 'moment/locale/fr';

import React from "react";


const useStyles = makeStyles(theme =>
    ({
        container: {
            height: "15vh",
            width: "100%",
            backgroundColor: "#223f7a",
            color: "white",
            zIndex: theme.zIndex.drawer + 1,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
        },
        jour: {
            marginTop: "16px",
            marginBottom: "8px"
        },
        heure: {
            marginTop: "8px",
            marginBottom: "16px"
        }
    }));


export const HeaderAccompagne = ({dateHeureDuMoment}) => {
    const classes = useStyles(useTheme());
    moment.locale('fr');
    const dateDuMoment = moment(dateHeureDuMoment).format("dddd, Do MMMM  YYYY");
    const heureDuMoment = moment(dateHeureDuMoment).format("hh:mm:ss");

    return <div className={classes.container}>
        <h3 className={classes.jour}>{dateDuMoment}</h3>
        <h3 className={classes.heure}>{heureDuMoment}</h3>
    </div>;
};
