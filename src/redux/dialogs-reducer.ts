
const SEND_MESSAGE = 'SEND-MESSAGE-TEXT';

export type AddMessageActionType = ReturnType<typeof sendMessage>
export type ActionTypes = AddMessageActionType

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
    ] as Array<MessageType>
}

export const dialogsReducer = (state: DialogsInitialStateType = initialState, action: ActionTypes): DialogsInitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: 4, message: action.newMessageText}]
            }
        default:
            return state;
    }
}

export const sendMessage = (newMessageText: string) => ({type: SEND_MESSAGE, newMessageText} as const )


export default dialogsReducer;