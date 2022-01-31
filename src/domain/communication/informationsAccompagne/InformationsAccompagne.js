import React, {useEffect} from "react";
import Header from "./headerAccompagne";
import moment from "moment";
import {Button, Divider} from "@mui/material";
import './InformationsAccompagne.css';
import {Messages} from "./Messages";
import {TachesQuotidiennes} from "./TachesQuotidiennes";
import styled from "styled-components";

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

    const MainContent = styled.div`
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: row;
    `;

    return (
        <div className={`container`}>
            <Header/>
            <div className={`zone-principale`}>
                <MainContent>
                    <Messages messages={messages}/>
                    <Divider sx={{marginTop: "16px"}} orientation="vertical" flexItem/>
                    <TachesQuotidiennes tachesQuotidiennes={tachesQuotidiennes}
                                        validerTacheQuotidienne={validerTacheQuotidienne}/>
                </MainContent>
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
