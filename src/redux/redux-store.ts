import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";

const rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer
})

export type AppStateType = ReturnType<typeof rootReducers>

export type StoreType = ReturnType<typeof store.getState>

let store = createStore(rootReducers);

export default store;