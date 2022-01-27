import React, {useEffect} from "react";
import {Message} from "../message/Message";
import {Button, Grid, Paper, Typography, useTheme} from "@material-ui/core";
import Header from "./headerAccompagne";
import makeStyles from "@material-ui/core/styles/makeStyles";
import moment from "moment";


const useStyles = makeStyles(() =>
    ({
        container: {
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
        },
        zonePrincipale: {
            height: "75vh",
            padding: "16px"
        },
        informations: {
            height: "100%"
        },
        titreMessages: {
            color: "grey",
        },
        messages: {
            height: "100%",
            overflowY: "scroll"
        },
        colonneDroite: {
            height: "100%",

        },
        placeHolder: {
            height: "100%",
            color: "grey"
        },
        actions: {
            height: "10vh",
            width: "100%",
            display: "flex",
            alignItems: "center",

            justifyContent: "center",
        },
        button: {
            margin: "16px",
            height: "50px",
        }

    }));

export const InformationsAccompagne = ({messages, alerte, recupererAlerte, getMessages, alerterAccompagnant}) => {
    const classes = useStyles(useTheme());

    useEffect(() => {
        recupererAlerte();
        const interval = setInterval(() => getMessages(), 1000);
        return () => clearInterval(interval);
    }, [getMessages, recupererAlerte]);

    return (
        <div className={classes.container}>
            <Header/>
            <Grid className={classes.zonePrincipale}
                  container
                  direction="column"
                  justifyContent="space-between"
                  alignItems="center">
                <Grid container className={classes.informations} item direction={"row"}>
                    <Grid className={classes.messages} item xs={8}>
                        <div>
                            <Typography className={classes.titreMessages} variant={"h5"}>Messages de
                                Tatiana</Typography>
                            {
                                messages?.map(message => <Message key={message.id} message={message}/>)
                            }
                        </div>
                    </Grid>
                    <Grid className={classes.colonneDroite} item xs={4}>
                        <Paper className={classes.placeHolder}>Plus de fonctionnalités ici</Paper>
                    </Grid>
                </Grid>
            </Grid>
            <div className={classes.actions}>
                <Button className={classes.button} fullWidth={true} disabled={alerte !== undefined}
                        variant={"contained"}
                        color={"secondary"} size={"large"}
                        onClick={alerterAccompagnant}>{alerte ? "Message d'urgence envoyé à " + moment(alerte.timestamp).format("LT") : "ENVOYER UN MESSAGE D'URGENCE"}</Button>
            </div>
        </div>

    )
};
