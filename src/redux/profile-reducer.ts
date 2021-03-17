import {ActionTypes, ProfilePageType} from "./store";

export type AddPostActionType = ReturnType<typeof addPostAC>
export type UpdateNewPostTextType = ReturnType<typeof updateNewPostTextAC>

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
type PostType = {
    id: number
    message: string
    likeCount: number
}

type InitialStateType = {
    posts: Array<PostType>
    newPostText: string
}
const initialState: InitialStateType = {
    posts: [
        {id: 1, message: "Hi how are you?", likeCount: 10},
        {id: 2, message: "It's my first post!", likeCount: 15},
        {id: 3, message: "It's my second post!", likeCount: 35},
    ],
    newPostText: ''
}
const profileReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 4,
                message: state.newPostText,
                likeCount: 0
            };
            state.posts.push(newPost)
            state.newPostText = ''
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newPostText;
            return state;
        default:
            return state;
    }
}

export default profileReducer;