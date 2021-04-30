import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer, {ProfileActionsTypes} from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer, {UsersActionTypes} from "./users-reducer";
import authReducer, {AuthActionTypes} from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer
})

export type AppStateType = ReturnType<typeof rootReducer>
export type AppActionsType = UsersActionTypes | ProfileActionsTypes | AuthActionTypes
export type AppThunk<ReturnType = void> = ThunkAction<void,AppStateType,unknown,AppActionsType>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;