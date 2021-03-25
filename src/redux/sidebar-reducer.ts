import {SidebarPageType} from "./store";
import {ActionTypes} from "./dialogs-reducer";

let initialState:SidebarPageType = {}
const sidebarReducer = (state: SidebarPageType = initialState, action: ActionTypes):SidebarPageType => {
    return state;
}

export default sidebarReducer;