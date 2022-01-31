import React from "react";

import moment from "moment";
import {Card, CardActionArea, CardContent, CardMedia, Paper, Typography} from "@mui/material";
import './InformationsAccompagne.css';
import lemonde from "./logo-lemonde-1.png";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const TacheQuotidienneRecevoirJournal = ({tache, validerTache}) => {
    return (
        !tache.valide ? <Card>
                <CardActionArea sx={{display: 'flex', flexDirection: 'row', backgroundColor: "#e5e591"}}
                                onClick={() => validerTache(tache)}>
                    <AccessTimeIcon sx={{margin: "0 16px 0 16px"}} fontSize={"large"}/>
                    <CardContent>
                        <Typography variant={"h6"}>Marquer le journal du jour bien reçu</Typography>
                        <Typography variant={"caption"}>Arrive d'habitude entre 14h et 15h</Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        sx={{width: 70, margin: "16px"}}
                        image={lemonde}
                        alt="Journal Le Monde"
                    />
                </CardActionArea>
            </Card> :
            <Paper elevation={0} sx={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: "#b6d833",
                alignItems: "center",
            }}>
                <CheckCircleOutlineIcon sx={{margin: "0 16px 0 16px"}} fontSize={"large"}/>
                <Typography
                    variant={"h6"}>Le journal a bien été reçu ajourd'hui
                    à {moment(tache.timestampMiseAJour).format('LT')}</Typography>
                <CardMedia
                    component="img"
                    sx={{width: 70, margin: "16px"}}
                    image={lemonde}
                    alt="Journal Le Monde"
                />
            </Paper>
    )
};
