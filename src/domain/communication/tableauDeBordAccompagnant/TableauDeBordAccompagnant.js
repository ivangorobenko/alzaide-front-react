import React, {useEffect, useState} from "react";
import {Message} from "../message/Message";
import moment from "moment";
import SendIcon from '@mui/icons-material/Send';
import {Button, Card, CardContent, TextField, Typography} from "@mui/material";
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
    const heureAlerte = alerte?.timestamp ? moment(alerte?.timestamp).format("LT") : undefined;
    //const lieuAlerte = alerte?.lieu;
    //const lienLieuAlerte = `https://maps.google.com/?q=${lieuAlerte?.latitude},${lieuAlerte?.longitude}`

    const [message, setMessage] = useState();

    useEffect(() => {
        getMessages()
        const interval = setInterval(() => recupererAlerte(), 1000);
        return () => clearInterval(interval);
    }, [getMessages, recupererAlerte]);

    return <div className={'container-accompagnant'}>
        {alerteFeatureActive && alerte &&
            <Card className={`alerte`}>
                <CardContent>
                    <Typography variant={"h5"}>Attention une alerte a été envoyée à {heureAlerte} </Typography>
                </CardContent>
            </Card>

        }
        <div className={`messages-envoyes`}>
            {messages?.map(message =>
                <Message droitSupprimer={true} key={message.id} message={message}
                         supprimerMessage={supprimerMessage}/>)}
        </div>
        <div className={`nouveau-message`}>
            <TextField className={`contenu-message`}
                       multiline
                       placeholder={"Message"}
                       value={message}
                       onChange={event => setMessage(event.target.value)}
            />
            <Button className={'envoyer-message'} variant="contained" endIcon={<SendIcon/>} color="primary"
                    onClick={() => {
                        envoyerMessage(message);
                        setMessage("");
                    }}>
            </Button>
        </div>
    </div>
};
