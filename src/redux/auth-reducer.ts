 import {authAPI} from "../api/api";
import {AppThunk} from "./redux-store";

const SET_USER_DATA = 'SET-USER-DATA';

export type SetUserDataActionType = ReturnType<typeof setAuthUserData>
export type AuthActionTypes = SetUserDataActionType
type AuthInitialStateType = {
    id: null | number
    email: null | string
    login: null | string
    isAuth: boolean
}

const initialState: AuthInitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state: AuthInitialStateType = initialState, action: AuthActionTypes): AuthInitialStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,...action.payload
            }
        }
        default:
            return state;
    }
}

export const setAuthUserData = (id: null | number, email: null | string, login: null | string, isAuth: boolean) =>
    ({type: SET_USER_DATA, payload: {id, email, login, isAuth}} as const)

 export const getAuthUserData = (): AppThunk => async dispatch => {
     const res = await authAPI.me()
     if (res.data.resultCode === 0) {
         let {id, email, login} = res.data.data
         dispatch(setAuthUserData(id, email, login, true))
     }
 }

 export const login = (email: string, password: string, rememberMe: boolean):AppThunk => async dispatch => {
    const res = await authAPI.login(email, password,rememberMe)
     if (res.data.resultCode === 0) {
        dispatch(getAuthUserData())
    }
 }

 export const logout = ():AppThunk => async dispatch => {
    const res = await authAPI.logout()
     if (res.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
 }

export default authReducer;