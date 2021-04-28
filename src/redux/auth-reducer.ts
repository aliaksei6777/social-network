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
                ...state,...action.data, isAuth: true
            }
        }
        default:
            return state;
    }
}

export const setAuthUserData = (id: null | number, email: null | string, login: null | string) =>
    ({type: SET_USER_DATA, data: {id, email, login}} as const)

export const getAuthUserData = ():AppThunk => async dispatch => {
    try {
        const res = await authAPI.me()
        if(res.resultCode === 0){
            let {id, email, login} = res.data
            dispatch(setAuthUserData(id, email, login ))
        }
    } catch (e) {
        throw new Error(e)
    }
}

export default authReducer;