import {stringify} from "querystring";

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SEND = 'SEND-MESSAGE-TEXT';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';


export type MessageType = {
    id: number
    message: string
}
export type DialogType = {
    id: number
    name: string
    ava: string
}
export type PostType = {
    id: number
    message: string
    likeCount: number
}
export type DialogPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageText: string
}
export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogPage: DialogPageType
}


type AddPostActionType = ReturnType<typeof addPostAC>
type UpdateNewPostTextType = ReturnType<typeof updateNewPostTextAC>
type AddMessageActionType = ReturnType<typeof sendMessageAC>
type UpdateNewMessageTextType = ReturnType<typeof updateNewMessageTextAC>

export type ActionTypes = AddPostActionType | UpdateNewPostTextType | AddMessageActionType | UpdateNewMessageTextType

export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    _onChange: () => void
    subscribe: (callback: () => void) => void
    dispatch: (action: ActionTypes) => void
}

const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hi how are you?", likeCount: 10},
                {id: 2, message: "It's my first post!", likeCount: 15},
                {id: 3, message: "It's my second post!", likeCount: 35},
            ],
            newPostText: ''
        },
        dialogPage: {
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
        },
    },
    getState() {
        return this._state;
    },
    _onChange() {
    },
    subscribe(callback) {
        this._onChange = callback;
    },
    dispatch(action) {
        if (action.type === "ADD-POST") {
            let newPost = {
                id: 4,
                message: this._state.profilePage.newPostText,
                likeCount: 0
            };
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ''
            this._onChange()
        }
        else if (action.type === "UPDATE-NEW-POST-TEXT") {
            this._state.profilePage.newPostText = action.newPostText;
            this._onChange();
        }

        else if (action.type === "UPDATE-NEW-MESSAGE-TEXT") {
            this._state.dialogPage.newMessageText = action.newMessageText;
            this._onChange();
        }
        else if (action.type === "SEND-MESSAGE") {
            let newMessage = {id: 4, message: this._state.dialogPage.newMessageText};
            this._state.dialogPage.messages.push(newMessage)
            this._state.dialogPage.newMessageText = ''
            this._onChange();
        }
    }
}

export const addPostAC = ()=> {
    return {
        type: "ADD-POST"
    } as const
}
export const updateNewPostTextAC = (value: string) => ({
        type: "UPDATE-NEW-POST-TEXT",
        newPostText: value
    }) as const


export const sendMessageAC = () => {
    return {
        type: "SEND-MESSAGE"
    } as const
}
export const updateNewMessageTextAC = (value: string) => {
    return {
        type: "UPDATE-NEW-MESSAGE-TEXT",
        newMessageText: value
    } as const
}

export default store;
