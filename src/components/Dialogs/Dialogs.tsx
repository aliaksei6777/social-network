import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './Dialogs.module.css';
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";

type DialogType = {
    id: number
    name: string
    ava: string
}
type MessageType = {
    id: number
    message: string
}
type DialogsPropsType = {
    newMessageText: string
    dialogs: DialogType[]
    messages: MessageType[]
    updateNewMessageText: (text: string) => void
    sendMessage: () => void
}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
    const dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id} ava={d.ava}/>);
    const messagesElement = props.messages.map(m => <Message message={m.message} id={m.id}/>);

    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            sendMessage()
        }
    }
    const sendMessage = () => {
        props.sendMessage()
    }
    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageText(e.currentTarget.value)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElement}</div>
                <div>
                    <div><textarea value={props.newMessageText}
                                   onChange={onMessageChange}
                                   onKeyPress={onKeyPressHandler}
                    />
                    </div>
                    <div>
                        <button onClick={sendMessage}>Send message</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
