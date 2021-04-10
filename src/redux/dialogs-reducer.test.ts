import dialogsReducer, {DialogsInitialStateType, DialogType, MessageType} from "./dialogs-reducer";

let initialState: DialogsInitialStateType

beforeEach(() => {
    initialState = {
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

})

test('correct message should displayed in input message', () => {

    let newMessage = 'Hello'
    const endState = dialogsReducer(initialState, {type: "UPDATE-NEW-MESSAGE-TEXT", newMessageText: newMessage})

    expect(endState.newMessageText).toBe(newMessage)
})

test ('message should be added in dialogs', () => {

    const endState = dialogsReducer(initialState, {type: "SEND-MESSAGE-TEXT"})
    expect(endState.messages.length).toBe(4)
    expect(endState.messages[3].message).toBe('')
    expect(endState.messages[3].id).toBe(4)
})