import {TacheQuotidienneRecevoirJournal} from "./TacheQuotidienneRecevoirJournal";
import React from "react";
import styled from "styled-components";

export const TachesQuotidiennes = ({tachesQuotidiennes, validerTacheQuotidienne}) => {

    const TachesQuotidiennes = styled.div`
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 56px 16px 0 16px;
    `;

    return <TachesQuotidiennes className={'taches-quotidiennes'}>
        {tachesQuotidiennes?.map(tache => {
            return tache.type === "RECEVOIR_JOURNAL" ? <TacheQuotidienneRecevoirJournal
                    key={tache.type} tache={tache}
                    validerTache={validerTacheQuotidienne}/>
                : <></>
        })}
    </TachesQuotidiennes>;
};