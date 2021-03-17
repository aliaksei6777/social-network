import {ActionTypes, SidebarPageType} from "./store";

let initialState:SidebarPageType = {}
const sidebarReducer = (state: SidebarPageType = initialState, action: ActionTypes):SidebarPageType => {
    return state;
}

export default sidebarReducer;