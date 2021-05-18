import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer, {ProfileActionsTypes} from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer, {UsersActionTypes} from "./users-reducer";
import authReducer, {AuthActionTypes} from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from "redux-form"
import {appActionsType, appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

export type AppStateType = ReturnType<typeof rootReducer>
export type AppActionsType = UsersActionTypes | ProfileActionsTypes | AuthActionTypes | appActionsType
export type AppThunk<ReturnType = void> = ThunkAction<void,AppStateType,unknown,AppActionsType>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;

//@ts-ignore
window.store = store