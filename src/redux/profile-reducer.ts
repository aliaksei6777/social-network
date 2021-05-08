import {profileAPI, usersAPI} from "../api/api";
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
export type SetUserProfileActionType = ReturnType<typeof setUserProfile>
export type setStatusActionType = ReturnType<typeof setStatus>

export type ProfileActionsTypes = AddPostActionType
    | SetUserProfileActionType | setStatusActionType

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'

const initialState = {
    posts: [
        {id: 1, message: "Hi how are you?", likeCount: 10},
        {id: 2, message: "It's my first post!", likeCount: 15},
        {id: 3, message: "It's my second post!", likeCount: 35},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ""
}

const profileReducer = (state: ProfileInitialStateType = initialState, action: ProfileActionsTypes): ProfileInitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 4, message: action.newPostText, likeCount: 0}],
            }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state;
    }
}

export const addPostAC = (newPostText: string) => ({type: ADD_POST, newPostText} as const )

export const setStatus = (status: string) => ({type: SET_STATUS, status} as const)
export const setUserProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const)

export const getUserProfile = (userId: number): AppThunk => async dispatch => {
        const res = await usersAPI.getProfileUser(userId)
        dispatch(setUserProfile(res))
}
export const getStatus = (userId: number): AppThunk => async dispatch => {
        const res = await profileAPI.getStatus(userId)
        dispatch(setStatus(res))
}
export const updateStatus = (status: string): AppThunk => async dispatch => {
    const res = await profileAPI.updateStatus(status)
    if (res.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export default profileReducer;