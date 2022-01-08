import {useTheme} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";
import moment from "moment";
import 'moment/locale/fr';

import React from "react";

    moment.locale('fr');

const useStyles = makeStyles(theme =>
    ({
        appBar: {
            backgroundColor: "#064ee0",
            zIndex: theme.zIndex.drawer + 1,
            padding:"16px"
        },
        toolBar: {
            height: "200px",
            justifyContent: "center",
            display:"flex",
            flexDirection:"column"
        },
    }));


export const Header = ({time}) => {
    const classes = useStyles(useTheme());
    const dateDuMoment = moment(time).format("dddd, Do MMMM  YYYY");
    const heureDuMoment = moment(time).format("LT");

    return <Box display="flex">
        <AppBar elevation={0} position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
                <h1>{dateDuMoment}</h1>
                <h1>{heureDuMoment}</h1>
            </Toolbar>
        </AppBar>
    </Box>;
};
