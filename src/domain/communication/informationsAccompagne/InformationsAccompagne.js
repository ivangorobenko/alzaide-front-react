import React, {useEffect} from "react";
import {Message} from "../message/Message";
import {Paper} from "@material-ui/core";
import Header from "../../../navigation/header";

export const InformationsAccompagne = ({messages, getMessages}) => {
    useEffect(() => {
        const interval = setInterval(() => getMessages(), 1000);
        return () => clearInterval(interval);
    }, [getMessages]);

    return (
        <Paper>
            <Header/>
            <Paper>
                {
                    messages?.map(message => <Message key={message.id} message={message}/>)
                }
            </Paper>

        </Paper>

    )
};
