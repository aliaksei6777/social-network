import {Dispatch} from "redux";
import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET-USER-DATA';

export type SetUserDataActionType = ReturnType<typeof setAuthUserData>
type ActionTypes = SetUserDataActionType
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

const authReducer = (state: AuthInitialStateType = initialState, action: ActionTypes): AuthInitialStateType => {
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

export const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me().then(response => {
        if(response.resultCode === 0){
            let {id, email, login} = response.data
            dispatch(setAuthUserData(id, email, login ))
        }
    });
}

export default authReducer;