import {ActionTypes, DialogPageType} from "./state";



const SEND_MESSAGE = 'SEND-MESSAGE-TEXT';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';


export type AddMessageActionType = ReturnType<typeof sendMessageAC>
export type UpdateNewMessageTextType = ReturnType<typeof updateNewMessageTextAC>

export const sendMessageAC = () => {
    return {
        type: SEND_MESSAGE,
    } as const
}
export const updateNewMessageTextAC = (newMessageText: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newMessageText: newMessageText
    } as const
}


const dialogsReducer = (state: DialogPageType, action: ActionTypes) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newMessageText;
            return state;
        case SEND_MESSAGE:
            let newMessage = {id: 4, message: state.newMessageText};
            state.messages.push(newMessage)
            state.newMessageText = ''
            return state;
        default:
            return state;
    }
}
export default dialogsReducer;