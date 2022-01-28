import React, {useEffect} from "react";
import {Message} from "../message/Message";
import Header from "./headerAccompagne";
import moment from "moment";
import {Button, Typography} from "@mui/material";
import './InformationsAccompagne.css';

export const InformationsAccompagne = ({
                                           messages,
                                           alerte,
                                           recupererAlerte,
                                           getMessages,
                                           alerterAccompagnant,
                                           alerteFeatureActive
                                       }) => {

    useEffect(() => {
        recupererAlerte();
        const interval = setInterval(() => getMessages(), 1000);
        return () => clearInterval(interval);
    }, [getMessages, recupererAlerte]);

    return (
        <div className={`container`}>
            <Header/>
            <div className={`zone-principale`}>
                <div className={'messages'}>
                    <Typography className={`titre-messages`} variant={"h5"}>Messages de
                        Tatiana</Typography>
                    {messages?.length === 0 &&
                        <Typography className={`aucun-message`} color={"darkgrey"} variant={"h4"}>Aucun message reçu</Typography>
                    }
                    {
                        messages?.map(message => <Message key={message.id} message={message}/>)
                    }
                </div>
                {alerteFeatureActive && <div className={'actions-accompagne'}>
                    <Button
                        className={`alerte`} fullWidth={true} disabled={alerte !== undefined}
                        variant={"contained"}
                        color={"secondary"} size={"large"}
                        onClick={alerterAccompagnant}>{alerte ? "Message d'urgence envoyé à " + moment(alerte.timestamp).format("LT") : "ENVOYER UN MESSAGE D'URGENCE"}</Button>
                </div>}
            </div>
        </div>

    )
};
