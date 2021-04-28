import {usersAPI} from "../api/api";
import {AppThunk} from "./redux-store";

export type PostType = {
    id: number
    message: string
    likeCount: number
}
type ContactType = {
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
}
type PhotoType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    aboutMe: string | null
    contacts: ContactType
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string | null
    userId: number
    photos: PhotoType
}

export type ProfileInitialStateType = typeof initialState
export type AddPostActionType = ReturnType<typeof addPostAC>
export type UpdateNewPostTextActionType = ReturnType<typeof updateNewPostTextAC>
export type SetUserProfileActionType = ReturnType<typeof setUserProfile>

export type ProfileActionsTypes = AddPostActionType | UpdateNewPostTextActionType | SetUserProfileActionType

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE'

const initialState = {
    posts: [
        {id: 1, message: "Hi how are you?", likeCount: 10},
        {id: 2, message: "It's my first post!", likeCount: 15},
        {id: 3, message: "It's my second post!", likeCount: 35},
    ] as Array<PostType>,
    newPostText: '',
    profile: null as ProfileType | null
}

const profileReducer = (state: ProfileInitialStateType = initialState, action: ProfileActionsTypes): ProfileInitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 4, message: state.newPostText, likeCount: 0}],
                newPostText: ''
            }
        case UPDATE_NEW_POST_TEXT:
            return {...state, newPostText: action.newPostText}
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        default:
            return state;
    }
}

export const addPostAC = () => ({type: ADD_POST} as const )

export const updateNewPostTextAC = (newPostText: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newPostText: newPostText} as const)

export const setUserProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const)

export const getUserProfile = (userId: string): AppThunk => async dispatch => {
        const res = await usersAPI.getProfileUser(userId)
        dispatch(setUserProfile(res))
}

export default profileReducer;