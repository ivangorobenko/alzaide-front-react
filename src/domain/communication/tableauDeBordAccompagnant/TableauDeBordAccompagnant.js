import React, {useEffect, useState} from "react";
import {Message} from "../message/Message";
import {Button, Card, CardActions, CardContent, Grid, Paper, TextField} from "@material-ui/core";

export const TableauDeBordAccompagnant = ({messages, getMessages, envoyerMessage, supprimerMessage}) => {
    const [message, setMessage] = useState();

    useEffect(() => {
        const interval = setInterval(() => getMessages(), 1000);
        return () => clearInterval(interval);
    }, [getMessages]);

    return <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
    >
        <Grid item>
            <Paper>
                {messages?.map(message =>
                    <Message droitSupprimer={true} key={message.id} message={message}
                             supprimerMessage={supprimerMessage}/>)}
            </Paper>
        </Grid>
        <Grid item>
            <Card>
                <CardContent>
                    <TextField
                        multiline
                        onChange={event => setMessage(event.target.value)}
                    />
                </CardContent>
                <CardActions>
                    <Button size="medium" color="primary" onClick={() => envoyerMessage(message)}>
                        Envoyer
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    </Grid>
};
