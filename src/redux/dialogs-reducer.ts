
const SEND_MESSAGE = 'SEND-MESSAGE-TEXT';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';


export type AddMessageActionType = ReturnType<typeof sendMessage>
export type UpdateNewMessageTextType = ReturnType<typeof updateNewMessageText>
export type ActionTypes = AddMessageActionType | UpdateNewMessageTextType

export type MessageType = {
    id: number
    message: string
}
export type DialogType = {
    id: number
    name: string
    ava: string
}
export type DialogsInitialStateType = typeof initialState

const initialState = {
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
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: "Hello!"},
        {id: 2, message: "Hello!!"},
        {id: 3, message: "Hello!!"},
    ] as Array<MessageType>,
    newMessageText: ''
}

export const dialogsReducer = (state: DialogsInitialStateType = initialState, action: ActionTypes): DialogsInitialStateType => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT:
            return {...state, newMessageText: action.newMessageText}
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: 4, message: state.newMessageText}],
                newMessageText: ''
            }
        default:
            return state;
    }
}

export const sendMessage = () => ({type: SEND_MESSAGE} as const )
export const updateNewMessageText = (newMessageText: string) => ({type: UPDATE_NEW_MESSAGE_TEXT, newMessageText} as const )

export default dialogsReducer;