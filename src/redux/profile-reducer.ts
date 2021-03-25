import {ActionTypes} from "./dialogs-reducer";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
export const addPostAC = () => {
    return {
        type: ADD_POST
    } as const
}
export const updateNewPostTextAC = (newPostText: string) => ({
    type: UPDATE_NEW_POST_TEXT,
    newPostText: newPostText
}) as const

export type AddPostActionType = ReturnType<typeof addPostAC>
export type UpdateNewPostTextType = ReturnType<typeof updateNewPostTextAC>
type PostType = {
    id: number
    message: string
    likeCount: number
}
export type ProfileInitialStateType = typeof initialState
const initialState = {
    posts: [
        {id: 1, message: "Hi how are you?", likeCount: 10},
        {id: 2, message: "It's my first post!", likeCount: 15},
        {id: 3, message: "It's my second post!", likeCount: 35},
    ]as Array<PostType>,
    newPostText: ''
}

const profileReducer = (state: ProfileInitialStateType = initialState, action: ActionTypes): ProfileInitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 4, message: state.newPostText, likeCount: 0}],
                newPostText: ''
            }
        case UPDATE_NEW_POST_TEXT:
            return {...state, newPostText: action.newPostText}
        default:
            return state;
    }
}

export default profileReducer;