import React, {useEffect} from "react";
import {Message} from "../message/Message";
import Header from "./headerAccompagne";
import moment from "moment";
import {Button, Divider, Typography} from "@mui/material";
import './InformationsAccompagne.css';
import {TacheQuotidienneRecevoirJournal} from "./TacheQuotidienne";

export const InformationsAccompagne = ({
                                           messages,
                                           alerte,
                                           tachesQuotidiennes,
                                           recupererAlerte,
                                           getMessages,
                                           alerterAccompagnant,
                                           alerteFeatureActive,
                                           recupererTachesQuotidiennes,
                                           validerTacheQuotidienne
                                       }) => {

    useEffect(() => {
        const heure = 1000 * 60 * 60;
        recupererAlerte();
        recupererTachesQuotidiennes()
        const intervalMessages = setInterval(() => getMessages(), 1000);
        const intervalTaches = setInterval(() => recupererTachesQuotidiennes(), heure);
        return () => {
            clearInterval(intervalMessages);
            clearInterval(intervalTaches);
        };
    }, [getMessages, recupererAlerte, recupererTachesQuotidiennes]);

    return (
        <div className={`container`}>
            <Header/>
            <div className={`zone-principale`}>
                <div style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <div className={'messages'}>
                        <Typography className={`titre-messages`} variant={"h5"}>Messages de
                            Tatiana</Typography>
                        {messages?.length === 0 &&
                            <div style={{marginTop:"10%"}}>
                                <Typography className={`aucun-message`} color={"darkgrey"} variant={"h4"}>
                                    Aucun message reçu
                                </Typography>
                            </div>
                        }
                        {
                            messages?.map(message => <Message key={message.id} message={message}/>)
                        }
                    </div>
                    <Divider sx={{marginTop:"16px"}} orientation="vertical" flexItem />
                    <div style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        margin: "56px 16px 0 16px"
                    }}>
                        {tachesQuotidiennes?.map(tache => {
                            return tache.type === "RECEVOIR_JOURNAL" ? <TacheQuotidienneRecevoirJournal
                                    key={tache.type} tache={tache}
                                    validerTache={validerTacheQuotidienne}/>
                                : <></>
                        })
                        }
                    </div>
                </div>
                {alerteFeatureActive && <div className={'actions-accompagne'}>
                    <Button
                        className={`alerte-accompagne`} fullWidth={true} disabled={alerte !== undefined}
                        variant={"contained"}
                        color={"secondary"} size={"large"}
                        onClick={alerterAccompagnant}>{alerte ? "Message d'urgence envoyé à " + moment(alerte.timestamp).format("LT") : "ENVOYER UN MESSAGE D'URGENCE"}</Button>
                </div>}
            </div>
        </div>

    )
};
