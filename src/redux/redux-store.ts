import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

const rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    sidebar: sidebarReducer
})

export type AppStateType = ReturnType<typeof rootReducers>

export type StoreType = typeof store

let store = createStore(rootReducers);

export default store;