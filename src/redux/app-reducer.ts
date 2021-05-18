import {AppThunk} from "./redux-store";
 import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState= {
    initialized: false as boolean

}

export const appReducer = (state: appInitialStatePropsType = initialState, action: appActionsType): appInitialStatePropsType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true}
        default:
            return state;
    }
}
// Actions Creators
 export const initializedSuccess = () => ({
         type: INITIALIZED_SUCCESS,
     } as const
 )

// Thunk Creators
 export const initializeApp = (): AppThunk => async dispatch => {
     const promise = dispatch(getAuthUserData())
     Promise.all([promise])
         .then(() => {
             dispatch(initializedSuccess())
         })
 }

// Types
 export type appInitialStatePropsType = typeof initialState
 export type initializedSuccessType = ReturnType<typeof initializedSuccess>

 export type appActionsType = initializedSuccessType
