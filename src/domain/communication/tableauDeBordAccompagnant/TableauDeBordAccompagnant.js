import React, {useEffect, useState} from "react";
import {Message} from "../message/Message";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    TextField,
    Typography,
    useTheme
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import moment from "moment";

const useStyles = makeStyles(() =>
    ({
        container: {
            height: "100%"
        },
        alerte: {
            backgroundColor: "#f53838",
            color: "white",
            margin: "16px"
        },
        messages: {
            width: "100%",
            maxHeight: "80%",
            overflowY: "scroll"
        },
        nouveauMessage: {
            height: "20%",
            width: "100%",
        },
        contenu: {
            width: "100%"
        }
    }));

export const TableauDeBordAccompagnant = ({
                                              messages,
                                              alerte,
                                              recupererAlerte,
                                              getMessages,
                                              envoyerMessage,
                                              supprimerMessage
                                          }) => {
    const classes = useStyles(useTheme());
    const heureAlerte = moment(alerte?.timestamp).format("h:mm:ss");
    const lieuAlerte = alerte?.lieu;
    const lienLieuAlerte = `https://maps.google.com/?q=${lieuAlerte?.latitude},${lieuAlerte?.longitude}`

    const [message, setMessage] = useState();

    useEffect(() => {
        getMessages()
        const interval = setInterval(() => recupererAlerte(), 1000);
        return () => clearInterval(interval);
    }, [getMessages, recupererAlerte]);

    return <Grid
        className={classes.container}
        container
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={4}
    >
        {alerte && <Grid item>
            <Card className={classes.alerte}>
                <CardContent>
                    <Typography variant={"h4"}>Attention une alerte a été envoyée à {heureAlerte}
                        <a href={lienLieuAlerte} target="_blank" rel="noreferrer">Ici</a>
                    </Typography>

                </CardContent>
            </Card>

        </Grid>}
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
                               value={message}
                               onChange={event => setMessage(event.target.value)}
                    />
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button variant={"contained"} size="medium" color="primary" onClick={() => {
                        envoyerMessage(message);
                        setMessage("");
                    }}>
                        Envoyer
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    </Grid>
};
