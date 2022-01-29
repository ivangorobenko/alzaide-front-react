import React, {useEffect, useState} from "react";
import {Message} from "../message/Message";
import moment from "moment";
import SendIcon from '@mui/icons-material/Send';
import {Button, Card, CardContent, TextField, Typography} from "@mui/material";
import './TableauDeBordAccompagnant.css';
import styled from 'styled-components';


export const TableauDeBordAccompagnant = ({
                                              messages,
                                              alerte,
                                              recupererAlerte,
                                              getMessages,
                                              envoyerMessage,
                                              supprimerMessage,
                                              alerteFeatureActive
                                          }) => {

    const MessagesEnvoyes = styled.div`
      width: 100%;
      max-height: 90%;
      overflow-y: scroll;
    `;

    const AucunMessage =  styled(Typography)`
      padding-top: 60%;
      text-align: center;
    `;

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
        {messages?.length === 0 &&
            <AucunMessage color={"darkgrey"} variant={"h5"}>Aucun message
                envoyé</AucunMessage>
        }
        <MessagesEnvoyes>
            {messages?.map(message =>
                <Message droitSupprimer={true} key={message.id} message={message}
                         supprimerMessage={supprimerMessage}/>)}
        </MessagesEnvoyes>
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
