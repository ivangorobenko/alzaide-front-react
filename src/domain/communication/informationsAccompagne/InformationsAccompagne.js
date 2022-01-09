import React, {useEffect} from "react";
import {Message} from "../message/Message";
import {Button, Grid, Typography, useTheme} from "@material-ui/core";
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
        containerZonePrincipale: {
            height: "70vh"
        },
        titreMessages: {
            color: "grey",
            padding: "16px 0 0 16px"
        },
        buttonContainer: {
            width: "100%",
            padding: "16px",
            height: "100px"
        },
        button: {
            height: "100%"
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
            <Grid className={classes.containerZonePrincipale}
                  container
                  direction="column"
                  justifyContent="space-between"
                  alignItems="center">
                <Grid container item direction={"row"}>
                    <Grid item xs={12}>
                        <div>
                            <Typography className={classes.titreMessages} variant={"h5"}>Messages de
                                Tatiana</Typography>
                            {
                                messages?.map(message => <Message key={message.id} message={message}/>)
                            }
                        </div>
                    </Grid>
                    <Grid item xs={0}>
                    </Grid>
                </Grid>
                <Grid className={classes.buttonContainer} item>
                    <Button className={classes.button} fullWidth={true} disabled={alerte} variant={"contained"}
                            color={"secondary"} size={"large"}
                            onClick={alerterAccompagnant}>{alerte ? "Message d'urgence envoyé à " + moment(alerte.timestamp).format("LT") : "ENVOYER UN MESSAGE D'URGENCE"}</Button>
                </Grid>
            </Grid>
        </div>

    )
};
