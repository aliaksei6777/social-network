import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './Dialogs.module.css';
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";
import {
    ActionTypes,
    sendMessageAC,
    DialogType,
    MessageType,
    updateNewMessageTextAC,
    StoreType
} from "../../redux/state";

type DialogsPropsType = {
    // dialogs: Array<DialogType>
    // messages: Array<MessageType>
    // newMessage: string
    // dispatch: (action: ActionTypes) => void
    store: StoreType
}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
    const state = props.store.getState().dialogPage
    const dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} ava={d.ava}/>);
    const messagesElement = state.messages.map(m => <Message message={m.message} id={m.id}/>);

    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            sendMessage()
        }
    }

    const sendMessage = () => {
        // props.dispatch({type: "ADD-MESSAGE-TEXT"})
        props.store.dispatch(sendMessageAC())
    }
    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // props.dispatch({type: "UPDATE-NEW-MESSAGE-TEXT" , value: e.currentTarget.value})
        props.store.dispatch(updateNewMessageTextAC(e.currentTarget.value))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElement}
                <textarea onChange={onMessageChange} onKeyPress={onKeyPressHandler} value={state.newMessageText}/>
                <div>
                    <button onClick={sendMessage}>Send message</button>
                </div>
            </div>
        </div>
    )
}
