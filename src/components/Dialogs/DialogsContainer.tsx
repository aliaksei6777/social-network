import React from 'react';
import {sendMessageAC, updateNewMessageTextAC} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";

type DialogsContainerPropsType = {
    store: any
}

export const DialogsContainer: React.FC<DialogsContainerPropsType> = (props) => {
    const state = props.store.getState().dialogPage
    const sendMessage = () => {
        props.store.dispatch(sendMessageAC())
    }
    const updateNewMessageText = (text: string) => {
        props.store.dispatch(updateNewMessageTextAC(text))
    }

    return (
        <Dialogs newMessageText={state.newMessageText}
                 dialogs={state.dialogs}
                 messages={state.messages}
                 updateNewMessageText={updateNewMessageText}
                 sendMessage={sendMessage}/>
    )
}
