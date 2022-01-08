import React from "react";
import {Button, Card, CardActions, CardContent, Typography, useTheme} from "@material-ui/core";
import moment from "moment";
import 'moment/locale/fr';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() =>
    ({
        heureMessage: {
            padding: "0 16px 0 0",
            color: "#838383"
        },
        message: {
            margin: "20px",
            backgroundColor: "#cecece",
        }
    }));


export const Message = ({message, droitSupprimer = false, supprimerMessage}) => {
    const classes = useStyles(useTheme());
    moment.locale("fr");
    const heureMessage = moment(message.timestamp).format('LT');

    return (
        <Card className={classes.message}>
            <CardContent>
                <Typography className={classes.heureMessage} variant="h5">
                    {heureMessage}
                </Typography>
                <Typography variant="h4">
                    {message.contenu}
                </Typography>
            </CardContent>
            {droitSupprimer &&
            <CardActions>
                <Button onClick={() => supprimerMessage(message.id)}>Supprimer</Button>
            </CardActions>
            }
        </Card>)
};
