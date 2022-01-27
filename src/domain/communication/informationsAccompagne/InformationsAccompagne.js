import React, {useEffect} from "react";
import {Message} from "../message/Message";
import Header from "./headerAccompagne";
import moment from "moment";
import {Button, Grid, Paper, Typography} from "@mui/material";
import './InformationsAccompagne.css';

export const InformationsAccompagne = ({messages, alerte, recupererAlerte, getMessages, alerterAccompagnant}) => {

    useEffect(() => {
        recupererAlerte();
        const interval = setInterval(() => getMessages(), 1000);
        return () => clearInterval(interval);
    }, [getMessages, recupererAlerte]);

    return (
        <div className={`container`}>
            <Header/>
            <Grid className={`zonePrincipale`}
                  container
                  direction="column"
                  justifyContent="space-between"
                  alignItems="center">
                <Grid container className={`informations`} item direction={"row"}>
                    <Grid className={`messages`} item xs={8}>
                        <div>
                            <Typography className={`titreMessages`} variant={"h5"}>Messages de
                                Tatiana</Typography>
                            {
                                messages?.map(message => <Message key={message.id} message={message}/>)
                            }
                        </div>
                    </Grid>
                    <Grid className={`colonneDroite`} item xs={4}>
                        <Paper className={`placeHolder`}>Plus de fonctionnalités ici</Paper>
                    </Grid>
                </Grid>
            </Grid>
            <div className={`actions-accompagne`}>
                <Button className={`alerte`} fullWidth={true} disabled={alerte !== undefined}
                        variant={"contained"}
                        color={"secondary"} size={"large"}
                        onClick={alerterAccompagnant}>{alerte ? "Message d'urgence envoyé à " + moment(alerte.timestamp).format("LT") : "ENVOYER UN MESSAGE D'URGENCE"}</Button>
            </div>
        </div>

    )
};
