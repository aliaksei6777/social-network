import {ActionTypes} from "./store";


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

type MessageType = {
    id: number
    message: string
}
type DialogType = {
    id: number
    name: string
    ava: string
}
type InitialStateType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageText: string
}
const initialState: InitialStateType = {
    dialogs: [
        {
            id: 1,
            name: "nick1",
            ava: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'
        },
        {
            id: 2,
            name: "nick2",
            ava: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'
        },
        {
            id: 3,
            name: "nick3",
            ava: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'
        }
    ],
    messages: [
        {id: 1, message: "Hello!"},
        {id: 2, message: "Hello!!"},
        {id: 3, message: "Hello!!"},
    ],
    newMessageText: ''
}

const dialogsReducer = (state: InitialStateType = initialState, action: ActionTypes):InitialStateType => {
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