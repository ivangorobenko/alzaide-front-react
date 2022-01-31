import {Typography} from "@mui/material";
import {Message} from "../message/Message";
import React from "react";

export const Messages = ({messages}) => <div className={"messages"}>
    <Typography className={`titre-messages`} variant={"h5"}>Messages de
        Tatiana</Typography>
    {messages?.length === 0 &&
        <div style={{marginTop: "10%"}}>
            <Typography className={`aucun-message`} color={"darkgrey"} variant={"h4"}>
                Aucun message reçu
            </Typography>
        </div>
    }
    {
        messages?.map(message => <Message key={message.id} message={message}/>)
    }
</div>;