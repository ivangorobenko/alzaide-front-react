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
            justifyContent: "flex-start",
        },
        zonePrincipale: {
            height: "70vh"
        },
        informations: {height: "80%"
        },
        titreMessages: {
            color: "grey",
            padding: "16px 0 0 16px"
        },
        messages: {
            height: "100%",
            overflowY: "scroll"
        },
        buttonContainer: {
            width: "100%",
            padding: "16px",
            height: "100px"
        },
        button: {
            height: "100%"
        },
        colonneDroite: {
            justifyContent: "center",
            textAlign: "center",
            marginTop: "30px"
        },
        placeHolder: {
            height: "100%",
            color: "grey"
        }

    }));

export const InformationsAccompagne = ({messages, alerte, getMessages, alerterAccompagnant}) => {
    const classes = useStyles(useTheme());

    useEffect(() => {
        const interval = setInterval(() => getMessages(), 1000);
        return () => clearInterval(interval);
    }, [getMessages]);

    return (
        <div className={classes.container}>
            <Header/>
            <Grid className={classes.zonePrincipale}
                  container
                  direction="column"
                  justifyContent="space-between"
                  alignItems="center">
                <Grid container className={classes.informations} item direction={"row"}>
                    <Grid className={classes.messages}  item xs={8}>
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
                <Grid className={classes.buttonContainer} item>
                    <Button className={classes.button} fullWidth={true} disabled={alerte !== undefined}
                            variant={"contained"}
                            color={"secondary"} size={"large"}
                            onClick={alerterAccompagnant}>{alerte ? "Message d'urgence envoyé à " + moment(alerte.timestamp).format("LT") : "ENVOYER UN MESSAGE D'URGENCE"}</Button>
                </Grid>
            </Grid>
        </div>

    )
};
