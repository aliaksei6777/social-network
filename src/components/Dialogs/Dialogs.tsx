import React from 'react';
import s from './Dialogs.module.css';
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";
import {DialogsPropsType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";


export const Dialogs: React.FC<DialogsPropsType> = ({dialogPage,updateNewMessageText, sendMessage }) => {
    const dialogsElements = dialogPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id} ava={d.ava}/>);
    const messagesElement = dialogPage.messages.map(m => <Message key={m.id} message={m.message} id={m.id}/>);

    const addNewMessage = (dialogFormData: DialogsFormDataType) => {
        sendMessage(dialogFormData.newMessageText)
    }
    return(
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElement}</div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

type DialogsFormDataType = {newMessageText: string}

const AddMessageForm: React.FC<InjectedFormProps<DialogsFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component="textarea" name="newMessageText" placeholder="Enter your message"/>

            </div>
            <div>
                <button>Send message</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<DialogsFormDataType>({form: "dialogsAddMessageForm"})(AddMessageForm)