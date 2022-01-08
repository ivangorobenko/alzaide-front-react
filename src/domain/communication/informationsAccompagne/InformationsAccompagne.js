import React, {useEffect} from "react";
import {Message} from "../message/Message";
import {Grid, Typography, useTheme} from "@material-ui/core";
import Header from "./headerAccompagne";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles(() =>
    ({
        container: {
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
        },
        titreMessages: {
            color: "grey",
            padding: "16px 0 0 16px"
        }
    }));

export const InformationsAccompagne = ({messages, getMessages}) => {
    const classes = useStyles(useTheme());

    useEffect(() => {
        const interval = setInterval(() => getMessages(), 1000);
        return () => clearInterval(interval);
    }, [getMessages]);

    return (
        <div className={classes.container}>
            <Header/>
            <Grid container direction={"row"} >
                <Grid item xs={6}>
                    <div>
                        <Typography className={classes.titreMessages} variant={"h5"}>Messages de Tatiana</Typography>
                        {
                            messages?.map(message => <Message key={message.id} message={message}/>)
                        }
                    </div>
                </Grid>
                <Grid item xs={6}> Sudoku place holder</Grid>
            </Grid>


        </div>

    )
};
