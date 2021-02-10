import React from 'react';
import s from './Dialogs.module.css';
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";
import {DialogPageType} from "../../redux/state";


export const Dialogs: React.FC<DialogPageType> = (props) => {

    let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id} ava={d.ava}/>);
    let messagesElement = props.messages.map(m => <Message message={m.message} id={m.id}/>);

    let newMessage = React.createRef<HTMLTextAreaElement>()
    let sendMessage = () => {
        if (newMessage.current) {
            let mes = newMessage.current.value
            alert(mes)
        }
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}

            </div>
            <div className={s.messages}>
                {messagesElement}
                <textarea ref={newMessage}></textarea>
                <div>
                    <button onClick={sendMessage}>Send message</button>
                </div>
            </div>
        </div>
    )
}

