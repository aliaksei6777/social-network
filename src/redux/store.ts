import {stringify} from "querystring";
import profileReducer, {AddPostActionType, UpdateNewPostTextType} from "./profile-reducer";
import dialogsReducer, {AddMessageActionType, UpdateNewMessageTextType} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

type MessageType = {
    id: number
    message: string
}
type DialogType = {
    id: number
    name: string
    ava: string
}
type PostType = {
    id: number
    message: string
    likeCount: number
}
type DialogPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageText: string
}
type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}
type SidebarPageType = {

}
type RootStateType = {
    profilePage: ProfilePageType
    dialogPage: DialogPageType
    sidebar: SidebarPageType
}
type ActionTypes = AddPostActionType | UpdateNewPostTextType | AddMessageActionType | UpdateNewMessageTextType
type StoreType = {
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
        sidebar: {}
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
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogPage = dialogsReducer(this._state.dialogPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        this._onChange()
    }
}



// export default store;
