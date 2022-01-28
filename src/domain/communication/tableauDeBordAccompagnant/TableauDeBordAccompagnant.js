import React, {useEffect, useState} from "react";
import {Message} from "../message/Message";
import moment from "moment";
import SendIcon from '@mui/icons-material/Send';
import {Button, Card, CardContent, Grid, TextField, Typography} from "@mui/material";
import './TableauDeBordAccompagnant.css';


export const TableauDeBordAccompagnant = ({
                                              messages,
                                              alerte,
                                              recupererAlerte,
                                              getMessages,
                                              envoyerMessage,
                                              supprimerMessage,
                                              alerteFeatureActive
                                          }) => {
    const heureAlerte = alerte?.timestamp ? moment(alerte?.timestamp).format("h:mm:ss") : undefined;
    const lieuAlerte = alerte?.lieu;
    const lienLieuAlerte = `https://maps.google.com/?q=${lieuAlerte?.latitude},${lieuAlerte?.longitude}`

    const [message, setMessage] = useState();

    useEffect(() => {
        getMessages()
        const interval = setInterval(() => recupererAlerte(), 1000);
        return () => clearInterval(interval);
    }, [getMessages, recupererAlerte]);

    return <Grid
        sx={{height: "100vh"}}
        container
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={4}
    >
        {alerteFeatureActive && alerte && <Grid item>
            <Card className={`alerte`}>
                <CardContent>
                    <Typography variant={"h4"}>Attention une alerte a été envoyée à {heureAlerte}</Typography>
                </CardContent>
            </Card>

        </Grid>}
        <Grid item className={`messages-envoyes`}>
            {messages?.map(message =>
                <Message droitSupprimer={true} key={message.id} message={message}
                         supprimerMessage={supprimerMessage}/>)}
        </Grid>
        <Grid item className={`nouveau-message`}>
            <div style={{display: "flex", width: "100%"}}>
                <TextField className={`contenu-message`}
                           style={{padding: "5px 5px 0 16px", height: "100%"}}
                           multiline
                           placeholder={"Message"}
                           variant="filled"
                           value={message}
                           onChange={event => setMessage(event.target.value)}
                />
                <Button style={{margin: "5px 16px 0px 0px", width: "15%"}} variant="contained" endIcon={<SendIcon/>} color="primary"
                        onClick={() => {
                            envoyerMessage(message);
                            setMessage("");
                        }}>
                </Button>
            </div>
        </Grid>
    </Grid>
};
