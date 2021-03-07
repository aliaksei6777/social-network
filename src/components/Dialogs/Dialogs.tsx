import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './Dialogs.module.css';
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";
import {ActionTypes, addMessageAC, DialogType, MessageType, updateNewMessageTextAC} from "../../redux/state";

type DialogsPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessage: string
    dispatch: (action: ActionTypes) => void
}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {

    const dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id} ava={d.ava}/>);
    const messagesElement = props.messages.map(m => <Message message={m.message} id={m.id}/>);

    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            addMessage()
        }
    }

    const addMessage = () => {
        // props.dispatch({type: "ADD-MESSAGE"})
        props.dispatch(addMessageAC())
    }
    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // props.dispatch({type: "UPDATE-NEW-MESSAGE-TEXT" , value: e.currentTarget.value})
        props.dispatch(updateNewMessageTextAC(e.currentTarget.value))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElement}
                <textarea onChange={onMessageChange} onKeyPress={onKeyPressHandler} value={props.newMessage}/>
                <div>
                    <button onClick={addMessage}>Send message</button>
                </div>
            </div>
        </div>
    )
}
