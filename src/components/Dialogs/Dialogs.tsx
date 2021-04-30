import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './Dialogs.module.css';
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";
import {DialogsPropsType} from "./DialogsContainer";

export const Dialogs: React.FC<DialogsPropsType> = ({dialogPage,updateNewMessageText, sendMessage }) => {
    const dialogsElements = dialogPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id} ava={d.ava}/>);
    const messagesElement = dialogPage.messages.map(m => <Message key={m.id} message={m.message} id={m.id}/>);

    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            onSendMessageClick()
        }
    }
    const onSendMessageClick = () => {sendMessage()}
    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        updateNewMessageText(e.currentTarget.value)
    }
    return(
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElement}</div>
                <div>
                    <div><textarea value={dialogPage.newMessageText}
                                   onChange={onMessageChange}
                                   onKeyPress={onKeyPressHandler}
                    />
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Send message</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
