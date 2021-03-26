import {ActionTypes} from "./dialogs-reducer";

type SidebarPageType = {

}

let initialState:SidebarPageType = {}
const sidebarReducer = (state: SidebarPageType = initialState, action: ActionTypes):SidebarPageType => {
    return state;
}

export default sidebarReducer;