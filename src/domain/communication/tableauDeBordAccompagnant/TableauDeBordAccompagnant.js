import React, {useEffect, useState} from "react";
import {Message} from "../message/Message";
import {Button, Card, CardActions, CardContent, Grid, TextField, useTheme} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() =>
    ({
        container: {
            height: "100%"
        },
        messages: {
            width: "100%",
            maxHeight: "80%",
            overflowY:"scroll"
        },
        nouveauMessage: {
            width: "100%",
        },
        contenu: {
            width: "100%"
        }
    }));

export const TableauDeBordAccompagnant = ({messages, getMessages, envoyerMessage, supprimerMessage}) => {
    const classes = useStyles(useTheme());

    const [message, setMessage] = useState();

    useEffect(() => {
        const interval = setInterval(() => getMessages(), 1000);
        return () => clearInterval(interval);
    }, [getMessages]);

    return <Grid
        className={classes.container}
        container
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={4}
    >
        <Grid item className={classes.messages}>
                {messages?.map(message =>
                    <Message droitSupprimer={true} key={message.id} message={message}
                             supprimerMessage={supprimerMessage}/>)}
        </Grid>
        <Grid item className={classes.nouveauMessage}>
            <Card elevation={0}>
                <CardContent>
                    <TextField className={classes.contenu}
                        multiline
                               variant="filled"
                        onChange={event => setMessage(event.target.value)}
                    />
                </CardContent>
                <CardActions>
                    <Button variant={"contained"} size="medium" color="primary" onClick={() => envoyerMessage(message)}>
                        Envoyer
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    </Grid>
};
