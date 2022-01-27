import React from "react";
import moment from "moment";
import 'moment/locale/fr';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import './Message.css';

export const Message = ({message, droitSupprimer = false, supprimerMessage}) => {
    moment.locale("fr");
    const heureMessage = moment(message.timestamp).format('LT');

    return (
        <Card className={`message`}>
            <CardContent>
                <Typography className={`heureMessage`} variant="h6">
                    {heureMessage}
                </Typography>
                <Typography variant="h5">
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
